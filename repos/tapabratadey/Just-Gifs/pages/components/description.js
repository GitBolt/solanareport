import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import RustSVG from '../components/rust-svg';

export default function Header() {
  return (
    <div>
      <p className={styles.description}>
        Share your favorite GIFs with the metaverse ✨
      </p>
      <div className={styles.grid}>
        <Image height="30" width="30" alt="solana" src="/solana.svg" />
        {/* <p className={styles.logo_text}>Solana</p> */}
        <RustSVG height="50" width="40" alt="rust" />
        {/* <p className={styles.logo_text}>Rust</p> */}
        <Image height="30" width="30" alt="next" src="/nextjs.svg" />
        {/* <p className={styles.logo_text}>NextJs</p> */}
        <Image height="30" width="30" alt="vercel" src="/vercel.svg" />
        {/* <p className={styles.logo_text}>Vercel</p> */}
        <Image height="30" width="30" alt="phantom" src="/phantom.svg" />
        {/* <p className={styles.logo_text}>Phantom</p> */}
        <Image height="30" width="30" alt="anchor" src="/anchor.svg" />
        {/* <p className={styles.logo_text}>Anchor</p> */}
      </div>
    </div>
  );
}
