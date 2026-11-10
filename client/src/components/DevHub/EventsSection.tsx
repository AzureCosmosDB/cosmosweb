import React from 'react';
import {events, posts} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import {eventStatus, isExpired, useNow} from './useNow';
import styles from './devhub.module.css';

const statusLabel = {upcoming: 'Upcoming', underway: 'Underway'} as const;

export default function EventsSection(): React.ReactElement {
  const now = useNow();
  const activeEvents = events.filter((event) => !isExpired(event.end, now));

  return (
    <Section
      id="events"
      alt
      title="Events & news"
      lead="Get together, keep growing, and stay current with what the product team is shipping.">
      <h3 className={styles.subTitle}>What&apos;s happening</h3>
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
                <h4>
                  {event.title}
                  {status ? <span className={styles.eventStatus}>{statusLabel[status]}</span> : null}
                </h4>
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

      <h3 className={styles.subTitle}>From the blog</h3>
      <div className={styles.postGrid}>
        {posts.map((post) => (
          <article key={post.id} className={styles.postCard}>
            <time dateTime={post.date} className={styles.postDate}>
              {post.dateLabel} / {post.topic}
            </time>
            <h4>{post.title}</h4>
            <p>{post.blurb}</p>
            <ExtLink href={post.href} className={styles.cardLink}>
              {post.cta}
              <span aria-hidden="true"> ↗</span>
            </ExtLink>
          </article>
        ))}
      </div>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://devblogs.microsoft.com/cosmosdb/">Read the Azure Cosmos DB blog</ExtLink>
      </p>
    </Section>
  );
}
