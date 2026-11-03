function runWhenBrowser(fn: () => void): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  fn();
}

function isConfHomePathname(pathname: string): boolean {
  return pathname === "/conf" || pathname === "/conf/" || pathname.endsWith("/conf") || pathname.endsWith("/conf/");
}

function isSidebarOpen(): boolean {
  return document.documentElement.classList.contains("navbar-sidebar--show");
}

function setActiveForConfHash(): void {
  const { pathname, hash } = window.location;

  // Only handle the /conf homepage anchors.
  if (!isConfHomePathname(pathname)) return;

  const sidebar = document.querySelector<HTMLElement>(".navbar-sidebar");
  if (!sidebar) return;

  const allMenuLinks = Array.from(
    sidebar.querySelectorAll<HTMLAnchorElement>("a.menu__link")
  );

  // Remove active styling from conf hash links only (avoid breaking real-page actives).
  for (const link of allMenuLinks) {
    const href = link.getAttribute("href") || "";
    if (href.startsWith("/conf#")) {
      link.classList.remove("menu__link--active");
    }
  }

  if (!hash) return;

  const wanted = `/conf${hash}`;
  for (const link of allMenuLinks) {
    const href = link.getAttribute("href") || "";
    if (href === wanted) {
      link.classList.add("menu__link--active");
    }
  }
}

runWhenBrowser(() => {
  let pending = false;

  const scheduleUpdate = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      setActiveForConfHash();
    });
  };

  window.addEventListener("hashchange", scheduleUpdate, { passive: true });
  window.addEventListener("popstate", scheduleUpdate, { passive: true });

  // Only observe the html element for the sidebar-open class change (very cheap).
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === "class" && isSidebarOpen()) {
        // Sidebar just opened; schedule one update after links render.
        setTimeout(scheduleUpdate, 50);
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  scheduleUpdate();
});
