/**
 * Reads the Azure Cosmos DB dev blog RSS feed at build time and exposes the latest posts to the
 * developer hub as global data. The feed has no CORS headers, so the browser cannot read it directly.
 * If the feed (or any post page) cannot be reached, the hub falls back to its curated posts.
 */
const {decodeEntities, stripTags, tag, tags, formatDate, fetchText} = require('../feed-utils');

const FEED_URL = process.env.DEVBLOG_FEED_URL || 'https://devblogs.microsoft.com/cosmosdb/feed/';
const POST_COUNT = 9;

/** First paragraph of the excerpt, without the trailing "The post ... appeared first on" line. */
function summarize(descriptionHtml) {
  const firstParagraph = descriptionHtml.split(/<\/p>/i)[0] ?? descriptionHtml;
  const text = decodeEntities(stripTags(firstParagraph))
    .replace(/\[…\]\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= 200) return text;
  // Prefer ending on a full sentence; otherwise cut at a word boundary.
  const window = text.slice(0, 220);
  const sentenceEnd = Math.max(window.lastIndexOf('. '), window.lastIndexOf('? '), window.lastIndexOf('! '));
  if (sentenceEnd >= 90) return window.slice(0, sentenceEnd + 1);
  const cut = text.slice(0, 170);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

async function socialImage(url) {
  try {
    const html = await fetchText(url);
    const metas = html.match(/<meta[^>]+og:image(?!:)[^>]*>/gi) ?? [];
    for (const meta of metas) {
      const content = /content=["']([^"']+)["']/i.exec(meta);
      if (content && /^https:\/\//i.test(content[1])) return decodeEntities(content[1]);
    }
  } catch {
    // The card falls back to a placeholder image.
  }
  return null;
}

module.exports = function devblogFeedPlugin() {
  return {
    name: 'devblog-feed',

    async loadContent() {
      if (FEED_URL === 'off') return [];
      try {
        const xml = await fetchText(FEED_URL);
        const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => m[1]);
        const posts = items
          .map((item) => {
            const link = decodeEntities(tag(item, 'link'));
            const published = new Date(tag(item, 'pubDate'));
            const title = decodeEntities(stripTags(tag(item, 'title'))).trim();
            if (!link.startsWith('https://') || !title || Number.isNaN(published.getTime())) return null;
            // Feed categories are product names; skip them and only show a topic when it adds something.
            const topic = tags(item, 'category').find((c) => c && !/^Azure Cosmos DB\b/i.test(c)) || '';
            return {
              id: link.replace(/\/+$/, '').split('/').pop(),
              date: published.toISOString().slice(0, 10),
              dateLabel: formatDate(published),
              topic,
              title,
              blurb: summarize(tag(item, 'description')),
              cta: 'Read the article',
              href: link,
            };
          })
          .filter(Boolean)
          .slice(0, POST_COUNT);

        const images = await Promise.all(posts.map((post) => socialImage(post.href)));
        return posts.map((post, index) => ({...post, image: images[index]}));
      } catch (error) {
        console.warn(`[devblog-feed] Could not read ${FEED_URL}: ${error.message}. Using the curated posts.`);
        return [];
      }
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({posts: content ?? []});
    },
  };
};
