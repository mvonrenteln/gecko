import { useEffect, useMemo, useState } from 'react';
import AudioService from '../src/modules/audio/audioService';
import StateStore from '../src/modules/state/store';

export async function getServerSideProps() {
  return {
    props: {
      source: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3'
    }
  };
}

export default function AudioPage({ source }) {
  const store = useMemo(() => new StateStore(), []);
  const audioService = useMemo(() => new AudioService(store), [store]);
  const [status, setStatus] = useState('idle');
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audioService.onStateChange((nextState) => {
      setStatus(nextState.status);
      setDuration(nextState.duration || 0);
    });
    audioService.load(source);
  }, [audioService, source]);

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold text-white">Audio laden &amp; steuern</h1>
        <p className="text-slate-300 text-sm">Gekapselter Audio-Service mit SSR-Quelle.</p>
      </header>
      <div className="legacy-proxy flex flex-col gap-3">
        <div className="text-sm text-slate-300">Status: {status}</div>
        <div className="text-sm text-slate-300">Dauer: {duration.toFixed(2)}s</div>
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-emerald-600 rounded text-white" onClick={() => audioService.play()}>
            Play
          </button>
          <button className="px-3 py-2 bg-slate-700 rounded text-white" onClick={() => audioService.pause()}>
            Pause
          </button>
        </div>
        <audio data-testid="audio-element" className="w-full" controls src={source} />
      </div>
    </section>
  );
}
