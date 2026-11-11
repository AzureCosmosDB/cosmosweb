/**
 * Reads the Azure Updates service at build time and exposes the latest Azure Cosmos DB updates to the
 * developer hub as global data. The Azure Updates site is built on this public API (the same one behind its
 * RSS feed), which can filter by product on the server, so only Azure Cosmos DB items come back.
 * If it cannot be reached, the Updates subsection is hidden.
 */
const {decodeEntities, stripTags, formatDate, fetchText} = require('../feed-utils');

const API_URL = 'https://www.microsoft.com/releasecommunications/api/v2/azure';
const PRODUCT = 'Azure Cosmos DB';
// Same query the Azure Updates search box sends for "cosmos".
const KEYWORD_QUERY = {search: '"cosmos"', $orderby: 'modified desc', $top: '50'};
const PRODUCT_QUERY = {$filter: `products/any(f:f eq '${PRODUCT}')`, $orderby: 'modified desc', $top: '50'};
const UPDATE_COUNT = 12;const ITEM_URL = 'https://azure.microsoft.com/updates?id=';
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
      if (process.env.UPDATES_FEED_URL === 'off') return [];
      try {
        const queries = [KEYWORD_QUERY, PRODUCT_QUERY].map((query) => `${API_URL}?${new URLSearchParams(query)}`);
        const results = await Promise.allSettled(queries.map(fetchJson));
        const failures = results.filter((result) => result.status === 'rejected');
        if (failures.length === results.length) throw failures[0].reason;

        const byId = new Map();
        for (const result of results) {
          if (result.status !== 'fulfilled') continue;
          for (const item of result.value.value ?? []) {
            if (item.id && item.title && Array.isArray(item.products) && item.products.includes(PRODUCT)) {
              byId.set(String(item.id), item);
            }
          }
        }

        return [...byId.values()]
          .map((item) => ({item, changed: new Date(item.modified || item.created)}))
          .filter(({changed}) => !Number.isNaN(changed.getTime()))
          .sort((a, b) => b.changed - a.changed)
          .slice(0, UPDATE_COUNT)
          .map(({item, changed}) => {
            const {stage, title} = splitTitle(decodeEntities(stripTags(item.title)));
            return {
              id: String(item.id),
              date: changed.toISOString().slice(0, 10),
              dateLabel: formatDate(changed),
              stage,
              title,
              blurb: summarize(item.description),
              cta: 'Read the update',
              href: `${ITEM_URL}${encodeURIComponent(item.id)}`,
            };
          });
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
