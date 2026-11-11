import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './devhub.module.css';

interface CarouselProps {
  /** What the cards are, in plural, for assistive technology: "videos", "blog posts", "updates". */
  noun: string;
  /** Cards visible at once on a wide screen. */
  perView: 3 | 4;
  children: React.ReactNode[];
}

const arrow = (direction: 'prev' | 'next'): React.ReactElement => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
    <path
      d={direction === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A row of cards that scrolls sideways, one screenful at a time, so older items stay one click away
 * without making the page longer. It is plain scroll-snapping, so swipe, trackpad and keyboard all work.
 */
export default function Carousel({noun, perView, children}: CarouselProps): React.ReactElement {
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(el);
    return () => observer?.disconnect();
  }, [update, children.length]);

  const page = (direction: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({left: direction * el.clientWidth, behavior: reduced ? 'auto' : 'smooth'});
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      page(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  const overflowing = canPrev || canNext;

  return (
    <div role="group" aria-roledescription="carousel" aria-label={`Latest ${noun}`} className={styles.carousel}>
      <div className={styles.carouselControls} style={{visibility: overflowing ? 'visible' : 'hidden'}}>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => page(-1)}
          disabled={!canPrev}
          aria-label={`Previous ${noun}`}>
          {arrow('prev')}
        </button>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => page(1)}
          disabled={!canNext}
          aria-label={`Next ${noun}`}>
          {arrow('next')}
        </button>
      </div>
      <ul
        ref={track}
        className={`${styles.carouselTrack} ${perView === 4 ? styles.perView4 : styles.perView3}`}
        onScroll={update}
        onKeyDown={onKeyDown}>
        {React.Children.map(children, (child) => (
          <li className={styles.carouselItem}>{child}</li>
        ))}
      </ul>
    </div>
  );
}
