import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";
import agendaData from "../agenda.json";
import { useVideoReleased } from "../../../conf/videoRelease";

interface AgendaSectionProps {
  confYear: string;
}

interface AgendaSpeaker {
  name: string;
  slug: string;
}

interface AgendaItem {
  time?: string;
  title: string;
  description?: string;
  speakers: AgendaSpeaker[];
  url?: string;
}

const { live: liveAgenda, onDemand: onDemandAgenda } = agendaData as {
  live: AgendaItem[];
  onDemand: AgendaItem[];
};

// Videos become clickable on 2026-04-28 1:30 PM PDT (PDT = UTC-7).
const renderAgendaCta = (url: string | undefined, released: boolean) => {
  if (url && released) {
    return (
      <a
        className={styles.agendaCardButton}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube
      </a>
    );
  }
  return (
    <span className={styles.agendaCardButton} aria-disabled="true">
      Coming soon
    </span>
  );
};

const handleSpeakerClick = (slug: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  const target = `#speaker/${slug}`;
  if (window.location.hash === target) {
    // Force re-trigger even when the hash hasn't changed.
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = target;
  }
};

const renderSpeakers = (speakers: AgendaSpeaker[]) =>
  speakers.map((speaker, i) => (
    <React.Fragment key={speaker.slug}>
      {i > 0 && ", "}
      <a href={`#speaker/${speaker.slug}`} onClick={handleSpeakerClick(speaker.slug)}>
        {speaker.name}
      </a>
    </React.Fragment>
  ));

const AgendaSection = ({ confYear }: AgendaSectionProps) => {
  const released = useVideoReleased();

  return (
    <section className={styles.newsSection} aria-labelledby="agenda-heading">
      <div id="agenda" className={styles.sectionAnchor} />
      <div className={styles.newsInner}>
        <div className={styles.newsTitleColumn}>
          <img
            className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
            src={useBaseUrl("/img/icons/icon_agenda.png")}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <h2 id="agenda-heading" className={styles.newsTitle}>
            Event agenda
          </h2>
          <p className={styles.newsDescription}>
            Azure Cosmos DB Conf 2026 streamed live on April 28, 2026 from 9:00 AM to 2:00 PM PDT. All times shown in Pacific Daylight Time. Every session is now available on demand.
          </p>
        </div>

        <div className={styles.newsCardsColumn}>
          <div className={styles.agendaCards}>
            {liveAgenda.map((item, index) => (
              <article key={index} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>{item.time}</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{renderSpeakers(item.speakers)}</p>
                  {item.description && (
                    <p className={styles.agendaCardDescription}>{item.description}</p>
                  )}
                </div>
                {renderAgendaCta(item.url, released)}
              </article>
            ))}
          </div>

          <h3 className={styles.agendaOnDemandHeading}>Exclusive On-Demand Sessions</h3>
          <div className={styles.agendaCards}>
            {onDemandAgenda.map((item, index) => (
              <article key={`ondemand-${index}`} className={styles.agendaCard}>
                <div className={styles.agendaTime}>
                  <span>On-Demand</span>
                </div>
                <div className={styles.agendaCardContent}>
                  <h3 className={styles.agendaCardTitle}>{item.title}</h3>
                  <p className={styles.agendaCardSpeaker}>{renderSpeakers(item.speakers)}</p>
                  {item.description && (
                    <p className={styles.agendaCardDescription}>{item.description}</p>
                  )}
                </div>
                {renderAgendaCta(item.url, released)}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
