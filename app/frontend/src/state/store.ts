import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { TranscriptRecord } from '@/models/transcript';

export interface AudioState {
  source?: string;
  isLoaded: boolean;
  isPlaying: boolean;
}

interface GeckoState {
  transcripts: Record<string, TranscriptRecord>;
  currentId?: string;
  audio: AudioState;
  hydrate: (records: TranscriptRecord[]) => void;
  selectTranscript: (id: string) => void;
  updateTranscript: (id: string, text: string, segmentIndex?: number) => void;
  setAudio: (audio: Partial<AudioState>) => void;
}

export const useGeckoStore = create<GeckoState>()(
  devtools((set) => ({
    transcripts: {},
    currentId: undefined,
    audio: { isLoaded: false, isPlaying: false },
    hydrate: (records) =>
      set(() => ({
        transcripts: records.reduce(
          (acc, record) => ({ ...acc, [record.id]: record }),
          {}
        )
      })),
    selectTranscript: (id) => set(() => ({ currentId: id })),
    updateTranscript: (id, text, segmentIndex) =>
      set((state) => {
        const record = state.transcripts[id];
        if (!record) return state;
        const nextSegments = [...record.segments];
        if (segmentIndex !== undefined && nextSegments[segmentIndex]) {
          nextSegments[segmentIndex] = { ...nextSegments[segmentIndex], text };
        }
        return {
          transcripts: {
            ...state.transcripts,
            [id]: {
              ...record,
              updatedAt: new Date().toISOString(),
              segments: nextSegments
            }
          }
        };
      }),
    setAudio: (audio) => set((state) => ({ audio: { ...state.audio, ...audio } }))
  }))
);
