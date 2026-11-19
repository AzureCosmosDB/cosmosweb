import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import ExtLink from './ExtLink';
import {footerIcon, heartIcon} from './icons';
import styles from './devhub.module.css';

// The site config writes some footer labels with a leading emoji; the hub footer uses real icons instead.
const stripEmoji = (text: string): string => text.replace(/^[\p{Extended_Pictographic}\uFE0F\s]+/u, '').trim();

interface FooterItem {
  label?: string;
  href?: string;
  to?: string;
}

interface FooterGroup {
  title?: string | null;
  items?: FooterItem[];
}

/**
 * Footer for the developer hub home page only. It reads the same links and copyright as the site footer
 * (themeConfig.footer), so they stay in one place, and every other page keeps the standard footer.
 */
export default function HubFooter(): React.ReactElement | null {
  const footer = useThemeConfig().footer;
  if (!footer) return null;

  const groups = (footer.links as FooterGroup[]).filter((group) => group.items?.length);
  const copyright = (footer.copyright ?? '').replace(/&nbsp;/g, ' ');
  const builtWith = /built with/i.test(copyright);
  const copyrightText = copyright.split(/\s+-\s+Built with/i)[0].trim();

  return (
    <footer className={styles.hubFooter}>
      <div className={styles.footerInner}>
        <nav className={styles.footerGrid} aria-label="Footer">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className={styles.footerTitle}>{group.title}</h2>
              <ul className={styles.footerList}>
                {(group.items ?? []).map((item) => {
                  const label = stripEmoji(item.label ?? '');
                  const href = item.href ?? item.to ?? '#';
                  return (
                    <li key={href}>
                      <ExtLink href={href} className={styles.footerLink}>
                        <span className={styles.footerIcon}>{footerIcon(label)}</span>
                        <span>{label}</span>
                      </ExtLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <p className={styles.footerCopy}>
          <span>{copyrightText}</span>
          {builtWith ? (
            <span className={styles.footerBuilt}>
              Built with <span className={styles.footerHeart}>{heartIcon}</span>
              <span className={styles.visuallyHidden}>love</span>
            </span>
          ) : null}
        </p>
      </div>
    </footer>
  );
}
