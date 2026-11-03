import React, { useState } from "react";
import styles from "../conf.module.css";
import faqsData from "../faqs.json";

interface FaqSectionProps {
  confYear: string;
}

const FaqSection = ({ confYear }: FaqSectionProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <div id="faq-section" className={styles.sectionAnchor} />
      <div className={styles.faqInner}>
        <div className={styles.faqTitleColumn}>
          <h2 id="faq-heading" className={styles.faqTitle}>
            Frequently asked questions
          </h2>
        </div>

        <div className={styles.faqCards}>
          {faqsData.map((faq, index) => {
            const question = String(faq.question).replace(/\b2025\b|\b2026\b/g, confYear);
            const content = String(faq.content).replace(/\b2025\b|\b2026\b/g, confYear);
            const isOpen = openFAQ === index;

            return (
              <article key={index} className={styles.faqCard}>
                <button
                  type="button"
                  className={styles.faqCardButton}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={styles.faqQuestionText}>{question}</span>
                  <span className={styles.faqChevron} aria-hidden="true">
                    <svg
                      className={
                        isOpen ? styles.faqChevronIconOpen : styles.faqChevronIcon
                      }
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="14" cy="14" r="13" fill="#0078D4" />
                      <path
                        d="M9.5 12.5L14 17L18.5 12.5"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <div
                      className={styles.faqAnswerCopy}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
