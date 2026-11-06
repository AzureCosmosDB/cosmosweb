import React from 'react';
import {learn} from '@site/src/data/devhub';
import styles from './devhub.module.css';

interface StepProps {
  step: number;
  title: string;
  blurb: string;
  links: Array<{label: string; href: string}>;
}

function Step({step, title, blurb, links}: StepProps): React.ReactElement {
  return (
    <div className={styles.stepCard}>
      <span className={styles.stepNumber} aria-hidden="true">
        {step}
      </span>
      <h3>{title}</h3>
      <p>{blurb}</p>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LearnSection(): React.ReactElement {
  const {paths, practice, certification} = learn;
  return (
    <section id="learn" className={styles.section} aria-labelledby="learn-heading">
      <div className={styles.sectionInner}>
        <h2 id="learn-heading" className={styles.sectionTitle}>
          Learn &amp; certify
        </h2>
        <p className={styles.sectionLead}>From first read to a credential you can show: learn it, build with it, get certified.</p>

        <div className={styles.stepGrid}>
          <Step step={1} {...paths} />
          <Step step={2} {...practice} />
          <div className={`${styles.stepCard} ${styles.certCard}`}>
            <span className={styles.stepNumber} aria-hidden="true">
              3
            </span>
            <h3>{certification.title}</h3>
            <p className={styles.certName}>{certification.name}</p>
            <p>{certification.blurb}</p>
            <ul className={styles.certFacts}>
              {certification.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <a className={styles.primaryButton} href={certification.href}>
              View the certification
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
