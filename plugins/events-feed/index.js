/**
 * Reads the Microsoft Developer events listing at build time and exposes the upcoming events that are about
 * Azure Cosmos DB (Microsoft Reactor livestreams and similar) to the developer hub as global data.
 *
 * The listing page has no public feed, but it embeds every event as JSON for its own filters, so that is what
 * is read. It runs as part of the normal site build, so the deploy workflow picks it up with no changes.
 * Only events whose title or description names Azure Cosmos DB or NoSQL are kept, so most days there are none
 * and the hand-picked events carry the section. Events that have ended are dropped here and again in the
 * browser (see EventsSection). If the page cannot be read or its shape changes, the feed contributes nothing
 * and the build still succeeds.
 */
const {decodeEntities, stripTags, fetchText} = require('../feed-utils');

const EVENTS_URL = 'https://developer.microsoft.com/en-us/events';
const ALLOWED_HOST = 'developer.microsoft.com';
// An event must be about Azure Cosmos DB itself. Broader database or data-platform topics do not count.
const RELEVANT = /\bcosmos\s?db\b|\bcosmosdb\b|\bnosql\b|\bchange feed\b/i;
const LANGUAGE = 'English';
const EVENT_COUNT = 12;
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
  Accept: 'text/html',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** The listing's dates have no time zone, so everything here works with calendar dates ("2026-11-11"). */
const isoDate = (dateTime) => (typeof dateTime === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateTime) ? dateTime.slice(0, 10) : null);

function dateLabel(start, end) {
  const [, sm, sd] = start.split('-').map(Number);
  const [, em, ed] = end.split('-').map(Number);
  if (start === end) return `${MONTHS[sm - 1]} ${sd}`;
  return sm === em ? `${MONTHS[sm - 1]} ${sd}-${ed}` : `${MONTHS[sm - 1]} ${sd} - ${MONTHS[em - 1]} ${ed}`;
}

/** An event that ends in the small hours of the next day ran on the previous calendar day. */
function lastDay(startDateTime, endDateTime) {
  const start = isoDate(startDateTime);
  const end = isoDate(endDateTime) ?? start;
  if (!start || !end || end <= start) return start;
  const hour = Number(/T(\d{2})/.exec(endDateTime)?.[1] ?? 12);
  if (hour >= 6) return end;
  const previous = new Date(`${end}T00:00:00Z`);
  previous.setUTCDate(previous.getUTCDate() - 1);
  const day = previous.toISOString().slice(0, 10);
  return day < start ? start : day;
}

function summarize(description) {
  const text = decodeEntities(stripTags(String(description || '')))
    .replace(/https?:\/\/\S+/g, ' ')
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line && !/^(for more information|explore|visit|register|learn more)\b/i.test(line))
    .join(' ');
  if (text.length <= 180) return text;
  const window = text.slice(0, 200);
  const end = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '));
  if (end >= 70) return window.slice(0, end + 1);
  const cut = text.slice(0, 165);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** Pulls the events array out of the page: the embedded JSON block whose items look like events. */
function extractEvents(html) {
  const blocks = html.matchAll(/<script[^>]*type="application\/(?:ld\+)?json"[^>]*>([\s\S]*?)<\/script>/gi);
  for (const [, body] of blocks) {
    try {
      const data = JSON.parse(body);
      if (Array.isArray(data) && data.length > 0 && data.every((item) => item && item.title && item.url && item.startDateTime)) return data;
    } catch {
      // Not the events block.
    }
  }
  throw new Error('the events data was not found on the page');
}

function toEvents(rawEvents, today) {
  const seen = new Map();
  for (const item of rawEvents) {
    if (!Array.isArray(item.languages) || !item.languages.includes(LANGUAGE)) continue;
    if (!RELEVANT.test(`${item.title} ${item.description}`)) continue;

    const start = isoDate(item.startDateTime);
    const end = lastDay(item.startDateTime, item.endDateTime);
    if (!start || !end || end < today) continue;

    let href;
    try {
      const url = new URL(item.url);
      if (url.protocol !== 'https:' || url.hostname !== ALLOWED_HOST) continue;
      href = url.href;
    } catch {
      continue;
    }

    // Sessions repeated at different times are listed as "(Option 1)", "(Option 2)": show the earliest once.
    const title = decodeEntities(String(item.title)).replace(/\s*\(Option \d+\)\s*$/i, '').replace(/\s+/g, ' ').trim();
    const key = title.toLowerCase();
    const event = {
      id: href.split('/').filter(Boolean).pop(),
      start,
      end,
      dateLabel: dateLabel(start, end),
      format: Array.isArray(item.formats) && item.formats[0] ? String(item.formats[0]) : '',
      title,
      blurb: summarize(item.description),
      cta: 'Registration and details',
      href,
    };
    const existing = seen.get(key);
    if (!existing || event.start < existing.start) seen.set(key, event);
  }
  return [...seen.values()].sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title)).slice(0, EVENT_COUNT);
}

module.exports = function eventsFeedPlugin() {
  return {
    name: 'events-feed',

    async loadContent() {
      if (process.env.EVENTS_FEED_URL === 'off') return [];
      try {
        const html = await fetchText(EVENTS_URL, HEADERS);
        // Pacific time is the reference, like the rest of the hub's dates.
        const today = new Date(Date.now() - 8 * 3600 * 1000).toISOString().slice(0, 10);
        return toEvents(extractEvents(html), today);
      } catch (error) {
        console.warn(`[events-feed] Could not read Microsoft Developer events: ${error.message}. Showing the hand-picked events only.`);
        return [];
      }
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({events: content ?? []});
    },
  };
};

module.exports.toEvents = toEvents;
module.exports.extractEvents = extractEvents;
module.exports.lastDay = lastDay;
