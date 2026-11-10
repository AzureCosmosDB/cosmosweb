import React from 'react';
import Layout from '@theme/Layout';
import ClosingBand from '@site/src/components/DevHub/ClosingBand';
import CommunitySection from '@site/src/components/DevHub/CommunitySection';
import DevelopSection from '@site/src/components/DevHub/DevelopSection';
import EventsSection from '@site/src/components/DevHub/EventsSection';
import Hero from '@site/src/components/DevHub/Hero';
import {LanguageProvider} from '@site/src/components/DevHub/LanguageContext';
import LearnSection from '@site/src/components/DevHub/LearnSection';
import NavSpy from '@site/src/components/DevHub/NavSpy';
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
        <NavSpy />
        <div className={styles.hub}>
          <Hero />
          <main>
            <DevelopSection />
            <ToolsSection />
            <WatchSection />
            <LearnSection />
            <CommunitySection />
            <EventsSection />
          </main>
          <ClosingBand />
        </div>
      </LanguageProvider>
    </Layout>
  );
}
