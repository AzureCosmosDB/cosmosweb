import React from 'react';
import {communityItems} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import {communityIcons} from './icons';
import styles from './devhub.module.css';

export default function CommunitySection(): React.ReactElement {
  return (
    <Section
      id="community"
      alt
      title="Community"
      lead="Ask a question. Share a build. Join a conversation. Choose the community that works for you.">
      <div className={styles.communityGrid}>
        {communityItems.map((item) => (
          <ExtLink key={item.id} className={styles.communityCard} href={item.href}>
            <span className={styles.communityIcon}>{communityIcons[item.id]}</span>
            <span className={styles.communityText}>
              <span className={styles.communityName}>{item.name}</span>
              <span className={styles.communityBlurb}>{item.blurb}</span>
            </span>
          </ExtLink>
        ))}
      </div>
    </Section>
  );
}
