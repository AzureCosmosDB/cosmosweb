import React, { useEffect, useState } from "react";
import styles from "../conf.module.css";

interface StreamSectionProps {
  confYear: string;
  streamEmbedUrl: string | null;
  /** When true, hide the countdown + subscribe notice (stream is live). */
  live?: boolean;
}

// Azure Cosmos DB Conf 2026: April 28, 2026 · 9:00 AM PDT (UTC−7)
const EVENT_START = new Date("2026-04-28T09:00:00-07:00").getTime();

interface Countdown {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const computeCountdown = (): Countdown => {
  const now = Date.now();
  const diff = EVENT_START - now;
  if (diff <= 0) {
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { done: false, days, hours, minutes, seconds };
};

const pad = (value: number) => value.toString().padStart(2, "0");

// Convert a YouTube embed URL (https://www.youtube.com/embed/VIDEOID) into a
// watchable URL (https://www.youtube.com/watch?v=VIDEOID). Falls back to the
// original URL if the format is unrecognized.
const toWatchUrl = (embedUrl: string | null): string | null => {
  if (!embedUrl) return null;
  const match = embedUrl.match(/youtube\.com\/embed\/([^/?#]+)/);
  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return embedUrl;
};

const StreamSection = ({ confYear, streamEmbedUrl, live = false }: StreamSectionProps) => {
  // Start with a stable value for SSR; update on the client after mount.
  const [countdown, setCountdown] = useState<Countdown>(() => computeCountdown());

  useEffect(() => {
    setCountdown(computeCountdown());
    const id = window.setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={styles.streamSection} data-node-id="6:234">
      <div id="stream" className={styles.sectionAnchor} />
      <div className={styles.streamOuter}>
        <div className={styles.streamInner}>
          <div className={styles.streamCard}>
            <h2 className={styles.streamTitle} data-node-id="6:226">
              Missed Azure Cosmos DB Conf {confYear}? Watch it here.
            </h2>

            <div className={`${styles.streamVideoFrame} ${styles.streamThankYouFrame}`} data-node-id="6:225">
              {toWatchUrl(streamEmbedUrl) ? (
                <a
                  className={styles.streamThankYouLink}
                  href={toWatchUrl(streamEmbedUrl) as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch the Azure Cosmos DB Conf ${confYear} recording on YouTube`}
                >
                  <img
                    className={styles.streamThankYouImage}
                    src="/img/thank_you_closing.png"
                    alt={`Thank you for joining Azure Cosmos DB Conf ${confYear}`}
                  />
                </a>
              ) : (
                <img
                  className={styles.streamThankYouImage}
                  src="/img/thank_you_closing.png"
                  alt={`Thank you for joining Azure Cosmos DB Conf ${confYear}`}
                />
              )}
            </div>

            <div className={styles.streamCta} data-node-id="6:233">
              {!live && (
                <p className={styles.streamCtaNote} data-node-id="6:230">
                  Couldn&apos;t catch the event live? Watch the full recording on YouTube and share your feedback in the post-event survey.
                </p>
              )}

              {!live && (
                countdown.done ? (
                  <p className={styles.streamCountdownLive} aria-live="polite">
                    🔴 We&apos;re live!
                  </p>
                ) : (
                  <div
                    className={styles.streamCountdown}
                    role="timer"
                    aria-live="off"
                    aria-label={`Time until Azure Cosmos DB Conf ${confYear} goes live`}
                  >
                    <span className={styles.streamCountdownLabel}>Live in</span>
                    <div className={styles.streamCountdownGrid}>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.days)}</span>
                        <span className={styles.streamCountdownName}>days</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.hours)}</span>
                        <span className={styles.streamCountdownName}>hrs</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.minutes)}</span>
                        <span className={styles.streamCountdownName}>min</span>
                      </div>
                      <div className={styles.streamCountdownUnit}>
                        <span className={styles.streamCountdownValue}>{pad(countdown.seconds)}</span>
                        <span className={styles.streamCountdownName}>sec</span>
                      </div>
                    </div>
                  </div>
                )
              )}

              <div className={styles.streamCtaButtonRow}>
                <a
                  className={styles.streamCtaButton}
                  href="https://aka.ms/CosmosConf2026Survey"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Azure Cosmos DB Conference 2026 Post-Event Survey
                </a>
                {toWatchUrl(streamEmbedUrl) && (
                  <a
                    className={styles.streamCtaButton}
                    href={toWatchUrl(streamEmbedUrl) as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Watch the Azure Cosmos DB Conf 2026 recording on YouTube"
                  >
                    Watch the Recording on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamSection;
