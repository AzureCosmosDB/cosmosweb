// src/pages/developer-community.js

import React from 'react';
import Layout from '@theme/Layout';
import './community.css'; // Ensure you have styles.css imported

const developerCommunityData = [
  {
    name: 'Twitter',
    imageUrl: '../img/icons/x-logo-black.png', 
    link: 'https://x.com/AzureCosmosDB',
  },
  {
    name: 'Blog',
    imageUrl: '../img/rss.png', 
    link: 'https://devblogs.microsoft.com/cosmosdb/',
  },
  {
    name: 'Youtube',
    imageUrl: '../img/youtube.png', 
    link: 'https://www.youtube.com/@AzureCosmosDB',
  },
  {
    name: 'Global virtual user group',
    imageUrl: '../img/meetup.png',  
    link: 'https://www.meetup.com/azure-cosmos-db-global-user-group',
  },
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

export default function DeveloperCommunity() {
  return (
    <Layout title="Developer Community for Azure Cosmos DB" description="Join the Azure Cosmos DB Developer Community">
      <div className="container">
        <h1 className="title">Azure Cosmos DB Developer Community</h1>
        <div className="developer-cards">
          {developerCommunityData.map((developer, index) => (
            <DeveloperCard key={index} {...developer} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
