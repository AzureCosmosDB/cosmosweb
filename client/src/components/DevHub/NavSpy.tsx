import {useEffect} from 'react';

/** Section ids, in page order. Each has a matching `/#id` entry in the site navbar, unless mapped below. */
const SECTION_IDS = ['develop', 'tools', 'learn', 'certify', 'watch', 'blog', 'community', 'cosmonauts', 'events'];

/** Entries that do not have their own navbar link; none right now, but keep the lookup for future subsections. */
const NAV_TARGET: Record<string, string> = {};

// A section counts as current once its top edge has scrolled up past the navbar.
const OFFSET_PX = 100;

const ACTIVE_CLASS = 'navbar__link--active';
const DROPDOWN_ACTIVE_CLASS = 'dropdown__link--active';

function navLinks(id: string): HTMLAnchorElement[] {
  const target = NAV_TARGET[id] ?? id;
  // `$=` so the match also holds when the site is served from a sub-path (e.g. /cosmosweb/#develop).
  return Array.from(document.querySelectorAll<HTMLAnchorElement>(`.navbar a[href$="/#${target}"]`)).filter(
    (a) => !a.classList.contains('navbar-cta'),
  );
}

// Entries inside a dropdown use the dropdown link class, and their menu's trigger shows the group as current.
function mark(a: HTMLAnchorElement, on: boolean): void {
  const inDropdown = a.classList.contains('dropdown__link');
  a.classList.toggle(inDropdown ? DROPDOWN_ACTIVE_CLASS : ACTIVE_CLASS, on);
  if (on) a.setAttribute('aria-current', 'location');
  else a.removeAttribute('aria-current');
  if (inDropdown) {
    a.closest('.dropdown')?.querySelector(':scope > .navbar__link')?.classList.toggle(ACTIVE_CLASS, on);
  }
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
      if (current) navLinks(current).forEach((a) => mark(a, false));
      if (next) navLinks(next).forEach((a) => mark(a, true));
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
