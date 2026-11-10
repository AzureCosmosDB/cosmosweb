import React from 'react';
import {growth} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import styles from './devhub.module.css';

export default function GrowSection(): React.ReactElement {
  return (
    <Section id="grow" alt title={growth.title} lead={growth.lead}>
      <ol className={styles.ladder}>
        {growth.steps.map((step, index) => (
          <li key={step.title} className={styles.ladderStep}>
            <span className={styles.ladderNumber} aria-hidden="true">
              {index + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {step.cta ? (
              <ExtLink href={step.cta.href} className={styles.cardLink}>
                {step.cta.label}
                <span aria-hidden="true"> ↗</span>
              </ExtLink>
            ) : null}
          </li>
        ))}
      </ol>

      <h3 className={styles.subTitle}>Two recognitions, two different routes</h3>
      <div className={styles.trackGrid}>
        {growth.tracks.map((track) => (
          <article key={track.id} className={styles.trackCard}>
            <div className={styles.trackHead}>
              <h4>{track.name}</h4>
              <span className={styles.trackStatus}>{track.status}</span>
            </div>
            <p>{track.blurb}</p>
            <ul className={styles.trackLinks}>
              {track.links.map((link) => (
                <li key={link.href}>
                  <ExtLink href={link.href}>
                    {link.label}
                    <span aria-hidden="true"> ↗</span>
                  </ExtLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className={styles.fine}>{growth.fine}</p>
    </Section>
  );
}
