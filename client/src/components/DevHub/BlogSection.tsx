import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {usePluginData} from '@docusaurus/useGlobalData';
import {posts as curatedPosts, type Post} from '@site/src/data/devhub';
import ExtLink from './ExtLink';
import Carousel from './Carousel';
import styles from './devhub.module.css';

function PostCard({post}: {post: Post}): React.ReactElement {
  const image = useBaseUrl(post.image ?? '/img/hub/post-placeholder.svg');
  return (
    <article className={styles.postCard}>
      <img className={styles.postImage} src={image} alt="" width={960} height={540} loading="lazy" />
      <div className={styles.postBody}>
        <time dateTime={post.date} className={styles.postDate}>
          {post.topic ? `${post.dateLabel} / ${post.topic}` : post.dateLabel}
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
  // Latest posts from the dev blog feed (read at build time); the curated posts if it could not be read.
  const feed = (usePluginData('devblog-feed') as {posts?: Post[]} | undefined)?.posts ?? [];
  const posts = feed.length > 0 ? feed : curatedPosts;

  return (
    <div id="blog" className={styles.subsection}>
      <h3 className={styles.subTitle}>From the blog</h3>
      <Carousel noun="blog posts" perView={3}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Carousel>

      <p className={styles.sectionFoot}>
        <ExtLink href="https://devblogs.microsoft.com/cosmosdb/">Read the Azure Cosmos DB blog</ExtLink>
      </p>
    </div>
  );
}
