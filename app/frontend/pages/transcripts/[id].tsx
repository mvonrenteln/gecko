import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { CoreLayout } from '@/components/CoreLayout';
import { AudioPanel } from '@/components/AudioPanel';
import { TranscriptEditor } from '@/components/TranscriptEditor';
import { TranscriptRecord } from '@/models/transcript';
import { listTranscripts } from '@/services/transcriptService';
import { useGeckoStore } from '@/state/store';

interface TranscriptPageProps {
  transcript: TranscriptRecord;
}

export default function TranscriptPage({ transcript }: TranscriptPageProps) {
  const hydrate = useGeckoStore((state) => state.hydrate);
  const selectTranscript = useGeckoStore((state) => state.selectTranscript);
  useEffect(() => {
    hydrate([transcript]);
    selectTranscript(transcript.id);
  }, [hydrate, selectTranscript, transcript]);

  return (
    <CoreLayout>
      <Head>
        <title>Transkript {transcript.title}</title>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AudioPanel src={transcript.audioUrl} />
        <TranscriptEditor transcript={transcript} />
      </div>
    </CoreLayout>
  );
}

export const getServerSideProps: GetServerSideProps<TranscriptPageProps> = async (context) => {
  const transcript = listTranscripts().find((entry) => entry.id === context.params?.id);
  if (!transcript) {
    return { notFound: true };
  }
  return { props: { transcript } };
};
