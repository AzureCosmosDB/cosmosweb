import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import Carousel from './Carousel';
import ExtLink from './ExtLink';
import styles from './devhub.module.css';

interface Update {
  id: string;
  date: string;
  dateLabel: string;
  stage: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
}

function UpdateCard({update}: {update: Update}): React.ReactElement {
  const stageClass = /retire/i.test(update.stage) ? `${styles.updateStage} ${styles.updateStageRetire}` : styles.updateStage;
  return (
    <article className={styles.updateCard}>
      <div className={styles.updateMeta}>
        <time dateTime={update.date} className={styles.postDate}>
          {update.dateLabel}
        </time>
        {update.stage ? <span className={stageClass}>{update.stage}</span> : null}
      </div>
      <h4>{update.title}</h4>
      {update.blurb ? <p>{update.blurb}</p> : null}
      <ExtLink href={update.href} className={styles.cardLink}>
        {update.cta}
        <span aria-hidden="true"> ↗</span>
      </ExtLink>
    </article>
  );
}

export default function UpdatesSection(): React.ReactElement | null {
  // Azure Cosmos DB items from Azure Updates (read at build time). Nothing is shown when they could not be read.
  const updates = (usePluginData('updates-feed') as {updates?: Update[]} | undefined)?.updates ?? [];
  if (updates.length === 0) return null;

  return (
    <div id="updates" className={styles.subsection}>
      <h3 className={styles.subTitle}>Updates</h3>
      <p className={styles.toolGroupBlurb}>The latest Azure Cosmos DB announcements from Azure Updates.</p>

      <Carousel noun="updates" perView={3}>
        {updates.map((update) => (
          <UpdateCard key={update.id} update={update} />
        ))}
      </Carousel>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://azure.microsoft.com/updates?query=azure%20cosmos%20db">See all Azure Cosmos DB updates</ExtLink>
      </p>
    </div>
  );
}
