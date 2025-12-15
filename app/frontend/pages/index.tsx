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
          <h2 className="text-xl font-semibold">SSR/ISR enabled</h2>
          <p className="text-slate-300 text-sm">
            The landing page is statically generated and revalidated every 60 seconds (ISR). It can run alongside the AngularJS
            frontend via a proxy and already uses the new state store.
          </p>
          <div className="rounded border border-slate-800 p-3 bg-slate-900/60">
            <p className="text-sm text-slate-200">Services split up:</p>
            <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
              <li>State store (Zustand) for UI and audio status</li>
              <li>Audio service decouples loading and playback</li>
              <li>Transcript service provides data and export</li>
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
