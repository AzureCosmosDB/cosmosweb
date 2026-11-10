import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {growth, people, type Person} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import styles from './devhub.module.css';

function PersonCard({person}: {person: Person}): React.ReactElement {
  const photo = useBaseUrl(person.image);
  return (
    <article className={styles.personCard}>
      <img className={styles.personPhoto} src={photo} alt={person.name} width={400} height={400} loading="lazy" />
      <div className={styles.personBody}>
        <span className={styles.pathBadge}>{person.badge}</span>
        <h4>{person.name}</h4>
        <p className={styles.personRole}>{person.role}</p>
        <p>{person.blurb}</p>
        <ExtLink href={person.href} className={styles.cardLink}>
          {person.cta}
          <span aria-hidden="true"> ↗</span>
        </ExtLink>
      </div>
    </article>
  );
}

/** Rendered inside the Community section, under its own subheading. */
export default function CosmonautsSection(): React.ReactElement {
  return (
    <div id="cosmonauts" className={styles.cosmonauts} aria-labelledby="cosmonauts-heading">
      <h3 id="cosmonauts-heading" className={styles.subTitle}>
        {growth.sectionTitle}
      </h3>
      <p className={styles.toolGroupBlurb}>{growth.sectionLead}</p>

      <div className={styles.peopleGrid}>
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>

      <div className={styles.leadership}>
        <div>
          <p className={styles.eyebrowDark}>{growth.eyebrow}</p>
          <h4>{growth.title}</h4>
          <p>{growth.blurb}</p>
          <ExtLink href={growth.cta.href} className={styles.cardLink}>
            {growth.cta.label}
            <span aria-hidden="true"> ↗</span>
          </ExtLink>
        </div>
        <div>
          <ol className={styles.leadershipSteps}>
            {growth.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong> {step.text}
              </li>
            ))}
          </ol>
          <p className={styles.leadershipFine}>{growth.fine}</p>
        </div>
      </div>
    </div>
  );
}
