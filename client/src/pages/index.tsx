import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const title = "Azure Cosmos DB Samples Gallery";
const description = "Your best source for patterns and content for Azure Cosmos DB";
const subtitle = "Featured Resources";
const developerCommunityData = [
  {
    name: 'Discover Templates',
    imageUrl: '../img/logo.svg',
    link: 'https://azurecosmosdb.github.io/gallery/',
  },
  {
    name: 'Learn more about Azure Cosmos DB',
    imageUrl: '../img/icons/msft.png',
    link: 'https://learn.microsoft.com/azure/cosmos-db/',
  },
  {
    name: 'Azure Cosmos DB community',
    imageUrl: '../img/logo.svg',
    link: '/community',
  }
];



const DeveloperCard = ({ name, imageUrl, link }) => {
  return (
    <div className="developer-card">
      <img src={imageUrl} alt={name} className="developer-card-image" />
      <h3>{name}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer" className="developer-card-link">
        Learn More <span className="arrow">→</span>
      </a>
    </div>
  );
};


export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(theme === 'dark');
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(newTheme === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <Layout title="Azure Cosmos DB Dev Home" description="Azure Cosmos DB Dev Home">
      <main className={styles.mainContainer}>
        <div className={styles.coverPageContainer}>
          <img
            src={isDarkMode ? useBaseUrl("/img/backgroundDark.png") : useBaseUrl("/img/backgroundLight.png")}
            className={styles.cover}
            onError={({ currentTarget }) => { currentTarget.style.display = "none"; }}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textContainer}>
            <h2>Azure Cosmos DB</h2>
            <p>Your best source for patterns and content for Azure Cosmos DB</p>
          </div>
        </div>
        <div className="developer-cards">
          {developerCommunityData.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>

      </main>
    </Layout>
  );
}
