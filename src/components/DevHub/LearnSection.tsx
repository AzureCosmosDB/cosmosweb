import React from 'react';
import {learn, offers} from '@site/src/data/devhub';
import BlogSection from './BlogSection';
import ExtLink from './ExtLink';
import Section from './Section';
import WatchSection from './WatchSection';
import {isExpired, useNow} from './useNow';
import styles from './devhub.module.css';

export default function LearnSection(): React.ReactElement {
  const now = useNow();
  const {certification, launchpad, intro} = learn;
  const activeOffers = offers.filter((offer) => !isExpired(offer.expires, now));

  return (
    <Section
      id="learn"
      alt
      title="Learn"
      lead="From your first query to a credential you can show: watch it, read it, build with it, get certified.">
      <p className={styles.introBar}>
        <span>{intro.label}</span>
        <ExtLink href={intro.href}>
          {intro.cta}
          <span aria-hidden="true"> ↗</span>
        </ExtLink>
      </p>

      <h3 id="certify" className={`${styles.subTitle} ${styles.firstSubTitle}`}>
        Get certified
      </h3>
      <div className={styles.certPanel}>
        <div className={styles.certStory}>
          <div className={styles.certCode}>
            <strong>{certification.code}</strong>
            <small>{certification.meta}</small>
          </div>
          <p className={styles.eyebrowLight}>{certification.eyebrow}</p>
          <h4 className={styles.certTitle}>{certification.name}</h4>
          <p>{certification.blurb}</p>
          <ExtLink href={certification.href} className={styles.primaryButton}>
            {certification.cta}
            <span aria-hidden="true" className={styles.arrow}>
              ↗
            </span>
          </ExtLink>
          <p className={styles.certFine}>{certification.fine}</p>
        </div>

        <div className={styles.certPath}>
          <p className={styles.eyebrowDark}>{launchpad.eyebrow}</p>
          <h4>{launchpad.title}</h4>
          <p>{launchpad.blurb}</p>
          <ol className={styles.launchSteps}>
            {launchpad.steps.map((step, index) => (
              <li key={step.href}>
                <ExtLink href={step.href} className={styles.launchStep}>
                  <span className={styles.launchNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className={styles.launchText}>
                    <strong>{step.title}</strong>
                    <small>{step.meta}</small>
                  </span>
                </ExtLink>
              </li>
            ))}
          </ol>
          <p className={styles.certMeta}>
            {launchpad.links.map((link) => (
              <ExtLink key={link.href} href={link.href}>
                {link.label}
                <span aria-hidden="true"> ↗</span>
              </ExtLink>
            ))}
          </p>
        </div>
      </div>

      {activeOffers.length > 0 ? (
        <>
          <h4 className={styles.subTitle}>Take DP-420 for less</h4>
          <div className={styles.offerGrid}>
            {activeOffers.map((offer) => (
              <article key={offer.id} className={styles.offerCard}>
                <p className={styles.eyebrowDark}>{offer.eyebrow}</p>
                <p className={styles.offerDate}>{offer.date}</p>
                <h4>{offer.title}</h4>
                <p>{offer.blurb}</p>
                <p className={styles.fine}>
                  {offer.fine}
                  {offer.fineLink ? (
                    <>
                      {' '}
                      <ExtLink href={offer.fineLink.href}>{offer.fineLink.label}</ExtLink>
                    </>
                  ) : null}
                </p>
                <ExtLink href={offer.href} className={styles.cardLink}>
                  {offer.cta}
                  <span aria-hidden="true"> ↗</span>
                </ExtLink>
              </article>
            ))}
          </div>
        </>
      ) : null}

      <WatchSection />
      <BlogSection />
    </Section>
  );
}
