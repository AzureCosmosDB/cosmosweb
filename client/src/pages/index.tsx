import React from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import CommunitySection from '@site/src/components/DevHub/CommunitySection';
import DevelopSection from '@site/src/components/DevHub/DevelopSection';
import EventsSection from '@site/src/components/DevHub/EventsSection';
import Hero from '@site/src/components/DevHub/Hero';
import {LanguageProvider} from '@site/src/components/DevHub/LanguageContext';
import LearnSection from '@site/src/components/DevHub/LearnSection';
import NavSpy from '@site/src/components/DevHub/NavSpy';
import ToolsSection from '@site/src/components/DevHub/ToolsSection';
import styles from '@site/src/components/DevHub/devhub.module.css';

// Legacy landing-page stylesheet. Its global rules are shared site-wide, so it stays imported
// until the rest of the site no longer depends on them.
import './index.module.css';

const TITLE = 'Azure Cosmos DB Developer Hub';
const DESCRIPTION =
  'SDKs, tools, developer guides, community and certification for building applications with Azure Cosmos DB.';

export default function Home(): React.ReactElement {
  // Link-preview image for social networks and chat apps; they need an absolute URL.
  const shareImage = useBaseUrl('/img/social/cosmos-dev-hub.png', {absolute: true});
  const pageUrl = useBaseUrl('/', {absolute: true});

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:alt" content="Azure Cosmos DB Developer Hub" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={shareImage} />
        <meta name="twitter:image:alt" content="Azure Cosmos DB Developer Hub" />
      </Head>      <LanguageProvider>
        <NavSpy />
        <div className={styles.hub}>
          <Hero />
          <main>
            <DevelopSection />
            <LearnSection />
            <ToolsSection />
            <CommunitySection />
            <EventsSection />
          </main>
        </div>
      </LanguageProvider>
    </Layout>
  );
}
