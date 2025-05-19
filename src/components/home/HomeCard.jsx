import React from 'react';
import styles from './HomeCard.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api';

const HomeCard = ({ product }) => {
  return (
    <div className={`col-md-3 ${styles.col}`}>
      <div className={styles.card}>
        <div className={styles.cardImgWrapper}>
          {/* Le lien englobe seulement l'image */}
          <Link to={`/products/${product.slug}`}>
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              className={styles.cardImgTop}
            />
          </Link>

          {/* Tooltip au survol */}
          <div className={styles.tooltip}>
            <div className={styles.tooltipHeader}>
              <img
                src={`${BASE_URL}${product.image}`}
                alt="avatar"
                className={styles.tooltipAvatar}
              />
              <div>
                <div className={styles.tooltipName}>{product.name}</div>
                <div className={styles.tooltipTime}>1 min. ago</div>
              </div>
            </div>
            <div className={styles.tooltipMessage}>
              {product.comments || 'Aucune description.'}
            </div>
            <div className={styles.tooltipArrow}></div>
          </div>
        </div>

        {/* Le titre et le prix sont aussi cliquables */}
        <div className={styles.cardBody}>
          <Link to={`/products/${product.slug}`} className={styles.link}>
            <h5 className={`${styles.cardTitle} mb-1`}>{product.name}</h5>
            <h6 className={styles.cardText}>{`${product.price} FCFA`}</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
