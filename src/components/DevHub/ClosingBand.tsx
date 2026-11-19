import React from 'react';
import {closing} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import styles from './devhub.module.css';

export default function ClosingBand(): React.ReactElement | null {
  if (!closing.show) return null;
  return (
    <div className={styles.closing}>
      <aside className={styles.closingInner} aria-labelledby="try-title">
        <div>
          <h2 id="try-title">{closing.title}</h2>
          <p>{closing.blurb}</p>
        </div>
        <ExtLink className={styles.primaryButton} href={closing.cta.href}>
          {closing.cta.label}
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
        </ExtLink>
      </aside>
    </div>
  );
}
