import transcripts from '@/data/transcripts.json';
import { TranscriptRecord } from '@/models/transcript';
import { useGeckoStore } from '@/state/store';

const memoryStore = new Map<string, TranscriptRecord>(
  transcripts.map((record) => [record.id, record])
);

export function listTranscripts(): TranscriptRecord[] {
  return Array.from(memoryStore.values());
}

export function getTranscript(id: string): TranscriptRecord | undefined {
  return memoryStore.get(id);
}

export function saveTranscript(id: string, text: string, segmentIndex = 0): TranscriptRecord | undefined {
  const current = memoryStore.get(id);
  if (!current || current.segments.length === 0) return current;
  const nextSegments = [...current.segments];
  nextSegments[segmentIndex] = { ...nextSegments[segmentIndex], text };
  const updated: TranscriptRecord = {
    ...current,
    segments: nextSegments,
    updatedAt: new Date().toISOString()
  };
  memoryStore.set(id, updated);
  useGeckoStore.getState().hydrate(Array.from(memoryStore.values()));
  return updated;
}

export function exportTranscript(id: string): string | undefined {
  const record = memoryStore.get(id);
  if (!record) return undefined;
  const body = record.segments
    .map((segment) => `${segment.speaker} [${segment.start}-${segment.end}]: ${segment.text}`)
    .join('\n');
  return `# ${record.title}\n${body}`;
}
