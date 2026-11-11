import React, {useMemo, type ReactNode} from 'react';
import {Context} from '@docusaurus/core/lib/client/docusaurusContext';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * The developer hub has its own navbar (`themeConfig.navbar`); the Azure Cosmos DB Conf pages keep the
 * original one, stored in `customFields.confNavbar`. Every navbar component reads the navbar from the
 * theme config, so swapping it here switches the bar, the mobile menu and the brand together.
 */
export default function Root({children}: {children: ReactNode}): React.ReactElement {
  const docusaurus = useDocusaurusContext();
  const {pathname} = useLocation();
  const {siteConfig} = docusaurus;
  const path = pathname.startsWith(siteConfig.baseUrl) ? `/${pathname.slice(siteConfig.baseUrl.length)}` : pathname;
  const isConf = path === '/conf' || path.startsWith('/conf/');
  const confNavbar = siteConfig.customFields?.confNavbar;

  const value = useMemo(() => {
    if (!isConf || !confNavbar) return docusaurus;
    return {
      ...docusaurus,
      siteConfig: {
        ...siteConfig,
        themeConfig: {...siteConfig.themeConfig, navbar: confNavbar},
      },
    };
  }, [docusaurus, siteConfig, isConf, confNavbar]);

  return (
    <Context.Provider value={value}>
      {/* `display: contents` keeps this wrapper out of the page layout; it only scopes the hub navbar styles. */}
      <div className={isConf ? undefined : 'hub-nav'} style={{display: 'contents'}}>
        {children}
      </div>
    </Context.Provider>
  );
}
