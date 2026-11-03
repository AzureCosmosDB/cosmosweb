import React from 'react';
import Layout from '@theme/Layout';
import styles from './cfp.module.css';
import ConfFooter from './ConfFooter';

interface CfpItem {
  title: string;
  description: string;
  url?: string;
}

interface CfpSection {
  title: string;
  description?: string;
  items: CfpItem[];
}

const CFP_URL = 'https://aka.ms/CosmosConfCFP-site';

const sections: CfpSection[] = [
  {
    title: 'Submit a proposal',
    description:
      'Submit your session idea on the official CFP site. Deadlines, requirements, and status updates are maintained there.',
    items: [
      {
        title: 'Open the CFP submission site',
        url: CFP_URL,
        description: 'Use this link to submit, edit, or track your proposal.',
      },
    ],
  },
  {
    title: 'What we’re looking for',
    description:
      'Practical, high-signal talks that help builders ship with Azure Cosmos DB and the DocumentDB ecosystem.',
    items: [
      {
        title: 'Real-world lessons learned',
        description: 'Architecture tradeoffs, reliability, cost optimization, and performance debugging.',
      },
      {
        title: 'Demos and hands-on walkthroughs',
        description: 'Show a pattern end-to-end: data modeling, partitioning, query design, and operations.',
      },
      {
        title: 'Ecosystem and integrations',
        description: 'Tooling, SDKs, data pipelines, observability, and app patterns.',
      },
    ],
  },
  {
    title: 'Suggested topic areas',
    items: [
      {
        title: 'Data modeling and partitioning',
        description: 'Designing for scale, hot partition avoidance, hierarchical partition keys, and access patterns.',
      },
      {
        title: 'Performance and cost',
        description: 'RU optimization, indexing strategies, query tuning, and troubleshooting latency.',
      },
      {
        title: 'Reliability and global scale',
        description: 'Multi-region strategies, change feed patterns, backup/restore, and incident readiness.',
      },
      {
        title: 'AI app patterns',
        description: 'Chat history, contextual memory, RAG patterns, and (where relevant) vector search usage.',
      },
    ],
  },
  {
    title: 'Before you submit',
    items: [
      {
        title: 'Keep it audience-first',
        description:
          'Be explicit about what attendees will learn, who it’s for, and what they can apply immediately.',
      },
      {
        title: 'Prefer specifics over buzzwords',
        description: 'Concrete architecture details, metrics, and results make proposals stand out.',
      },
      {
        title: 'Check the CFP site for the latest details',
        url: CFP_URL,
        description:
          'Session length, formats, deadlines, and review timelines can change—treat the CFP site as the source of truth.',
      },
    ],
  },
];

const CfpPage: React.FC = () => {
  return (
    <Layout
      title="Call for Proposals"
      description="Submit a session proposal for Azure Cosmos DB Conf"
      wrapperClassName={styles.layoutWrapper}
      noFooter
    >
      <div className={styles.pageWrapper}>
        <header className={styles.hero}>
          <span className={styles.srOnly}>Azure Cosmos DB Conf Call for Proposals</span>
        </header>

        <div className={styles.container}>
          <h1 className={styles.title}>
            <img src="/img/planet-1.png" alt="" aria-hidden="true" className={styles.icon} />
            Call for Proposals
          </h1>

          <div className={styles.card}>
            <p className={styles.summary}>
              Want to speak at Azure Cosmos DB Conf? Submit your session proposal using the official CFP site.
            </p>

            <div className={styles.ctaRow}>
              <a className={styles.ctaPrimary} href={CFP_URL} target="_blank" rel="noopener noreferrer">
                Submit a proposal
              </a>
            </div>

            {sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.description ? (
                  <p className={styles.sectionDescription}>{section.description}</p>
                ) : null}

                <ul className={styles.simpleList}>
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.title}`} className={styles.listItem}>
                      <div className={styles.linkRow}>
                        <img
                          src="/img/planet-1.png"
                          alt=""
                          aria-hidden="true"
                          className={styles.bulletIcon}
                          loading="lazy"
                        />
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <span className={styles.linkText}>{item.title}</span>
                        )}
                      </div>
                      <p className={styles.description}>{item.description}</p>
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

export default CfpPage;
