/* eslint-disable @docusaurus/no-html-links */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// External Components

import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./block.module.css";
import ContentBlock from "../../components/ContentBlock";
import ContentBlockInverse from "../../components/ContentBlockInverse";
import CardList from "../../components/CardList";

export default function Block() {
  const { siteConfig } = useDocusaurusContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(theme === "dark");
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(newTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout
      title="Azure Cosmos Block Comopnenet Page"
      description="Azure Cosmos Block Comopnenet Page"
    >
      <main className={styles.mainBlockContainer}>
        <ContentBlock></ContentBlock>
        {/* <ContentBlockInverse></ContentBlockInverse> */}
        <CardList></CardList>
      </main>
    </Layout>
  );
}
