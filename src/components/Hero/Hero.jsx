import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../services/dummyJsonProducts';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Nueva colección</p>
        <h1 className={styles.title}>Cop´r Drop</h1>
        <p className={styles.subtitle}>
          Streetwear, remeras y sneakers de marcas como Nike, Puma y Off White.
        </p>
        <div className={styles.actions}>
          {NAV_ITEMS.map(({ label, path }) => (
            <Link key={path} to={path} className={styles.categoryBtn}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
