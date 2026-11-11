import React from 'react';
import styles from './devhub.module.css';

interface SectionProps {
  id: string;
  title: string;
  lead?: string;
  /** Tinted background to separate neighbouring sections. */
  alt?: boolean;
  children: React.ReactNode;
}

export default function Section({id, title, lead, alt = false, children}: SectionProps): React.ReactElement {
  return (
    <section
      id={id}
      className={alt ? `${styles.section} ${styles.sectionAlt}` : styles.section}
      aria-labelledby={`${id}-heading`}>
      <div className={styles.sectionInner}>
        <h2 id={`${id}-heading`} className={styles.sectionTitle}>
          {title}
        </h2>
        {lead ? <p className={styles.sectionLead}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
