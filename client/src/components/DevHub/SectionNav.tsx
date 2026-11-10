import React, {useEffect, useState} from 'react';
import styles from './devhub.module.css';

const sections = [
  {id: 'develop', label: 'Develop'},
  {id: 'tools', label: 'Tools'},
  {id: 'watch', label: 'Watch'},
  {id: 'learn', label: 'Learn & certify'},
  {id: 'community', label: 'Community'},
  {id: 'grow', label: 'Grow'},
  {id: 'events', label: 'Events & news'},
];

// A section counts as current once its top edge has scrolled up past the two sticky bars.
const OFFSET_PX = 140;

export default function SectionNav(): React.ReactElement {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= OFFSET_PX) current = section.id;
      }
      setActive(atBottom ? sections[sections.length - 1].id : current);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
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
