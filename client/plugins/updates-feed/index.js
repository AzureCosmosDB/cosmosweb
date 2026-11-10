/**
 * Reads the Azure Updates service at build time and exposes the latest Azure Cosmos DB updates to the
 * developer hub as global data. The Azure Updates site is built on this public API (the same one behind its
 * RSS feed), which can filter by product on the server, so only Azure Cosmos DB items come back.
 * If it cannot be reached, the Updates subsection is hidden.
 */
const {decodeEntities, stripTags, formatDate, fetchText} = require('../feed-utils');

const API_URL =
  process.env.UPDATES_FEED_URL ||
  'https://www.microsoft.com/releasecommunications/api/v2/azure?' +
    new URLSearchParams({
      $filter: "products/any(f:f eq 'Azure Cosmos DB')",
      $orderby: 'created desc',
      $top: '12',
    }).toString();
const ITEM_URL = 'https://azure.microsoft.com/updates?id=';
// The service answers the default fetch agent with a "high demand" page now and then, so look like a browser and retry.
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
  Accept: 'application/json',
};
const ATTEMPTS = 3;

async function fetchJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      return JSON.parse(await fetchText(url, HEADERS));
    } catch (error) {
      lastError = error;
      if (attempt < ATTEMPTS) await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }
  throw lastError;
}

// Open source projects are labeled as such instead of with a general availability stage.
const OPEN_SOURCE_TITLE = /\bagent kit\b/i;

/** "Generally Available: Foo" becomes {stage: "Generally Available", title: "Foo"}. */
function splitTitle(raw) {
  const match = /^\s*(Generally Available|Public Preview|Private Preview|Retirement|Update)\s*:\s*(.+)$/i.exec(raw);
  const {stage, title} = match ? {stage: match[1], title: match[2].trim()} : {stage: '', title: raw.trim()};
  return {stage: OPEN_SOURCE_TITLE.test(title) ? 'Open source' : stage, title};
}

function summarize(descriptionHtml) {
  const firstParagraph = (descriptionHtml || '').split(/<\/p>/i)[0] ?? '';
  const text = decodeEntities(stripTags(firstParagraph)).replace(/\s+/g, ' ').trim();
  if (text.length <= 190) return text;
  const window = text.slice(0, 210);
  const sentenceEnd = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '));
  if (sentenceEnd >= 80) return window.slice(0, sentenceEnd + 1);
  const cut = text.slice(0, 170);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

module.exports = function updatesFeedPlugin() {
  return {
    name: 'updates-feed',

    async loadContent() {
      if (API_URL === 'off') return [];
      try {
        const json = await fetchJson(API_URL);
        return (json.value ?? [])
          .filter((item) => item.id && item.title && Array.isArray(item.products) && item.products.includes('Azure Cosmos DB'))
          .map((item) => {
            const created = new Date(item.created);
            if (Number.isNaN(created.getTime())) return null;
            const {stage, title} = splitTitle(decodeEntities(stripTags(item.title)));
            return {
              id: String(item.id),
              date: created.toISOString().slice(0, 10),
              dateLabel: formatDate(created),
              stage,
              title,
              blurb: summarize(item.description),
              cta: 'Read the update',
              href: `${ITEM_URL}${encodeURIComponent(item.id)}`,
            };
          })
          .filter(Boolean);
      } catch (error) {
        console.warn(`[updates-feed] Could not read the Azure Updates service: ${error.message}. Hiding Updates.`);
        return [];
      }
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({updates: content ?? []});
    },
  };
};
