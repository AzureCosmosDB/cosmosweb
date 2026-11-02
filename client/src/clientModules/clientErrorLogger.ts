/**
 * Client-side error + performance logger.
 *
 * Captures runtime errors, unhandled promise rejections, failed resource
 * loads, slow long-tasks, and a few page-load timings. Persists the most
 * recent events to localStorage (capped) so you can pull them back after a
 * page crash or slowdown.
 *
 * Logs are NOT shipped anywhere — they live only in the browser. To inspect
 * them:
 *
 *   1. Open DevTools console (errors print there in real time, prefixed
 *      `[client-error]` / `[client-perf]`).
 *   2. Run `window.__getClientLog()` — returns the current buffer as an
 *      array.
 *   3. Run `window.__downloadClientLog()` — downloads the buffer as a
 *      JSON file you can attach to a bug report. Or visit any URL on the
 *      site with `?downloadClientLog` to trigger the download
 *      automatically.
 *   4. Run `window.__clearClientLog()` to reset the buffer.
 *
 * Nothing here is committed to git: logs only live in localStorage / Blob
 * downloads, and the *.log gitignore at repo root blocks any local files
 * you save from the download dialog.
 */

interface LogEntry {
  ts: string;
  kind:
    | "error"
    | "unhandledrejection"
    | "resource-error"
    | "long-task"
    | "navigation"
    | "console-error"
    | "console-warn";
  href: string;
  details: Record<string, unknown>;
}

const LOG_KEY = "__cosmosconf_client_log__";
const MAX_ENTRIES = 200;
const LONG_TASK_THRESHOLD_MS = 200;

function safeStringify(value: unknown): string {
  if (value instanceof Error) {
    return `${value.name}: ${value.message}\n${value.stack ?? ""}`;
  }
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function runWhenBrowser(fn: () => void): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  fn();
}

runWhenBrowser(() => {
  const w = window as unknown as {
    __getClientLog?: () => LogEntry[];
    __clearClientLog?: () => void;
    __downloadClientLog?: () => void;
  };

  const readBuffer = (): LogEntry[] => {
    try {
      const raw = window.localStorage.getItem(LOG_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as LogEntry[]) : [];
    } catch {
      return [];
    }
  };

  const writeBuffer = (entries: LogEntry[]): void => {
    try {
      window.localStorage.setItem(LOG_KEY, JSON.stringify(entries));
    } catch {
      // Quota or privacy mode — ignore.
    }
  };

  const push = (entry: Omit<LogEntry, "ts" | "href">): void => {
    const full: LogEntry = {
      ts: new Date().toISOString(),
      href: window.location.href,
      ...entry,
    };
    const buffer = readBuffer();
    buffer.push(full);
    if (buffer.length > MAX_ENTRIES) buffer.splice(0, buffer.length - MAX_ENTRIES);
    writeBuffer(buffer);
  };

  // Uncaught runtime errors + failed resource loads (capture phase needed
  // for resource errors since they don't bubble).
  window.addEventListener(
    "error",
    (event) => {
      const target = event.target as
        | (HTMLElement & { src?: string; href?: string })
        | null;
      const isResourceError =
        !!target &&
        target !== (window as unknown as EventTarget) &&
        (target.tagName === "IMG" ||
          target.tagName === "SCRIPT" ||
          target.tagName === "LINK" ||
          target.tagName === "VIDEO" ||
          target.tagName === "AUDIO" ||
          target.tagName === "SOURCE");

      if (isResourceError) {
        const details = {
          tag: target!.tagName,
          url: target!.src || target!.href,
          userAgent: navigator.userAgent,
        };
        // eslint-disable-next-line no-console
        console.error("[client-error]", "resource-error", details);
        push({ kind: "resource-error", details });
        return;
      }

      const errorEvent = event as ErrorEvent;
      const details = {
        message: errorEvent.message,
        filename: errorEvent.filename,
        lineno: errorEvent.lineno,
        colno: errorEvent.colno,
        stack: errorEvent.error?.stack,
        userAgent: navigator.userAgent,
      };
      // eslint-disable-next-line no-console
      console.error("[client-error]", "window.error", details);
      push({ kind: "error", details });
    },
    true
  );

  // Unhandled promise rejections.
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason as Error | string | undefined;
    const details = {
      reason: typeof reason === "string" ? reason : reason?.message,
      stack: typeof reason === "string" ? undefined : reason?.stack,
      userAgent: navigator.userAgent,
    };
    // eslint-disable-next-line no-console
    console.error("[client-error]", "unhandledrejection", details);
    push({ kind: "unhandledrejection", details });
  });

  // Wrap console.error / console.warn so React hydration mismatches and
  // Docusaurus runtime warnings get persisted, not just printed.
  const origError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    try {
      const first = args[0];
      // Avoid recursion on our own logs.
      if (!(typeof first === "string" && first.startsWith("[client-"))) {
        push({
          kind: "console-error",
          details: { args: args.map(safeStringify) },
        });
      }
    } catch {
      // ignore
    }
    origError(...args);
  };

  const origWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    try {
      const first = args[0];
      if (!(typeof first === "string" && first.startsWith("[client-"))) {
        push({
          kind: "console-warn",
          details: { args: args.map(safeStringify) },
        });
      }
    } catch {
      // ignore
    }
    origWarn(...args);
  };

  // Long-task observer — anything that blocks the main thread above the
  // threshold is a likely cause of perceived slowness.
  if (typeof PerformanceObserver !== "undefined") {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration < LONG_TASK_THRESHOLD_MS) continue;
          const details = {
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
            name: entry.name,
            entryType: entry.entryType,
          };
          // eslint-disable-next-line no-console
          console.warn("[client-perf]", "long-task", details);
          push({ kind: "long-task", details });
        }
      });
      longTaskObserver.observe({ type: "longtask", buffered: true });
    } catch {
      // longtask not supported in this browser — non-fatal.
    }

    try {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
          const details = {
            type: entry.type,
            duration: Math.round(entry.duration),
            domContentLoaded: Math.round(
              entry.domContentLoadedEventEnd - entry.startTime
            ),
            loadEvent: Math.round(entry.loadEventEnd - entry.startTime),
            transferSize: entry.transferSize,
          };
          push({ kind: "navigation", details });
        }
      });
      navObserver.observe({ type: "navigation", buffered: true });
    } catch {
      // ignore
    }
  }

  // Helpers exposed on window.
  w.__getClientLog = () => readBuffer();
  w.__clearClientLog = () => writeBuffer([]);
  w.__downloadClientLog = () => {
    const data = readBuffer();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cosmosconf-client-log-${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // `?downloadClientLog` query param triggers an automatic download.
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("downloadClientLog")) {
      window.setTimeout(() => w.__downloadClientLog?.(), 1000);
    }
  } catch {
    // ignore
  }

  // One-line breadcrumb so you know the logger is alive.
  // eslint-disable-next-line no-console
  console.info(
    "[client-perf]",
    "logger ready — window.__getClientLog() / __downloadClientLog() / __clearClientLog()"
  );
});
