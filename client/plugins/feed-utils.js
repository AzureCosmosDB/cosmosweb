/** Small helpers shared by the build-time feed plugins. */
const TIMEOUT_MS = 15000;
const HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; azure-cosmos-db-developer-hub-build)'};

const NAMED_ENTITIES = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' '};

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, ' ');
}

function cdata(value) {
  const match = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/.exec(value);
  return match ? match[1] : value;
}

function tag(block, name) {
  const match = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i').exec(block);
  return match ? cdata(match[1]).trim() : '';
}

function tags(block, name) {
  return [...block.matchAll(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'gi'))].map((m) =>
    decodeEntities(cdata(m[1]).trim()),
  );
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'});
}

async function fetchText(url, headers = HEADERS) {
  const response = await fetch(url, {headers, signal: AbortSignal.timeout(TIMEOUT_MS)});
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

module.exports = {HEADERS, TIMEOUT_MS, decodeEntities, stripTags, tag, tags, formatDate, fetchText};
