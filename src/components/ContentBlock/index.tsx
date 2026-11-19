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
    <section
      className={`${styles.section} ${styles["section--content-block"]}`}
    >
      <div className={`${styles.msf} ${styles["content-block"]}`}>
        <div className={styles.container}>
          <div className={styles["content-block__wrapper"]}>
            <article className={styles["l-title"]}>
              <h2>This is a headline. It should be a max of two lines.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Turpis vulputate gravida
                ut id dictum aliquam aliquam. Amet fermentum vivamus vestibulum
                pellentesque. Nec ultricies in fusce pulvinar integer diam
                tincidunt massa tincidunt.
              </p>
              <a className={styles["l-btn"]} href="#" title="Optional button">
                Optional button
              </a>
            </article>
            <figure className={styles["aspect-box"]}>
              <img
                src={
                  isDarkMode
                    ? useBaseUrl("/img/placeholder_dark.png")
                    : useBaseUrl("/img/placeholder.png")
                }
                onError={({ currentTarget }) => {
                  currentTarget.style.display = "none";
                }}
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
      </div>

      {/* content block inverse */}
      <div
        className={`${styles.msf} ${styles["content-block"]} ${styles["content-block--inverse"]}`}
      >
        <div className={styles.container}>
          <div className={styles["content-block__wrapper"]}>
            <article className={styles["l-title"]}>
              <h2>This is a headline. It should be a max of two lines.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Turpis vulputate gravida
                ut id dictum aliquam aliquam. Amet fermentum vivamus vestibulum
                pellentesque. Nec ultricies in fusce pulvinar integer diam
                tincidunt massa tincidunt.
              </p>
              <a className={styles["l-btn"]} href="#" title="Optional button">
                Optional button
              </a>
            </article>
            <figure className={styles["aspect-box"]}>
              <img
                src={
                  isDarkMode
                    ? useBaseUrl("/img/placeholder_dark.png")
                    : useBaseUrl("/img/placeholder.png")
                }
                onError={({ currentTarget }) => {
                  currentTarget.style.display = "none";
                }}
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
