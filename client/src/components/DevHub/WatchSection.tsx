import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {videos, type Video, type VideoKind} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import {playIcon} from './icons';
import styles from './devhub.module.css';

type Filter = 'all' | VideoKind;

const filters: Array<{id: Filter; label: string}> = [
  {id: 'all', label: 'All videos'},
  {id: 'short', label: 'YouTube Shorts'},
  {id: 'deep', label: 'Deep dives'},
];

function VideoCard({video}: {video: Video}): React.ReactElement {
  const image = useBaseUrl(video.image);
  return (
    <ExtLink href={video.href} className={styles.videoCard}>
      <span className={video.kind === 'short' ? `${styles.videoThumb} ${styles.videoThumbShort}` : styles.videoThumb}>
        <img src={image} alt="" width={480} height={360} loading="lazy" />
        <span className={styles.videoType}>{video.label}</span>
        <span className={styles.videoPlay}>{playIcon}</span>
      </span>
      <span className={styles.videoBody}>
        <span className={styles.videoSource}>{video.source}</span>
        <span className={styles.videoTitle}>{video.title}</span>
        <span className={styles.videoBlurb}>{video.blurb}</span>
        {video.note ? <span className={styles.videoNote}>{video.note}</span> : null}
      </span>
    </ExtLink>
  );
}

export default function WatchSection(): React.ReactElement {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? videos : videos.filter((v) => v.kind === filter);

  return (
    <Section
      id="watch"
      title="Watch"
      lead="Catch a quick idea, then go behind the build with Cosmos DB experts and community voices.">
      <div className={styles.videoToolbar}>
        <div role="group" aria-label="Filter videos" className={styles.filterGroup}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              className={filter === f.id ? `${styles.filter} ${styles.filterActive}` : styles.filter}
              onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <span className={styles.videoStatus} role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'video' : 'videos'} / opens on YouTube / no autoplay
        </span>
      </div>

      <div className={styles.videoGrid}>
        {visible.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://www.youtube.com/@AzureCosmosDB">Visit Azure Cosmos DB on YouTube</ExtLink>
      </p>
    </Section>
  );
}
