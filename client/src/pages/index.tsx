import React from 'react';
import Layout from '@theme/Layout';
import CommunitySection from '@site/src/components/DevHub/CommunitySection';
import DevelopSection from '@site/src/components/DevHub/DevelopSection';
import EventsSection from '@site/src/components/DevHub/EventsSection';
import GrowSection from '@site/src/components/DevHub/GrowSection';
import Hero from '@site/src/components/DevHub/Hero';
import {LanguageProvider} from '@site/src/components/DevHub/LanguageContext';
import LearnSection from '@site/src/components/DevHub/LearnSection';
import SectionNav from '@site/src/components/DevHub/SectionNav';
import ToolsSection from '@site/src/components/DevHub/ToolsSection';
import WatchSection from '@site/src/components/DevHub/WatchSection';
import styles from '@site/src/components/DevHub/devhub.module.css';

// Legacy landing-page stylesheet. Its global rules are shared site-wide, so it stays imported
// until the rest of the site no longer depends on them.
import './index.module.css';

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Azure Cosmos DB Developer Hub"
      description="SDKs, tools, developer guides, community and certification for building applications with Azure Cosmos DB.">
      <LanguageProvider>
        <div className={styles.hub}>
          <Hero />
          <SectionNav />
          <main>
            <DevelopSection />
            <ToolsSection />
            <WatchSection />
            <LearnSection />
            <CommunitySection />
            <GrowSection />
            <EventsSection />
          </main>
        </div>
      </LanguageProvider>
    </Layout>
  );
}
