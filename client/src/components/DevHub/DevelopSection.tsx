import React from 'react';
import {guideGroups, languages} from '@site/src/data/devhub';
import {useLanguage} from './LanguageContext';
import {languageIcons} from './icons';
import styles from './devhub.module.css';

export default function DevelopSection(): React.ReactElement {
  const {language, setLanguage} = useLanguage();

  return (
    <section id="develop" className={styles.section} aria-labelledby="develop-heading">
      <div className={styles.sectionInner}>
        <h2 id="develop-heading" className={styles.sectionTitle}>
          Develop
        </h2>
        <p className={styles.sectionLead}>
          Pick your language. The quickstart, SDK guide and API reference below follow your choice, and so does the code
          at the top of the page.
        </p>

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
                  <a href={lang.guide}>Developer guide</a>
                  <span aria-hidden="true" className={styles.divider} />
                  <a href={lang.api}>API reference</a>
                </div>
              </article>
            );
          })}
        </div>

        <h3 className={styles.subTitle}>Developer guide</h3>
        <div className={styles.guideGrid}>
          <div className={`${styles.guideCard} ${styles.guideCardFeatured}`}>
            <h4>Get started with {language.name}</h4>
            <p>Install the SDK, authenticate with Microsoft Entra ID and run your first query.</p>
            <ul>
              <li>
                <a href={language.quickstart}>{language.name} quickstart</a>
              </li>
              <li>
                <a href={language.guide}>{language.name} SDK guide</a>
              </li>
              <li>
                <a href={language.api}>{language.name} API reference</a>
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
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
