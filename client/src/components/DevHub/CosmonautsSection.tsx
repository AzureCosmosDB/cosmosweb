import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {growth, people, type Person} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import styles from './devhub.module.css';

function PersonCard({person}: {person: Person}): React.ReactElement {
  const photo = useBaseUrl(person.image);
  return (
    <article className={styles.personCard}>
      <img className={styles.personPhoto} src={photo} alt={person.name} width={400} height={400} loading="lazy" />
      <div className={styles.personBody}>
        <span className={styles.pathBadge}>{person.badge}</span>
        <h3>{person.name}</h3>
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

export default function CosmonautsSection(): React.ReactElement {
  return (
    <Section id="cosmonauts" title={growth.sectionTitle} lead={growth.sectionLead}>
      <div className={styles.peopleGrid}>
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>

      <div className={styles.leadership}>
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
    </Section>
  );
}
