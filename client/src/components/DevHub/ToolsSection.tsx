import React from 'react';
import {toolGroups} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Section from './Section';
import {toolIcons} from './icons';
import styles from './devhub.module.css';

export default function ToolsSection(): React.ReactElement {
  return (
    <Section
      id="tools"
      alt
      title="Tools"
      lead="Everything around the SDK: write and debug in your editor, let AI assistants work with your data, and plan and migrate your workload.">
      {toolGroups.map((group) => (
        <div key={group.id} id={`tools-${group.id}`} className={styles.toolGroup}>
          <h3 className={styles.subTitle}>{group.title}</h3>
          <p className={styles.toolGroupBlurb}>{group.blurb}</p>
          <div className={styles.toolGrid}>
            {group.tools.map((tool) => (
              <article key={tool.id} id={`tool-${tool.id}`} className={styles.toolCard}>
                <div className={styles.toolHead}>
                  <span className={styles.toolIcon}>{toolIcons[tool.icon]}</span>
                  <h4 className={styles.toolName}>{tool.name}</h4>
                  {tool.badge ? <span className={styles.toolBadge}>{tool.badge}</span> : null}
                </div>
                <p>{tool.blurb}</p>
                <div className={styles.toolLinks}>
                  <ExtLink href={tool.href}>
                    Read the docs<span className={styles.visuallyHidden}> for {tool.name}</span>
                  </ExtLink>
                  {tool.secondary ? (
                    <ExtLink href={tool.secondary.href}>
                      {tool.secondary.label}
                      <span className={styles.visuallyHidden}> for {tool.name}</span>
                    </ExtLink>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
