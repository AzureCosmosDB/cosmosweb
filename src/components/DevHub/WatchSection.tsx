import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import {videos as curatedVideos, type Video} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Carousel from './Carousel';
import {playIcon} from './icons';
import styles from './devhub.module.css';

function VideoCard({video}: {video: Video}): React.ReactElement {
  const image = useBaseUrl(video.image);
  const thumbClass = [
    styles.videoThumb,
    video.kind === 'short' ? styles.videoThumbShort : video.dateLabel ? styles.videoThumbFeed : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <ExtLink href={video.href} className={styles.videoCard}>
      <span className={thumbClass}>
        <img src={image} alt={`Video thumbnail: ${video.title}`} width={480} height={360} loading="lazy" />
        <span className={styles.videoType}>{video.label}</span>
        <span className={styles.videoPlay}>{playIcon}</span>
      </span>
      <span className={styles.videoBody}>
        <span className={styles.videoSource}>{video.dateLabel ?? video.source}</span>
        <span className={styles.videoTitle}>{video.title}</span>
        {video.blurb ? <span className={styles.videoBlurb}>{video.blurb}</span> : null}
      </span>
    </ExtLink>
  );
}

export default function WatchSection(): React.ReactElement {
  // Latest videos from the YouTube channel (read at build time); the curated videos if it could not be read.
  const feed = (usePluginData('youtube-feed') as {videos?: Video[]} | undefined)?.videos ?? [];
  const videos = feed.length > 0 ? feed : curatedVideos;

  return (
    <div id="watch" className={styles.subsection}>
      <h3 className={styles.subTitle}>Watch</h3>
      <p className={styles.toolGroupBlurb}>
        Catch a quick idea, then go behind the build with Azure Cosmos DB experts and community voices.
      </p>

      <Carousel noun="videos" perView={4}>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Carousel>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://www.youtube.com/@AzureCosmosDB">Visit Azure Cosmos DB on YouTube</ExtLink>
      </p>
    </div>
  );
}
