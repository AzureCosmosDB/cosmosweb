import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./what-is.module.css";
import ConfFooter from "./ConfFooter";

const CONF_YEAR = "2026";
const CONF_DATE_LONG = "April 28, 2026";
const CONF_DATE_DISPLAY = "April 28 - 9:00 AM - 2:00 PM PDT";

const WhatIsConfPage: React.FC = () => {
  return (
    <Layout
      title={`What is Azure Cosmos DB Conf ${CONF_YEAR}?`}
      description="Learn more about Azure Cosmos DB Conf"
      wrapperClassName={styles.layoutWrapper}
      noFooter
    >
      <div className={styles.pageWrapper}
>
        <header className={styles.hero}>
          <span className={styles.srOnly}>{`Azure Cosmos DB Conf ${CONF_YEAR}`}</span>
        </header>

        <div className={styles.container}
>
          <h1 className={styles.title}>
            <img src="/img/planet-1.png" alt="" aria-hidden="true" className={styles.icon} />
            What is Azure Cosmos DB Conf?
          </h1>

          <div className={styles.card}>
            <p className={styles.copy}>
              Azure Cosmos DB Conf is a free virtual event featuring expert-led sessions, demos, and
              real-world guidance on building globally distributed apps with Azure Cosmos DB.
            </p>
            <p className={styles.copy}>
              Join us on <strong>{CONF_DATE_LONG}</strong> for live content and on-demand sessions.
            </p>
            <p className={styles.copy}>This is an event you won&apos;t want to miss!</p>

            <div className={styles.actions}>
              <a
                className={styles.primaryButton}
                href="https://aka.ms/cosmosconfreg"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔔 Register for updates
              </a>
              <Link className={styles.secondaryButton} to="/conf#cfp">
                🎤 CFP Now Closed
              </Link>
              <Link className={styles.tertiaryButton} to="/conf#about">
                ℹ️ Learn more
              </Link>
            </div>

            <div className={styles.dateLine}>{CONF_DATE_DISPLAY}</div>
          </div>
        </div>

        <ConfFooter />
      </div>
    </Layout>
  );
};

export default WhatIsConfPage;
