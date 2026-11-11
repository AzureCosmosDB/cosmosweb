import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import Carousel from './Carousel';
import ExtLink from './ExtLink';
import {isExpired, useNow} from './useNow';
import styles from './devhub.module.css';

interface FeedEvent {
  id: string;
  start: string;
  end: string;
  dateLabel: string;
  format: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
}

function EventCard({event}: {event: FeedEvent}): React.ReactElement {
  return (
    <article className={styles.updateCard}>
      <div className={styles.updateMeta}>
        <time dateTime={event.start} className={styles.postDate}>
          {event.dateLabel}
        </time>
        {event.format ? <span className={styles.updateStage}>{event.format}</span> : null}
      </div>
      <h4>{event.title}</h4>
      {event.blurb ? <p>{event.blurb}</p> : null}
      <ExtLink href={event.href} className={styles.cardLink}>
        {event.cta}
        <span aria-hidden="true"> ↗</span>
      </ExtLink>
    </article>
  );
}

export default function EventsFeedSection(): React.ReactElement | null {
  // Upcoming data and developer events from Microsoft (read at build time). Hidden when none could be read.
  const feed = (usePluginData('events-feed') as {events?: FeedEvent[]} | undefined)?.events ?? [];
  const now = useNow();
  // A site that has been live for a while still drops events that have ended since it was built.
  const upcoming = feed.filter((event) => !isExpired(event.end, now));
  if (upcoming.length === 0) return null;

  return (
    <div id="data-events" className={styles.subsection}>
      <h3 className={styles.subTitle}>Data and developer events</h3>
      <p className={styles.toolGroupBlurb}>Upcoming livestreams and events from Microsoft for developers who work with data.</p>

      <Carousel noun="events" perView={3}>
        {upcoming.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Carousel>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://developer.microsoft.com/en-us/events">See all Microsoft developer events</ExtLink>
      </p>
    </div>
  );
}
