import React, {useEffect, useState} from 'react';
import styles from './devhub.module.css';

const sections = [
  {id: 'develop', label: 'Develop'},
  {id: 'community', label: 'Community'},
  {id: 'learn', label: 'Learn & certify'},
];

export default function SectionNav(): React.ReactElement {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    // Highlight the section occupying the band just below the sticky bars.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      {rootMargin: '-120px 0px -60% 0px', threshold: 0},
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.sectionNav} aria-label="On this page">
      <div className={styles.sectionNavInner}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            className={active === s.id ? `${styles.sectionLink} ${styles.sectionLinkActive}` : styles.sectionLink}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
