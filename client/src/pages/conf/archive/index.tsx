import React from 'react';
import Layout from '@theme/Layout';
import styles from './archive.module.css';

const timelineData = [
  {
    year: '2025',
    text: 'Azure Cosmos DB Conf 2025',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn',
  },
  {
    year: '2024',
    text: 'Azure Cosmos DB Conf 2024',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4',
  },
  {
    year: '2023',
    text: 'Azure Cosmos DB Conf 2023',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLlrxD0HtieHj3SsXKrnikSKeHQ7PCfa3u',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHj3SsXKrnikSKeHQ7PCfa3u',
  },
  {
    year: '2022',
    text: 'Azure Cosmos DB Conf 2022',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD',
  },
  {
    year: '2021',
    text: 'Azure Cosmos DB Conf 2021',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg',
  },
];

export default function TimelinePage() {
  return (
    <Layout title="Archive" description="Azure Cosmos DB Conf playlists from 2021 to 2025">
      <div className={styles.pageWrapper}>
        <header className={styles.hero}>
          <span className={styles.srOnly}>Azure Cosmos DB Conf Archive</span>
        </header>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <img src="/img/planet-1.png" alt="" aria-hidden="true" className={styles.icon} />
            Azure Cosmos DB Conf Archive
          </h1>
          <div className={styles.archiveIntro}>
            <p className={styles.subheader}>
              This archive collects past Azure Cosmos DB Conf events. Each year links to the full on-demand
              playlist, and the embedded videos below are the recordings of the live shows.
            </p>
            <div className={styles.playlistLinks}>
              <a
                href="https://www.youtube.com/playlist?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conf 2021
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conf 2022
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLlrxD0HtieHj3SsXKrnikSKeHQ7PCfa3u"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conf 2023
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conf 2024
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Azure Cosmos DB Conf 2025
              </a>
            </div>
          </div>
          <div className={styles.timeline}>
            {timelineData.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <a
                  className={styles.timelineYear}
                  href={item.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.year}
                </a>
                <div className={styles.timelineContent}>
                  <a
                    className={styles.timelineTextLink}
                    href={item.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                  <iframe
                    className={styles.timelineVideo}
                    src={item.embedUrl}
                    title={`Azure Cosmos DB Conf ${item.year} playlist`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
