import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { CoreLayout } from '@/components/CoreLayout';
import { TranscriptList } from '@/components/TranscriptList';
import transcripts from '@/data/transcripts.json';
import { TranscriptRecord } from '@/models/transcript';
import { useGeckoStore } from '@/state/store';

interface HomeProps {
  records: TranscriptRecord[];
}

export default function Home({ records }: HomeProps) {
  const hydrate = useGeckoStore((state) => state.hydrate);
  useEffect(() => {
    hydrate(records);
  }, [hydrate, records]);

  return (
    <CoreLayout>
      <Head>
        <title>Gecko Next App-Shell</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TranscriptList transcripts={records} />
        <section className="gecko-panel p-4 space-y-3">
          <h2 className="text-xl font-semibold">SSR/ISR aktiv</h2>
          <p className="text-slate-300 text-sm">
            Die Startseite wird per Static Generation bereitgestellt und alle 60 Sekunden invalidiert (ISR). Sie kann via Proxy
            parallel zum AngularJS-Frontend laufen und nutzt bereits den neuen State-Store.
          </p>
          <div className="rounded border border-slate-800 p-3 bg-slate-900/60">
            <p className="text-sm text-slate-200">Services getrennt:</p>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>State-Store (Zustand) für UI- und Audio-Status</li>
              <li>Audio-Service entkoppelt das Laden/Play</li>
              <li>Transcript-Service liefert Daten und Export</li>
            </ul>
          </div>
        </section>
      </div>
    </CoreLayout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: { records: transcripts },
    revalidate: 60
  };
};
