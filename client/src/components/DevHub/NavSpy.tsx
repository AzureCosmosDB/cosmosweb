import {useEffect} from 'react';

/** Section ids, in page order. Each has a matching `/#id` entry in the site navbar. */
const SECTION_IDS = ['develop', 'tools', 'watch', 'learn', 'community', 'events', 'cosmonauts'];

// A section counts as current once its top edge has scrolled up past the navbar.
const OFFSET_PX = 100;

const ACTIVE_CLASS = 'navbar__link--active';

function navLinks(id: string): HTMLAnchorElement[] {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>(`.navbar a[href="/#${id}"]`));
}

/**
 * Highlights the navbar entry for the section currently in view. The navbar belongs to the site
 * layout (shared with every page), so this only toggles a class and removes it again on unmount.
 */
export default function NavSpy(): null {
  useEffect(() => {
    let frame = 0;
    let current: string | null = null;

    const apply = (next: string | null) => {
      if (next === current) return;
      if (current) {
        navLinks(current).forEach((a) => {
          a.classList.remove(ACTIVE_CLASS);
          a.removeAttribute('aria-current');
        });
      }
      if (next) {
        navLinks(next).forEach((a) => {
          a.classList.add(ACTIVE_CLASS);
          a.setAttribute('aria-current', 'location');
        });
      }
      current = next;
    };

    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let next: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET_PX) next = id;
      }
      apply(atBottom ? SECTION_IDS[SECTION_IDS.length - 1] : next);
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
      apply(null);
    };
  }, []);

  return null;
}
