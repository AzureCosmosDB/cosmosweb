import React from 'react';
import Layout from '@theme/Layout';
import styles from './speakers.module.css';
import interviewData from './interviews.json';

interface Interview {
  name: string;
  title: string;
  company: string;
  youtube_url: string;
  description: string;
}

const InterviewCard: React.FC<Interview> = ({ name, title, company, youtube_url, description }) => {
  const now = new Date();
  const unlockTime = new Date("2025-04-15T11:00:00-07:00"); // 11 AM PT

  // Use placeholder video until unlock time
  const videoSrc =
    now < unlockTime
      ? "https://www.youtube.com/embed/qXSur9LIfok"
      : youtube_url;

  return (
    <div className={styles.featureCard}>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{name}</h3>
        <p className={styles.featureIntro}>{title} at {company}</p>
        <p className={styles.featureSession}>{description}</p>

        <div className={styles.videoContainer}>
          <iframe
            src={videoSrc}
            title={`Interview with ${name}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const CustomerInterviews: React.FC = () => {
  const interviews: Interview[] = interviewData;

  return (
    <Layout title="Customer Interviews" description="Hear from Azure Cosmos DB customers">
      <main>
        <section className={styles.speakerSection}>
          <div className={styles.speakerContainer}>
            <h2 className={styles.speakerHeading}>Customer Interviews</h2>
            <p className={styles.speakerIntro}>
              Hear directly from industry leaders about how they're using <strong>Azure Cosmos DB</strong> to power real-world applications at scale. These interviews cover topics like AI innovation, compliance, peak-season readiness, and healthcare research—straight from the teams building with Azure Cosmos DB every day.
            </p>
            <div className={styles.stackedContainer}>
              {interviews.map((interview) => (
                <InterviewCard key={interview.name} {...interview} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CustomerInterviews;
