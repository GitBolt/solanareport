import Image from 'next/image';
import styles from '../../styles/Home.module.css';

// Constants
const HANDLE = 'tapabratadey';
const TWITTER_LINK = `https://twitter.com/${HANDLE}`;
const GITHUB_LINK = `https://github.com/${HANDLE}`;

export default function Header() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerText}
        >
          {`built by @${HANDLE}`}
        </a>
        <a
          href={TWITTER_LINK}
          target="_blank"
          alt="Twitter Logo"
          rel="noreferrer"
          style={{ paddingRight: 10 }}
        >
          <Image height="20" width="20" alt="next" src="/twitter.svg" />
        </a>
        <a
          href={GITHUB_LINK}
          target="_blank"
          alt="Github Logo"
          rel="noreferrer"
        >
          <Image height="20" width="20" alt="next" src="/github.svg" />
        </a>
      </div>
    </footer>
  );
}
