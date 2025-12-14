import { useEffect, useMemo, useRef } from 'react';
import { createAudioService } from '@/services/audioService';
import { useGeckoStore } from '@/state/store';

interface AudioPanelProps {
  src: string;
}

export function AudioPanel({ src }: AudioPanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audio } = useGeckoStore();
  const audioService = useMemo(() => createAudioService(), []);

  useEffect(() => {
    const node = audioRef.current;
    if (node) {
      void audioService.load(src, node);
    }
  }, [audioService, src]);

  return (
    <div className="gecko-panel p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">Audioquelle</p>
          <p className="font-semibold">{src}</p>
        </div>
        <span className="px-3 py-1 rounded-full border border-emerald-400 text-emerald-200 text-xs">
          {audio.isLoaded ? 'geladen' : 'lädt...'}
        </span>
      </div>
      <audio ref={audioRef} controls className="w-full bg-black/20 rounded" data-testid="audio-element" />
      <div className="flex gap-2">
        <button
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 transition"
          onClick={() => audioService.toggle(audioRef.current ?? undefined)}
          data-testid="toggle-audio"
        >
          {audio.isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="px-4 py-2 rounded bg-slate-800 border border-slate-700"
          onClick={() => audioService.load(src, audioRef.current ?? undefined)}
        >
          Neu laden
        </button>
      </div>
    </div>
  );
}
