import React, {useEffect, useRef, useState} from 'react';
import {Highlight, themes} from 'prism-react-renderer';
import styles from './devhub.module.css';

interface CodeSnippetProps {
  code: string;
  language: string;
  /** Accessible name for the code region, e.g. "Python example". */
  label: string;
}

/** Dark code panel used on the dark hero in both site themes. */
export default function CodeSnippet({code, language, label}: CodeSnippetProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked (insecure context); nothing else to do */
    }
  };

  return (
    <div className={styles.snippet}>
      <button type="button" className={styles.copyButton} onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
        <span className={styles.visuallyHidden}> {label}</span>
      </button>
      <span className={styles.visuallyHidden} role="status" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
      <Highlight theme={themes.dracula} code={code} language={language}>
        {({style, tokens, getLineProps, getTokenProps}) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- scrollable region must be keyboard reachable
          <pre className={styles.snippetPre} style={style} tabIndex={0} aria-label={label}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
