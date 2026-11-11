import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './speakers.module.css';
import speakersData from '../speakers2026.json';

interface Session {
  title: string;
  abstract: string;
  duration: string;
}

interface Speaker {
  slug: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  session: Session;
  x?: string;
  linkedin?: string;
}

export default function Speakers() {
  const speakers: Speaker[] = speakersData as unknown as Speaker[];

  return (
    <Layout
      title="Azure Cosmos DB Conf 2026 — Speakers"
      description="Meet the speakers presenting at Azure Cosmos DB Conf 2026 on April 28."
    >
      <main className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Azure Cosmos DB Conf 2026 Speakers</h1>
          <p className={styles.subheading}>
            Hear from {speakers.length} expert{speakers.length !== 1 ? 's' : ''} at our free virtual event on April 28, 2026.
          </p>
          <div className={styles.headerActions}>
            <a
              className={styles.registerBtn}
              href="https://aka.ms/cosmosconfreg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Free
            </a>
            <Link className={styles.archiveLink} to="/conf#archive">
              View 2025 Speakers →
            </Link>
          </div>
        </div>

        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {speakers.map((speaker) => (
              <Link
                key={speaker.slug}
                to={`/conf/speakers/Speaker?slug=${encodeURIComponent(speaker.slug)}`}
                className={styles.card}
              >
                <div className={styles.imgWrap}>
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className={styles.img}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/img/speakers/placeholder.jpg';
                    }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.name}>{speaker.name}</span>
                  <span className={styles.role}>{speaker.role}</span>
                  <span className={styles.sessionTitle}>{speaker.session.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

