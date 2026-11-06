import React, {useState} from 'react';
import {videos, type VideoKind} from '@site/src/data/devhub';
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
          <ExtLink key={video.id} href={video.href} className={styles.videoCard}>
            <span className={styles.videoPlay}>{playIcon}</span>
            <span className={styles.videoType}>{video.label}</span>
            <span className={styles.videoSource}>{video.source}</span>
            <span className={styles.videoTitle}>{video.title}</span>
            <span className={styles.videoBlurb}>{video.blurb}</span>
            {video.note ? <span className={styles.videoNote}>{video.note}</span> : null}
          </ExtLink>
        ))}
      </div>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://www.youtube.com/@AzureCosmosDB">Visit Azure Cosmos DB on YouTube</ExtLink>
      </p>
    </Section>
  );
}
