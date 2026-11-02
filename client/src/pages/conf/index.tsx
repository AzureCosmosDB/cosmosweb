import React from "react";
import Layout from "@theme/Layout";
import styles from "./conf.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import resourcesData from "./resources.json";
import { Helmet } from "react-helmet";
import { getConfSettings } from "../../conf/confSettings";
import ConfFooter from "./ConfFooter";
import StreamSection from "./sections/StreamSection";
import AgendaSection from "./sections/AgendaSection";
import NewsSection from "./sections/NewsSection";
import FaqSection from "./sections/FaqSection";
import SpeakersSection from "./sections/SpeakersSection";
import { useStreamReleased } from "../../conf/videoRelease";

const CONF_YEAR = "2026";
const CONF_DATE_DISPLAY = "April 28 - 9:00 AM - 2:00 PM PDT";
const CONF_DATE_LONG = "April 28, 2026";
const CFP_URL = "https://aka.ms/CosmosConfCFP-site";

interface Resource {
  title: string;
  url: string;
  description: string;
}

interface ResourceSection {
  title: string;
  description?: string;
  items: Resource[];
}

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

const cfpSections: CfpSection[] = [
  {
    title: "Submit a proposal",
    description:
      "Submit your session idea on the official CFP site. Deadlines, requirements, and status updates are maintained there.",
    items: [
      {
        title: "Open the CFP submission site",
        url: CFP_URL,
        description: "Use this link to submit, edit, or track your proposal.",
      },
    ],
  },
  {
    title: "What we’re looking for",
    description:
      "Practical, high-signal talks that help builders ship with Azure Cosmos DB and the DocumentDB ecosystem.",
    items: [
      {
        title: "Real-world lessons learned",
        description: "Architecture tradeoffs, reliability, cost optimization, and performance debugging.",
      },
      {
        title: "Demos and hands-on walkthroughs",
        description: "Show a pattern end-to-end: data modeling, partitioning, query design, and operations.",
      },
      {
        title: "Ecosystem and integrations",
        description: "Tooling, SDKs, data pipelines, observability, and app patterns.",
      },
    ],
  },
  {
    title: "Suggested topic areas",
    items: [
      {
        title: "Data modeling and partitioning",
        description: "Designing for scale, hot partition avoidance, hierarchical partition keys, and access patterns.",
      },
      {
        title: "Performance and cost",
        description: "RU optimization, indexing strategies, query tuning, and troubleshooting latency.",
      },
      {
        title: "Reliability and global scale",
        description: "Multi-region strategies, change feed patterns, backup/restore, and incident readiness.",
      },
      {
        title: "AI app patterns",
        description: "Chat history, contextual memory, RAG patterns, and (where relevant) vector search usage.",
      },
    ],
  },
  {
    title: "Before you submit",
    items: [
      {
        title: "Keep it audience-first",
        description:
          "Be explicit about what attendees will learn, who it’s for, and what they can apply immediately.",
      },
      {
        title: "Share the real-world story",
        description:
          "We love honest lessons learned and the tradeoffs that shaped your architecture decisions.",
      },
      {
        title: "Stay practical",
        description:
          "Hands-on demos and specific guidance resonate most with builders attending the event.",
      },
    ],
  },
];

const archiveTimelineData = [
  {
    year: "2025",
    text: "Azure Cosmos DB Conf 2025",
    playlistUrl: "https://www.youtube.com/playlist?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLQhnFsKWhtKu_Tp0uXPFdn",
  },
  {
    year: "2024",
    text: "Azure Cosmos DB Conf 2024",
    playlistUrl: "https://www.youtube.com/playlist?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHgQxPGa9JJdbbUpmkuIshh4",
  },
  {
    year: "2023",
    text: "Azure Cosmos DB Conf 2023",
    playlistUrl: "https://www.youtube.com/playlist?list=PLlrxD0HtieHj3SsXKrnikSKeHQ7PCfa3u",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLlrxD0HtieHj3SsXKrnikSKeHQ7PCfa3u",
  },
  {
    year: "2022",
    text: "Azure Cosmos DB Conf 2022",
    playlistUrl: "https://www.youtube.com/playlist?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLa2ELTHUhoSMx89w329bOD",
  },
  {
    year: "2021",
    text: "Azure Cosmos DB Conf 2021",
    playlistUrl: "https://www.youtube.com/playlist?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLmamF3YkHLoLN_24E41jSPVilv5B3GTBg",
  },
];

const ConfPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const { showAgenda, showStream, streamEmbedUrl } = getConfSettings(siteConfig);
  const streamLive = useStreamReleased();

  return (
    <Layout
      title={`Azure Cosmos DB Conf ${CONF_YEAR}`}
      description="Join us for the biggest Azure Cosmos DB event of the year!"
      noFooter
    >
      <Helmet>
        {/* Open Graph Meta Tags for LinkedIn and Facebook */}
        <meta property="og:title" content={`Azure Cosmos DB Conf ${CONF_YEAR}`} />
        <meta
          property="og:description"
          content="Join us for the biggest Azure Cosmos DB event of the year!"
        />
        <meta
          property="og:url"
          content="https://developer.azurecosmosdb.com/conf"
        />
        <meta
          property="og:image"
          content="https://developer.azurecosmosdb.com/img/conf/AzureCosmosDBConf2026_Hero_Landscape.png"
        />
        <meta property="og:image:alt" content="Azure Cosmos DB Conf 2026" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter-specific Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azure Cosmos DB Conf 2026" />
        <meta
          name="twitter:description"
          content="Join us for the biggest Azure Cosmos DB event of the year!"
        />
        <meta
          name="twitter:image"
          content="https://developer.azurecosmosdb.com/img/conf/AzureCosmosDBConf2026_Hero_Landscape.png"
        />
      </Helmet>

      <div className={styles.pageWrapper}>
        {/* ====== HERO (Figma node 3:40) ====== */}
        <header className={styles.hero} data-node-id="3:40">
          <div className={styles.heroBgWrap} aria-hidden="true">
            <picture className={styles.heroPicture}>
              <source media="(max-width: 600px)" srcSet={useBaseUrl("/img/conf/hero_container_mobile.png")} />
              <img src={useBaseUrl("/img/conf/hero_container.png")} alt="" className={styles.heroBgImg} />
            </picture>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroLockup} data-node-id="419:101">
              <picture className={styles.heroPicture}>
                <source media="(max-width: 600px)" srcSet={useBaseUrl("/img/conf/hero_lockup_mobile.svg")} />
                <img
                  src={useBaseUrl("/img/conf/hero_msft_amd_lockup.svg")}
                  alt="Microsoft and AMD"
                  className={styles.heroLockupImg}
                  width={361}
                  height={66}
                  loading="lazy"
                />
              </picture>
            </div>
            <div className={styles.heroMain} data-node-id="419:102">
              <div className={styles.heroLogoGrid} data-node-id="6:814">
                <img
                  src={useBaseUrl("/img/conf/hero_logo_mark.svg")}
                  alt=""
                  aria-hidden="true"
                  className={styles.heroLogoMarkImg}
                  width={106}
                  height={106}
                />
                <img
                  src={useBaseUrl("/img/conf/hero_wordmark.svg")}
                  alt={`Azure Cosmos DB Conf ${CONF_YEAR}`}
                  className={styles.heroWordmarkImg}
                  width={287}
                  height={77}
                />
              </div>
              <p className={styles.heroDate}>{CONF_DATE_DISPLAY}</p>
            </div>
          </div>
        </header>

        {showStream && (
          <StreamSection
            confYear={CONF_YEAR}
            streamEmbedUrl={streamEmbedUrl}
            live={streamLive}
          />
        )}

        <section className={styles.introSection} aria-labelledby="conf-intro">
          <div id="about" className={styles.sectionAnchor} />
          <div className={styles.introInner}>
            <div className={styles.introCard}>
              <h2 id="conf-intro" className={styles.introTitle}>
                What is Azure Cosmos DB Conf?
              </h2>
              <p className={styles.introCopy}>
                Join us for our 6th annual Azure Cosmos DB Conf — a free virtual developer event
                co-hosted by Microsoft and the Azure Cosmos DB community, featuring expert-led sessions,
                demos, and real-world guidance on building globally distributed apps.
              </p>
              <p className={styles.introCopy}>
                Explore the full document database family — <strong>Azure Cosmos DB</strong>,{" "}
                <strong>Azure DocumentDB</strong>, and{" "}
                <a href="https://github.com/microsoft/documentdb" target="_blank" rel="noopener noreferrer">
                  open-source DocumentDB
                </a>
                , hosted by the <strong>Linux Foundation</strong>. Learn why it&apos;s the leading database
                platform for the era of AI and modern app development through a dynamic mix of sessions
                from Microsoft and community experts.
              </p>
              <p className={styles.introCopySecondary}>
                Our 5-hour live show streamed on <strong>{CONF_DATE_LONG}</strong>. Every session
                — keynote, breakouts, and community talks — is now available on demand.
              </p>
            </div>
          </div>
        </section>

        {/* ====== CLOUD SKILLS CHALLENGE SECTION ====== */}
        <section className={styles.introSection} aria-labelledby="cloud-skills-heading">
          <div id="cloud-skills" className={styles.sectionAnchor} />
          <div className={styles.introInner}>
            <div className={styles.introCard}>
              <h2 id="cloud-skills-heading" className={styles.introTitle}>
                🏆 Cloud Skills Challenge
              </h2>
              <p className={styles.cloudSkillsSubtitle}>
                Join the Cosmos DB Conf Skills Challenge
              </p>
              <p className={styles.introCopy}>
                Build the skills to design, develop, and optimize globally distributed applications
                with Azure Cosmos DB. Complete all modules in the{" "}
                <strong>Cosmos DB Conf Skills Challenge {CONF_YEAR}</strong> to prepare for the{" "}
                <strong>Microsoft Certified: Azure Cosmos DB Developer Specialty (DP-420)</strong>{" "}
                exam.
              </p>
              <p className={styles.introCopy}>
                Eligible participants who complete the challenge may receive access to a discounted
                exam voucher, while supplies last. Complete the challenge by{" "}
                <strong>May 8, 2026</strong>.
              </p>

              <ul className={styles.cloudSkillsPillars}>
                <li className={styles.cloudSkillsPillar}>
                  <span className={styles.cloudSkillsPillarIcon} aria-hidden="true">🏁</span>
                  <div>
                    <h3 className={styles.cloudSkillsPillarTitle}>Compete</h3>
                    <p className={styles.cloudSkillsPillarCopy}>
                      Benchmark your progress against peers and track your standing on the
                      leaderboard.
                    </p>
                  </div>
                </li>
                <li className={styles.cloudSkillsPillar}>
                  <span className={styles.cloudSkillsPillarIcon} aria-hidden="true">📘</span>
                  <div>
                    <h3 className={styles.cloudSkillsPillarTitle}>Learn</h3>
                    <p className={styles.cloudSkillsPillarCopy}>
                      Build your understanding with guided modules covering modern application and
                      AI patterns.
                    </p>
                  </div>
                </li>
                <li className={styles.cloudSkillsPillar}>
                  <span className={styles.cloudSkillsPillarIcon} aria-hidden="true">🚀</span>
                  <div>
                    <h3 className={styles.cloudSkillsPillarTitle}>Develop skills</h3>
                    <p className={styles.cloudSkillsPillarCopy}>
                      Gain practical, job-ready experience you can apply immediately.
                    </p>
                  </div>
                </li>
              </ul>

              <p className={styles.introCopySecondary}>
                Check the Cloud Skills Challenge page for leaderboard details and full requirements.
                Free to join and self-paced — complete modules on your own schedule before, during,
                or after the conference.
              </p>
              <div className={styles.introActions}>
                <a
                  className={styles.introPrimaryButton}
                  href="https://aka.ms/CosmosDBConfChallenge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🏆 Join the Cloud Skills Challenge
                </a>
              </div>
            </div>
          </div>
        </section>

        <NewsSection confYear={CONF_YEAR} />

        {showAgenda && <AgendaSection confYear={CONF_YEAR} />}

        <SpeakersSection confYear={CONF_YEAR} />

        {/* ====== RESOURCES SECTION ====== */}
        <section className={styles.resourcesSection} aria-labelledby="resources-heading">
          <div id="resources" className={styles.sectionAnchor} />
          <div className={styles.resourcesContainer}>
            <h2 id="resources-heading" className={styles.resourcesTitle}>
              <img
                src="/img/planet-1.png"
                alt=""
                aria-hidden="true"
                className={styles.resourcesIcon}
              />
              Resources
            </h2>

            <div className={styles.resourcesCard}>
              <p className={styles.resourcesSummary}>
                A curated set of links for Azure Cosmos DB, Azure DocumentDB, and the open-source DocumentDB project.
              </p>
              {(() => {
                const sections = resourcesData as ResourceSection[];
                const [cosmosSection, documentSection, ossSection] = sections;

                return (
                  <>
                    <div className={styles.resourcesGrid}>
                      {[cosmosSection, documentSection]
                        .filter(Boolean)
                        .map((section) => (
                          <section key={section.title} className={styles.resourcesSectionBlock}>
                            <h3 className={styles.resourcesSectionTitle}>{section.title}</h3>
                            {section.description ? (
                              <p className={styles.resourcesSectionDescription}>{section.description}</p>
                            ) : null}
                            <ul className={styles.resourcesSimpleList}>
                              {section.items.map((res: Resource) => (
                                <li key={res.url} className={styles.resourcesListItem}>
                                  <div className={styles.resourcesLinkRow}>
                                    <img
                                      src="/img/planet-1.png"
                                      alt=""
                                      aria-hidden="true"
                                      className={styles.resourcesBulletIcon}
                                      loading="lazy"
                                    />
                                    <a
                                      href={res.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={styles.resourcesLink}
                                    >
                                      {res.title}
                                    </a>
                                  </div>
                                  <p className={styles.resourcesDescription}>{res.description}</p>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                    </div>

                    {ossSection ? (
                      <section className={styles.resourcesSectionBlock}>
                        <h3 className={styles.resourcesSectionTitle}>{ossSection.title}</h3>
                        {ossSection.description ? (
                          <p className={styles.resourcesSectionDescription}>{ossSection.description}</p>
                        ) : null}
                        <ul className={styles.resourcesSimpleList}>
                          {ossSection.items.map((res: Resource) => (
                            <li key={res.url} className={styles.resourcesListItem}>
                              <div className={styles.resourcesLinkRow}>
                                <img
                                  src="/img/planet-1.png"
                                  alt=""
                                  aria-hidden="true"
                                  className={styles.resourcesBulletIcon}
                                  loading="lazy"
                                />
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.resourcesLink}
                                >
                                  {res.title}
                                </a>
                              </div>
                              <p className={styles.resourcesDescription}>{res.description}</p>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ) : null}
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ====== ARCHIVE SECTION ====== */}
        <section className={styles.archiveSection} aria-labelledby="archive-heading">
          <div id="archive" className={styles.sectionAnchor} />
          <div className={styles.archiveContainer}>
            <h2 id="archive-heading" className={styles.archiveTitle}>
              <img
                src="/img/planet-1.png"
                alt=""
                aria-hidden="true"
                className={styles.archiveIcon}
              />
              Azure Cosmos DB Conf Archive
            </h2>

            <div className={styles.archiveCard}>
              <p className={styles.archiveSubheader}>
                This archive collects past Azure Cosmos DB Conf events. Click the links below to open the full
                playlist, including all on-demand sessions, and watch the live show recordings.
              </p>
              <div className={styles.archiveTimeline}>
                {archiveTimelineData.map((item, index) => (
                  <div key={index} className={styles.archiveTimelineItem}>
                    <a
                      className={styles.archiveTimelineYear}
                      href={item.playlistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.year}
                    </a>
                    <div className={styles.archiveTimelineContent}>
                      <a
                        className={styles.archiveTimelineTextLink}
                        href={item.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.text}
                      </a>
                      <iframe
                        className={styles.archiveTimelineVideo}
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
        </section>

        <FaqSection confYear={CONF_YEAR} />

        {/* ====== CONF FOOTER (Figma frame 1:2) ====== */}
        <div id="socials" className={styles.sectionAnchor} />
        <ConfFooter confYear={CONF_YEAR} />
      </div>
    </Layout>
  );
};

export default ConfPage;
