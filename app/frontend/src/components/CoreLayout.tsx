import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../../styles/CoreLayout.module.css';

interface CoreLayoutProps {
  children: ReactNode;
}

export function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <div className={`${styles.shell}`}>
      <header className={`${styles.navbar} gecko-panel`}>
        <span className={styles.logo}>Gecko Next</span>
        <nav className={styles.navItems} aria-label="Primary navigation">
          <Link href="/">Dashboard</Link>
          <Link href="/transcripts/alpha">Transkripte</Link>
          <span className={styles.badge}>SSR · ISR ready</span>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <span>App-Shell als Nachfolger der AngularJS-Ansicht.</span>
        <span>Parallelbetrieb via Legacy-Styles und API-Proxy.</span>
      </footer>
    </div>
  );
}
