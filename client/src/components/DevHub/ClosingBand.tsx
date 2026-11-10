import React from 'react';
import {closing} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import styles from './devhub.module.css';

export default function ClosingBand(): React.ReactElement {
  return (
    <section className={styles.closing} aria-labelledby="try-title">
      <div className={styles.closingInner}>
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
      </div>
    </section>
  );
}
