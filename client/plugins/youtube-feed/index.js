/**
 * Reads the Azure Cosmos DB YouTube channel feed at build time and exposes its latest videos to the
 * developer hub as global data (YouTube's feed has no CORS headers). If the feed cannot be reached, the
 * hub falls back to its curated videos.
 */
const {decodeEntities, tag, formatDate, fetchText, HEADERS, TIMEOUT_MS} = require('../feed-utils');

const CHANNEL_ID = 'UC9OJ32CzooNJNoP6_iIfxRw'; // https://www.youtube.com/@AzureCosmosDB
const FEED_URL =
  process.env.YOUTUBE_FEED_URL || `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const VIDEO_COUNT = 4;

/** Shorts answer with 200 at /shorts/<id>; regular videos redirect to /watch. */
async function isShort(id) {
  try {
    const response = await fetch(`https://www.youtube.com/shorts/${id}`, {
      headers: HEADERS,
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return response.status === 200;
  } catch {
    return false;
  }
}

module.exports = function youtubeFeedPlugin() {
  return {
    name: 'youtube-feed',

    async loadContent() {
      if (FEED_URL === 'off') return [];
      try {
        const xml = await fetchText(FEED_URL);
        const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((m) => m[1]);
        const latest = entries
          .map((entry) => {
            const id = tag(entry, 'yt:videoId');
            const title = decodeEntities(tag(entry, 'title')).trim();
            const published = new Date(tag(entry, 'published'));
            if (!/^[\w-]{11}$/.test(id) || !title || Number.isNaN(published.getTime())) return null;
            return {id, title, published};
          })
          .filter(Boolean)
          .slice(0, VIDEO_COUNT);

        const shorts = await Promise.all(latest.map((video) => isShort(video.id)));
        return latest.map((video, index) => ({
          id: video.id,
          kind: shorts[index] ? 'short' : 'deep',
          label: shorts[index] ? 'Short' : 'Video',
          title: video.title,
          date: video.published.toISOString().slice(0, 10),
          dateLabel: formatDate(video.published),
          href: shorts[index]
            ? `https://www.youtube.com/shorts/${video.id}`
            : `https://www.youtube.com/watch?v=${video.id}`,
          image: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
        }));
      } catch (error) {
        console.warn(`[youtube-feed] Could not read ${FEED_URL}: ${error.message}. Using the curated videos.`);
        return [];
      }
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({videos: content ?? []});
    },
  };
};
