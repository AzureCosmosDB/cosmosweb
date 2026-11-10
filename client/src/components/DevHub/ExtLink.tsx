import React from 'react';
import styles from './devhub.module.css';

interface ExtLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
}

/**
 * Every external link opens in a new tab and says so for screen readers. In-page and relative
 * links stay in the same tab.
 */
export default function ExtLink({href, children, className, ...rest}: ExtLinkProps): React.ReactElement {
  const external = /^https?:\/\//i.test(href);
  if (!external) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className={styles.visuallyHidden}> (opens in new tab)</span>
    </a>
  );
}
