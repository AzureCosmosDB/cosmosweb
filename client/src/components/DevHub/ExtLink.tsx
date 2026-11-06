import React from 'react';
import styles from './devhub.module.css';

interface ExtLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
}

/**
 * Microsoft Learn pages open in the same tab (they are the docs). Everything else opens in a new
 * tab and says so for screen readers.
 */
export default function ExtLink({href, children, className, ...rest}: ExtLinkProps): React.ReactElement {
  const sameTab = href.startsWith('https://learn.microsoft.com');
  if (sameTab) {
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
