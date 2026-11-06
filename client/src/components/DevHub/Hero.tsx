import React, {useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {languages} from '@site/src/data/devhub';
import CodeSnippet from './CodeSnippet';
import {useLanguage} from './LanguageContext';
import {languageIcons} from './icons';
import styles from './devhub.module.css';

export default function Hero(): React.ReactElement {
  const {language, setLanguage} = useLanguage();
  const planet = useBaseUrl('/img/planet-1.png');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = languages.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next < 0) return;
    event.preventDefault();
    setLanguage(languages[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <img src={planet} alt="" className={styles.eyebrowLogo} width={28} height={28} />
            Azure Cosmos DB developer hub
          </p>
          <h1 className={styles.heroTitle}>Build with Azure Cosmos DB</h1>
          <p className={styles.heroLead}>
            Build apps and AI agents on a globally distributed database. SDKs, tools and samples, plus the community
            and training to go with them.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#develop">
              Start building
            </a>
            <a className={styles.secondaryButton} href={language.quickstart}>
              {language.name} quickstart
              <span aria-hidden="true" className={styles.arrow}>
                →
              </span>
            </a>
          </div>
          <ul className={styles.heroTags} aria-label="Highlights">
            <li>5 SDKs</li>
            <li>AI apps &amp; agents</li>
            <li>Free local emulator</li>
            <li>Certification path</li>
          </ul>
        </div>

        <div className={styles.codeCard}>
          <div className={styles.tabList} role="tablist" aria-label="Choose a language">
            {languages.map((lang, index) => {
              const selected = lang.id === language.id;
              return (
                <button
                  key={lang.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hero-tab-${lang.id}`}
                  aria-selected={selected}
                  aria-controls="hero-tabpanel"
                  tabIndex={selected ? 0 : -1}
                  className={selected ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                  onClick={() => setLanguage(lang.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}>
                  <span className={styles.tabIcon}>{languageIcons[lang.id]}</span>
                  {lang.name}
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id="hero-tabpanel" aria-labelledby={`hero-tab-${language.id}`}>
            <p className={styles.codeCaption}>Give an AI agent a memory: store it, then recall it by meaning.</p>
            {/*
              Every language is rendered in the same grid cell and only the active one is visible, so
              the panel is always as tall as the longest snippet and switching never shifts the page.
            */}
            <div className={styles.panelStack}>
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className={lang.id === language.id ? `${styles.panelItem} ${styles.panelItemActive}` : styles.panelItem}>
                  <div className={styles.install}>
                    <span className={styles.installLabel}>Install</span>
                    <CodeSnippet code={lang.install} language="bash" label={`${lang.name} install command`} />
                  </div>
                  <div className={styles.example}>
                    <CodeSnippet code={lang.snippet} language={lang.prism} label={`${lang.name} example`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
