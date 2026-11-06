import React from 'react';
import {communityItems, growth} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import {communityIcons} from './icons';
import styles from './devhub.module.css';

export default function CommunitySection(): React.ReactElement {
  return (
    <Section
      id="community"
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

      <div className={styles.growth}>
        <div>
          <p className={styles.eyebrowDark}>{growth.eyebrow}</p>
          <h3>{growth.title}</h3>
          <p>{growth.blurb}</p>
          <ExtLink href={growth.cta.href} className={styles.cardLink}>
            {growth.cta.label}
            <span aria-hidden="true"> ↗</span>
          </ExtLink>
        </div>
        <div>
          <ol className={styles.growthSteps}>
            {growth.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong> {step.text}
              </li>
            ))}
          </ol>
          <p className={styles.fine}>{growth.fine}</p>
        </div>
      </div>
    </Section>
  );
}
