import React from 'react';
import Layout from '@theme/Layout';
import resourcesData from './resources.json';
import styles from './resources.module.css';
import ConfFooter from './ConfFooter';

interface Resource {
  title: string;
  url: string;
  description: string;
}

interface ResourceSection {
  title: string;
  description?: string;
  items: Resource[];
}

const Resources: React.FC = () => {
  return (
    <Layout
      title="Resources"
      description="Useful links and calls to action"
      wrapperClassName={styles.layoutWrapper}
      noFooter
    >
      <div className={styles.pageWrapper}>
        <header className={styles.hero}>
          <span className={styles.srOnly}>Azure Cosmos DB Conf Resources</span>
        </header>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <img src="/img/planet-1.png" alt="" aria-hidden="true" className={styles.icon} />
            Resources
          </h1>

          <div className={styles.card}>
            <p className={styles.summary}>
              A curated set of links for Azure Cosmos DB, Azure DocumentDB, and the open-source DocumentDB project.
            </p>

            {(resourcesData as ResourceSection[]).map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.description ? (
                  <p className={styles.sectionDescription}>{section.description}</p>
                ) : null}

                <ul className={styles.simpleList}>
                  {section.items.map((res: Resource) => (
                    <li key={res.url} className={styles.listItem}>
                      <div className={styles.linkRow}>
                        <img
                          src="/img/planet-1.png"
                          alt=""
                          aria-hidden="true"
                          className={styles.bulletIcon}
                          loading="lazy"
                        />
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {res.title}
                        </a>
                      </div>
                      <p className={styles.description}>{res.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <ConfFooter />
      </div>
    </Layout>
  );
};

export default Resources;
