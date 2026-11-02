import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';




export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container" style={{ textAlign: "center" }}>
        <iframe
          width="600"
          height="400"
          src="https://www.youtube.com/embed/V90nttn7Des?autoplay=0&loop=1&mute=1;"
          frameBorder={0}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Azure Cosmos DB video"
        />
              
      </div>
    </section>
  );
}
