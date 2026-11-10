import React from 'react';
import {guideGroups, languages, scenarios} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import {useLanguage} from './LanguageContext';
import Section from './Section';
import {languageIcons} from './icons';
import styles from './devhub.module.css';

export default function DevelopSection(): React.ReactElement {
  const {language, setLanguage} = useLanguage();

  return (
    <Section
      id="develop"
      title="Develop"
      lead="Pick your language. The quickstart, SDK guide and API reference below follow your choice, and so does the code at the top of the page.">
      <div className={styles.langGrid} role="group" aria-label="Azure Cosmos DB SDKs">
        {languages.map((lang) => {
          const selected = lang.id === language.id;
          return (
            <article key={lang.id} className={selected ? `${styles.langCard} ${styles.langCardActive}` : styles.langCard}>
              <button
                type="button"
                className={styles.langSelect}
                aria-pressed={selected}
                onClick={() => setLanguage(lang.id)}>
                <span className={styles.langIcon}>{languageIcons[lang.id]}</span>
                <span className={styles.langName}>{lang.name}</span>
                <span className={styles.version} title={`${lang.packageName} ${lang.version}`}>
                  v{lang.version}
                </span>
              </button>
              <div className={styles.langLinks}>
                <ExtLink href={lang.guide}>Developer guide</ExtLink>
                <span aria-hidden="true" className={styles.divider} />
                <ExtLink href={lang.api}>API reference</ExtLink>
              </div>
            </article>
          );
        })}
      </div>

      <h3 className={styles.subTitle}>Developer guide</h3>
      <div className={styles.guideGrid}>
        <div className={`${styles.guideCard} ${styles.guideCardFeatured}`}>
          <h4>Get started with {language.name}</h4>
          <p>Install the SDK, connect to your account and run your first query.</p>
          <ul>
            <li>
              <ExtLink href={language.quickstart}>{language.name} quickstart</ExtLink>
            </li>
            <li>
              <ExtLink href={language.guide}>{language.name} SDK guide</ExtLink>
            </li>
            <li>
              <ExtLink href={language.api}>{language.name} API reference</ExtLink>
            </li>
          </ul>
        </div>
        {guideGroups.map((group) => (
          <div key={group.id} className={styles.guideCard}>
            <h4>{group.title}</h4>
            <p>{group.blurb}</p>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <ExtLink href={link.href}>{link.label}</ExtLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className={styles.subTitle}>What will you create?</h3>
      <p className={styles.toolGroupBlurb}>Start with a real scenario. Find the code, learn the pattern, and make it your own.</p>
      <div className={styles.scenarioGrid}>
        {scenarios.map((scenario) => (
          <article key={scenario.id} className={styles.scenarioCard}>
            <span className={styles.scenarioTags}>{scenario.tags}</span>
            <h4>{scenario.title}</h4>
            <p>{scenario.blurb}</p>
            <ExtLink href={scenario.href} className={styles.cardLink}>
              {scenario.cta}
              <span aria-hidden="true"> ↗</span>
            </ExtLink>
          </article>
        ))}
      </div>
    </Section>
  );
}
