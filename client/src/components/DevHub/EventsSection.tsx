import React from 'react';
import {events} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import UpdatesSection from './UpdatesSection';
import {eventStatus, isExpired, useNow} from './useNow';
import styles from './devhub.module.css';

const statusLabel = {upcoming: 'Upcoming', underway: 'Underway'} as const;

export default function EventsSection(): React.ReactElement {
  const now = useNow();
  const activeEvents = events.filter((event) => !isExpired(event.end, now));

  return (
    <Section
      id="events"
      title="Events & updates"
      lead="Get together with the community and the product team, and keep up with what's new.">
      <div className={styles.eventList}>
        {activeEvents.map((event) => {
          const status = eventStatus(event.start, now);
          return (
            <article key={event.id} className={styles.eventRow}>
              <div className={styles.eventDate}>
                <span className={styles.eventMonth}>{event.month}</span>
                <span className={styles.eventDay}>{event.day}</span>
              </div>
              <div className={styles.eventBody}>
                <h3>
                  {event.title}
                  {status ? <span className={styles.eventStatus}>{statusLabel[status]}</span> : null}
                </h3>
                <p className={styles.eventWhere}>{event.where}</p>
                <p>{event.blurb}</p>
              </div>
              <ExtLink href={event.href} className={styles.cardLink}>
                {event.cta}
                <span aria-hidden="true"> ↗</span>
              </ExtLink>
            </article>
          );
        })}
      </div>
      <UpdatesSection />
    </Section>
  );
}
