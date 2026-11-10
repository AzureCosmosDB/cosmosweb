import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {posts, type Post} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import styles from './devhub.module.css';

function PostCard({post}: {post: Post}): React.ReactElement {
  const image = useBaseUrl(post.image);
  return (
    <article className={styles.postCard}>
      <img className={styles.postImage} src={image} alt="" width={960} height={540} loading="lazy" />
      <div className={styles.postBody}>
        <time dateTime={post.date} className={styles.postDate}>
          {post.dateLabel} / {post.topic}
        </time>
        <h4>{post.title}</h4>
        <p>{post.blurb}</p>
        <ExtLink href={post.href} className={styles.cardLink}>
          {post.cta}
          <span aria-hidden="true"> ↗</span>
        </ExtLink>
      </div>
    </article>
  );
}

export default function BlogSection(): React.ReactElement {
  return (
    <div id="blog" className={styles.subsection}>
      <h3 className={styles.subTitle}>From the blog</h3>
      <div className={styles.postGrid}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://devblogs.microsoft.com/cosmosdb/">Read the Azure Cosmos DB blog</ExtLink>
      </p>
    </div>
  );
}
