import React from 'react';
import styles from "./styles.module.css";
import Link from '@docusaurus/Link';
// Import Image
import Image from '@theme/IdealImage';

function RowCardItem({ img, title, description,time, link }) {
  return (
    <div className="row margin-vert--lg shadow--md">
      <div className="col col--2">
        
          <div className="text--center">
            <Image className={styles.colImg} img={img} />  
          </div>
         
      </div>
      <div className="col margin-vert--xs">
        <div className={styles.colText}>
          <h3>{title}</h3>
          <h5>{time}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ListRowCard({ itemList }) {
  return (
    <section className={styles.features}>
      <div className="container">
        {itemList.map((props, idx) => (
          <RowCardItem key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
