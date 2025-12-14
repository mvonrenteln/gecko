import Link from 'next/link';

export async function getStaticProps() {
  return {
    props: {
      buildTime: new Date().toISOString()
    },
    revalidate: 60
  };
}

export default function Home({ buildTime }) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Neue Gecko App-Shell</h1>
      <p className="text-slate-300">SSR/ISR aktiviert und bereit für die Migration von AngularJS.</p>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <li className="legacy-proxy">
          <h3 className="font-semibold text-slate-100">Audio laden</h3>
          <p className="text-sm text-slate-300">Die neue Audio-Service-Schicht kapselt Streaming und Steuerung.</p>
          <Link href="/audio" className="text-emerald-300 hover:text-white">Audio-Flow öffnen</Link>
        </li>
        <li className="legacy-proxy">
          <h3 className="font-semibold text-slate-100">Transkripte</h3>
          <p className="text-sm text-slate-300">State-Store + Transcript-Service verwalten Änderungen nachvollziehbar.</p>
          <Link href="/transcripts/demo-transcript" className="text-emerald-300 hover:text-white">Transkript bearbeiten</Link>
        </li>
        <li className="legacy-proxy">
          <h3 className="font-semibold text-slate-100">Export</h3>
          <p className="text-sm text-slate-300">Export-Service liefert Download-Stub für Parallelbetrieb.</p>
          <Link href="/export" className="text-emerald-300 hover:text-white">Export testen</Link>
        </li>
      </ul>
      <div className="mt-8 text-xs text-slate-400">Letzter ISR-Build: {buildTime}</div>
    </div>
  );
}
