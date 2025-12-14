import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/audio', label: 'Audio' },
  { href: '/transcripts/demo-transcript', label: 'Transcripts' },
  { href: '/export', label: 'Export' }
];

export default function NavBar() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Gecko</span>
          <span className="text-xs px-2 py-1 rounded-md bg-emerald-600/20 text-emerald-200 border border-emerald-700">
            Next Shell
          </span>
        </div>
        <nav className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
