import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./conf.module.css";
import {
  FaBookOpen,
  FaFileLines,
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaStackOverflow,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

type ConfFooterProps = {
  confYear?: string;
};

export default function ConfFooter({ confYear = "2026" }: ConfFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.confFooter} data-node-id="6:850">
      <div className={styles.confFooterInner}>

        {/* ── Top row: logo + link columns ── */}
        <div className={styles.confFooterTop}>

          {/* Logo block — Figma node 6:941 */}
          <div className={styles.confFooterLogo} data-node-id="6:941">
            <img
              className={styles.confFooterLogoMark}
              src={useBaseUrl("/img/conf/footer_logo_mark.svg")}
              alt=""
              aria-hidden="true"
              width={106}
              height={106}
              loading="lazy"
            />
            <img
              className={`${styles.confFooterWordmark} ${styles.confFooterWordmarkLight}`}
              src={useBaseUrl("/img/conf/footer_wordmark_light.svg")}
              alt={`Azure Cosmos DB Conf ${confYear}`}
              width={287}
              height={77}
              loading="lazy"
            />
            <img
              className={`${styles.confFooterWordmark} ${styles.confFooterWordmarkDark}`}
              src={useBaseUrl("/img/conf/footer_wordmark_dark.svg")}
              alt=""
              aria-hidden="true"
              width={287}
              height={77}
              loading="lazy"
            />
          </div>

          {/* Link columns */}
          <div className={styles.confFooterLinks} data-node-id="6:974">

            {/* Docs */}
            <div className={styles.confFooterColumn} data-node-id="6:852">
              <div className={styles.confFooterColumnTitle}>Docs</div>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/cosmos-db/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Azure Cosmos DB</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://learn.microsoft.com/azure/documentdb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Azure DocumentDB (with MongoDB compatibility)</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://documentdb.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaFileLines />
                </span>
                <span>Open Source DocumentDB</span>
              </a>
            </div>

            {/* Community */}
            <div className={styles.confFooterColumn} data-node-id="6:885">
              <div className={styles.confFooterColumnTitle}>Community</div>
              <a
                className={styles.confFooterLink}
                href="https://www.linkedin.com/company/azure-cosmos-db"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaLinkedinIn />
                </span>
                <span>LinkedIn</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="http://aka.ms/AzureCosmosDBYouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaYoutube />
                </span>
                <span>YouTube</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://aka.ms/open-source-discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaDiscord />
                </span>
                <span>Discord</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://x.com/azurecosmosdb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaXTwitter />
                </span>
                <span>X</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://stackoverflow.com/tags/azure-cosmosdb/info"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaStackOverflow />
                </span>
                <span>Stack Overflow</span>
              </a>
            </div>

            {/* More */}
            <div className={styles.confFooterColumn} data-node-id="6:889">
              <div className={styles.confFooterColumnTitle}>More</div>
              <a
                className={styles.confFooterLink}
                href="https://devblogs.microsoft.com/cosmosdb/"
                target="_blank"
                rel="noopener noreferrer"
                data-node-id="6:931"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaBookOpen />
                </span>
                <span>Blog</span>
              </a>
              <a
                className={styles.confFooterLink}
                href="https://github.com/AzureCosmosDB"
                target="_blank"
                rel="noopener noreferrer"
                data-node-id="6:936"
              >
                <span className={styles.confFooterLinkIcon} aria-hidden="true">
                  <FaGithub />
                </span>
                <span>GitHub</span>
              </a>
            </div>

          </div>
        </div>

        {/* ── AMD partnership ── */}
        <div className={styles.confFooterPartnership} data-node-id="419:111">
          <p className={styles.confFooterPartnershipLabel}>In partnership with</p>
          <img
            className={styles.confFooterPartnershipLogo}
            src={useBaseUrl("/img/conf/amd-logo.svg")}
            alt="AMD"
            loading="lazy"
          />
        </div>

        {/* ── Copyright ── */}
        <div className={styles.confFooterBottom}>
          <p className={styles.confFooterCopyright}>
            Copyright © {currentYear} Azure Cosmos DB · Built with ❤️
          </p>
        </div>

      </div>
    </footer>
  );
}
