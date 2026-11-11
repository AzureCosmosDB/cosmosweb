import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import {events as curatedEvents} from '@site/src/data/devhub';
import Carousel from './Carousel';
import ExtLink from './ExtLink';
import Section from './Section';
import UpdatesSection from './UpdatesSection';
import {eventStatus, isExpired, useNow} from './useNow';
import styles from './devhub.module.css';

/** An event from the Microsoft Developer listing, read at build time by the events-feed plugin. */
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

/** One card in the Events carousel, whether the event is hand-picked or from the feed. */
interface EventCardData {
  id: string;
  start?: string;
  end?: string;
  dateLabel: string;
  tag: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
  /** Hand-picked events also show "Upcoming" / "Underway". */
  showStatus: boolean;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateLabel(start: string, end: string): string {
  const [, startMonth, startDay] = start.split('-').map(Number);
  const [, endMonth, endDay] = end.split('-').map(Number);
  if (start === end) return `${MONTHS[startMonth - 1]} ${startDay}`;
  return startMonth === endMonth
    ? `${MONTHS[startMonth - 1]} ${startDay}-${endDay}`
    : `${MONTHS[startMonth - 1]} ${startDay} - ${MONTHS[endMonth - 1]} ${endDay}`;
}

const statusLabel = {upcoming: 'Upcoming', underway: 'Underway'} as const;

function EventCard({event, now}: {event: EventCardData; now: Date | null}): React.ReactElement {
  const status = event.showStatus ? eventStatus(event.start, now) : null;
  return (
    <article className={styles.updateCard}>
      <div className={styles.updateMeta}>
        {event.start ? (
          <time dateTime={event.start} className={styles.postDate}>
            {event.dateLabel}
          </time>
        ) : (
          <span className={styles.postDate}>{event.dateLabel}</span>
        )}
        {event.tag ? <span className={styles.updateStage}>{event.tag}</span> : null}
        {status ? <span className={styles.updateStage}>{statusLabel[status]}</span> : null}
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

export default function EventsSection(): React.ReactElement {
  const now = useNow();
  const feed = (usePluginData('events-feed') as {events?: FeedEvent[]} | undefined)?.events ?? [];

  // Hand-picked events and any Azure Cosmos DB events found in the Microsoft listing are one list, soonest first.
  const picked: EventCardData[] = curatedEvents.map((event) => ({
    id: event.id,
    start: event.start,
    end: event.end,
    dateLabel: event.start && event.end ? dateLabel(event.start, event.end) : `${event.month} ${event.day}`,
    tag: event.where,
    title: event.title,
    blurb: event.blurb,
    cta: event.cta,
    href: event.href,
    showStatus: true,
  }));
  const pickedLinks = new Set(picked.map((event) => event.href));
  const fromFeed: EventCardData[] = feed
    .filter((event) => !pickedLinks.has(event.href))
    .map((event) => ({
      id: `feed-${event.id}`,
      start: event.start,
      end: event.end,
      dateLabel: event.dateLabel,
      tag: event.format,
      title: event.title,
      blurb: event.blurb,
      cta: event.cta,
      href: event.href,
      showStatus: false,
    }));

  // A site that has been live for a while still drops events that have ended since it was built.
  const upcoming = [...picked, ...fromFeed]
    .filter((event) => !isExpired(event.end, now))
    .sort((a, b) => (a.start ?? '').localeCompare(b.start ?? '') || a.title.localeCompare(b.title));

  return (
    <Section
      id="events"
      title="Events & updates"
      lead="Get together with the community and the product team, and keep up with what's new.">
      {upcoming.length > 0 ? (
        <Carousel noun="events" perView={3}>
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} now={now} />
          ))}
        </Carousel>
      ) : null}
      <UpdatesSection />
    </Section>
  );
}
