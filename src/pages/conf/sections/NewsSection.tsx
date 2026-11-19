import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "../conf.module.css";
import newsData from "../news.json";

interface NewsSectionProps {
  confYear: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const NewsSection = ({ confYear }: NewsSectionProps) => {
  const [showAllNews, setShowAllNews] = useState(false);
  // The top two news items are open by default.
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // If the URL hash targets a specific news item, expand it, reveal all, and scroll to it.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const openFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;

      const targetIndex = newsData.findIndex((item, index) => {
        const slug = slugify(item.title);
        return hash === `news-${index}` || hash === `news-${slug}`;
      });

      if (targetIndex < 0) return;

      setExpanded((prev) => ({ ...prev, [targetIndex]: true }));
      if (targetIndex >= 3) setShowAllNews(true);

      // Wait for expansion + render, then scroll.
      window.setTimeout(() => {
        const el = document.getElementById(`news-item-${targetIndex}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section className={styles.newsSection} aria-labelledby="news-heading">
      <div id="news" className={styles.sectionAnchor} />
      <div className={styles.newsInner}>
        <div className={styles.newsTitleColumn}>
          <img
            className={`${styles.sectionIconImage} ${styles.newsIconImage}`}
            src={useBaseUrl("/img/icons/icon_news.png")}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
          <h2 id="news-heading" className={styles.newsTitle}>
            Latest news
          </h2>
          <p className={styles.newsDescription}>
            Stay up to date with the latest announcements and updates for Azure Cosmos DB Conf {confYear}.
          </p>
        </div>

        <div className={styles.newsCardsColumn}>
          <div className={styles.newsCards}>
            {newsData
              .slice(0, showAllNews ? newsData.length : 3)
              .map((newsItem, index) => {
                const isOpen = !!expanded[index];
                const slug = slugify(newsItem.title);
                const itemId = `news-item-${index}`;
                const slugAnchorId = `news-${slug}`;
                const panelId = `news-panel-${index}`;
                const buttonId = `news-button-${index}`;
                const shareHash = `#${slugAnchorId}`;
                const shareUrl =
                  typeof window !== "undefined"
                    ? `${window.location.origin}${window.location.pathname}${shareHash}`
                    : shareHash;
                const shareText = `${newsItem.title} — Azure Cosmos DB Conf ${confYear}`;
                const encodedUrl = encodeURIComponent(shareUrl);
                const encodedText = encodeURIComponent(shareText);
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
                  `${shareText}\n\n${shareUrl}`
                )}`;
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                const mailUrl = `mailto:?subject=${encodedText}&body=${encodedUrl}`;
                const copyLink = (e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (typeof window === "undefined" || !navigator.clipboard) return;
                  navigator.clipboard.writeText(shareUrl).catch(() => {});
                };
                return (
                  <article key={index} id={itemId} className={styles.newsCard}>
                    {/* Slug-based anchor so hash links like #news-<slug> land here. */}
                    <span id={slugAnchorId} className={styles.sectionAnchor} aria-hidden="true" />
                    <button
                      type="button"
                      id={buttonId}
                      className={styles.newsCardToggle}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
                    >
                      <span className={styles.newsCardToggleText}>
                        <span className={styles.newsCardTitle}>{newsItem.title}</span>
                        <span className={styles.newsDate}>{newsItem.date}</span>
                      </span>
                      <span className={styles.newsCardToggleIcon} aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={styles.newsCardCopy}
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                      />
                    )}
                    {isOpen && (
                      <div className={styles.newsCardShareRow} aria-label="Share this post">
                        <span className={styles.newsCardShareLabel}>Share:</span>
                        <a
                          className={styles.newsCardShareButton}
                          href={twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on X (Twitter)"
                          aria-label="Share on X"
                        >
                          𝕏
                        </a>
                        <a
                          className={styles.newsCardShareButton}
                          href={linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on LinkedIn"
                          aria-label="Share on LinkedIn"
                        >
                          in
                        </a>
                        <a
                          className={styles.newsCardShareButton}
                          href={facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Facebook"
                          aria-label="Share on Facebook"
                        >
                          f
                        </a>
                        <a
                          className={styles.newsCardShareButton}
                          href={mailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share by email"
                          aria-label="Share by email"
                        >
                          ✉
                        </a>
                        <button
                          type="button"
                          className={styles.newsCardShareButton}
                          onClick={copyLink}
                          title="Copy link to this news item"
                          aria-label="Copy link"
                        >
                          🔗
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
          </div>

          {newsData.length > 3 && (
            <div className={styles.newsActions}>
              <button
                type="button"
                onClick={() => setShowAllNews(!showAllNews)}
                className={styles.newsMoreButton}
              >
                {showAllNews ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
