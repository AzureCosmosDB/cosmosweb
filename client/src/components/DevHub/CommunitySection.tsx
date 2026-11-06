import React from 'react';
import {communityItems} from '@site/src/data/devhub';
import {communityIcons} from './icons';
import styles from './devhub.module.css';

export default function CommunitySection(): React.ReactElement {
  return (
    <section id="community" className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="community-heading">
      <div className={styles.sectionInner}>
        <h2 id="community-heading" className={styles.sectionTitle}>
          Community
        </h2>
        <p className={styles.sectionLead}>
          Ask questions, share what you build and keep up with the people working on Azure Cosmos DB.
        </p>
        <div className={styles.communityGrid}>
          {communityItems.map((item) => (
            <a key={item.id} className={styles.communityCard} href={item.href} target="_blank" rel="noopener noreferrer">
              <span className={styles.communityIcon}>{communityIcons[item.id]}</span>
              <span className={styles.communityText}>
                <span className={styles.communityName}>
                  {item.name}
                  <span className={styles.visuallyHidden}> (opens in new tab)</span>
                </span>
                <span className={styles.communityBlurb}>{item.blurb}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
