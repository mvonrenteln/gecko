import NavBar from './NavBar';
import styles from '../styles/layout.module.css';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className={styles.main}>{children}</main>
      <footer className="border-t border-slate-800 bg-slate-900 text-slate-200 p-4 text-center text-sm">
        Gecko Next Shell • SSR + ISR ready
      </footer>
    </div>
  );
}
