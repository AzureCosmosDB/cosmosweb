/* eslint-disable @docusaurus/no-html-links */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// External Components

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function ContentBlock() {
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
    <div className={`${styles.msf} ${styles["card"]}`}>
      <a href="#" title="This is a headline. It can be two lines max.">
        This is a headline. It can be two lines max
      </a>
      <div className={styles.card__wrapper}>
        <header>
          <figure className={`${styles["aspect-box"]}`}>
            <img
              src={
                isDarkMode
                  ? useBaseUrl("/img/icons/card-icon_dark_40x36.svg")
                  : useBaseUrl("/img/icons/card-icon_40x36.svg")
              }
              onError={({ currentTarget }) => {
                currentTarget.style.display = "none";
              }}
              alt="card icon"
              width="40"
              height="36"
            />
          </figure>
          <h2>This is a headline. It can be two lines max.</h2>
        </header>
        <article>
          <p>
            Lorem ipsum dolor sit amet consectetur. Turpis vulputate gravida ut
            id dictum aliquam aliquam. Amet fermentum vivamus vestibulum
            pellentesque.
          </p>
        </article>
      </div>
    </div>
  );
}
