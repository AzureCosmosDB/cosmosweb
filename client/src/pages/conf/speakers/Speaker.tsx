import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import speakersData from '../speakers2026.json';
import styles from './Speaker.module.css';

const xLogoLight = '/img/icons/x-logo-black.png';
const xLogoDark = '/img/icons/x-logo-white.png';
const linkedinLogoLight = '/img/icons/InBug-Black.png';
const linkedinLogoDark = '/img/icons/InBug-White.png';

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

const getSessionLabel = (duration: string): string => {
  switch (duration) {
    case '5':  return '5-Minute Lightning Talk';
    case '25': return '25-Minute Session';
    case '45': return '45-Minute Deep Dive';
    default:   return `Session (${duration} min)`;
  }
};

export default function SpeakerDetail() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [speaker, setSpeaker] = useState<Speaker | null | undefined>(undefined);

  useEffect(() => {
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) { setSpeaker(null); return; }
    const found = (speakersData as unknown as Speaker[]).find(
      (s) => s.slug.toLowerCase() === slug.toLowerCase()
    );
    setSpeaker(found ?? null);
  }, [location.search]);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.dataset.theme === 'dark');
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  if (speaker === undefined) return null;

  if (!speaker) {
    return (
      <Layout title="Speaker Not Found">
        <div className={styles.notFound}>
          <h1>Speaker Not Found</h1>
          <p>We could not find that speaker. They may not have been announced yet.</p>
          <Link className={styles.backBtn} to="/conf/speakers">
            ← Back to Speakers
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${speaker.name} — Azure Cosmos DB Conf 2026`}
      description={`${speaker.name}: ${speaker.session.title}`}
    >
      <div className={styles.page}>
        <div className={styles.inner}>
          <Link className={styles.backBtn} to="/conf/speakers">
            ← Back to Speakers
          </Link>

          <div className={styles.card}>
            {/* Profile */}
            <div className={styles.profile}>
              <div className={styles.imgWrap}>
                <img
                  src={speaker.img}
                  alt={speaker.name}
                  className={styles.img}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      '/img/speakers/placeholder.jpg';
                  }}
                />
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.name}>{speaker.name}</h1>
                <p className={styles.role}>{speaker.role}</p>
                {(speaker.x || speaker.linkedin) && (
                  <div className={styles.socials}>
                    {speaker.x && (
                      <a
                        href={speaker.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X / Twitter"
                      >
                        <img
                          className={styles.socialIcon}
                          src={isDark ? xLogoDark : xLogoLight}
                          alt="X"
                        />
                      </a>
                    )}
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <img
                          className={styles.socialIcon}
                          src={isDark ? linkedinLogoDark : linkedinLogoLight}
                          alt="LinkedIn"
                        />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Session */}
            <div className={styles.sessionBlock}>
              <div className={styles.sessionLabel}>
                {getSessionLabel(speaker.session.duration)}
              </div>
              <h2 className={styles.sessionTitle}>{speaker.session.title}</h2>
              <p className={styles.sessionAbstract}>{speaker.session.abstract}</p>
            </div>

            {/* Bio */}
            {speaker.bio && (
              <div className={styles.bioBlock}>
                <h2 className={styles.bioHeading}>About {speaker.name}</h2>
                <p className={styles.bio}>{speaker.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
