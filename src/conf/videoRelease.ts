import agendaData from "../pages/conf/agenda.json";

// Videos become clickable on 2026-04-28 1:30 PM PDT (PDT = UTC-7 → 20:30 UTC).
export const VIDEO_RELEASE_TIMESTAMP = Date.UTC(2026, 3, 28, 20, 30, 0);

// Live stream embed becomes visible on 2026-04-28 7:00 AM PDT (→ 14:00 UTC).
export const STREAM_RELEASE_TIMESTAMP = Date.UTC(2026, 3, 28, 14, 0, 0);

/**
 * Case-insensitive check for a preview query param. Returns true when any of
 * the given names is present in the URL, unless its value explicitly opts out
 * (`0` or `false`, case-insensitive). Bare flags like `?streamnow` count as
 * enabled.
 */
const hasPreviewParam = (names: string[]): boolean => {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const wanted = new Set(names.map((n) => n.toLowerCase()));
  for (const [key, value] of params.entries()) {
    if (!wanted.has(key.toLowerCase())) continue;
    const normalized = value.trim().toLowerCase();
    if (normalized === "0" || normalized === "false") continue;
    return true;
  }
  return false;
};

interface AgendaEntry {
  speakers: { slug: string }[];
  url?: string;
}

const { live, onDemand } = agendaData as {
  live: AgendaEntry[];
  onDemand: AgendaEntry[];
};

const allSessions: AgendaEntry[] = [...live, ...onDemand];

/**
 * Look up a YouTube URL for a given speaker slug. Prefers sessions where the
 * speaker is the sole speaker (their own talk) over multi-speaker sessions
 * like the keynote panel. Falls back to the first multi-speaker match.
 */
export const getVideoUrlForSpeaker = (slug: string): string | undefined => {
  let fallback: string | undefined;
  for (const session of allSessions) {
    if (!session.url) continue;
    if (!session.speakers.some((s) => s.slug === slug)) continue;
    if (session.speakers.length === 1) return session.url;
    if (!fallback) fallback = session.url;
  }
  return fallback;
};

/**
 * Post-event: time-based gating is suspended. Both hooks now always return
 * `true` so the site is permanently in its post-event state (videos clickable,
 * stream section shows the thank-you / recording card, no countdown, no
 * "We're live" indicator). The timestamp constants and `hasPreviewParam`
 * helper are kept in case time-gating needs to be re-enabled for a future
 * event.
 */
export const useVideoReleased = (): boolean => true;
export const useStreamReleased = (): boolean => true;

/**
 * Convert a youtu.be or youtube.com URL into a youtube.com/embed/<id> URL.
 * Returns undefined if the URL cannot be parsed.
 */
export const getYouTubeEmbedUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  const embedMatch = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/);
  if (embedMatch) return url;
  return undefined;
};
