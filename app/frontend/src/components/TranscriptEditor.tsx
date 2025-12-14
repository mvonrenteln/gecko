import { useState } from 'react';
import { TranscriptRecord } from '@/models/transcript';
import { saveTranscript } from '@/services/transcriptService';
import { useGeckoStore } from '@/state/store';

interface TranscriptEditorProps {
  transcript: TranscriptRecord;
}

export function TranscriptEditor({ transcript }: TranscriptEditorProps) {
  const [draft, setDraft] = useState(transcript.segments[0]?.text ?? '');
  const store = useGeckoStore();

  const handleSave = () => {
    const updated = saveTranscript(transcript.id, draft, 0);
    if (updated) {
      store.updateTranscript(transcript.id, draft, 0);
    }
  };

  return (
    <div className="gecko-panel p-4 space-y-3" data-testid="transcript-editor">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Aktives Transkript</p>
          <p className="font-semibold text-lg">{transcript.title}</p>
        </div>
        <span className="text-xs text-slate-400">Zuletzt aktualisiert: {new Date(transcript.updatedAt).toLocaleString()}</span>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="w-full min-h-[180px] rounded bg-slate-900 border border-slate-700 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        data-testid="transcript-textarea"
      />
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
          data-testid="save-transcript"
        >
          Speichern
        </button>
        <a
          href={`/api/transcripts/${transcript.id}/export`}
          className="px-4 py-2 rounded bg-slate-800 border border-slate-700"
          data-testid="export-transcript"
        >
          Exportieren
        </a>
      </div>
      <ol className="list-decimal list-inside space-y-2 text-sm text-slate-200">
        {transcript.segments.map((segment, idx) => (
          <li key={segment.start} className="rounded border border-slate-800 p-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{segment.speaker}</span>
              <span>
                {segment.start}s – {segment.end}s
              </span>
            </div>
            <p className="mt-1">{segment.text}</p>
            {idx === 0 && <span className="text-[11px] text-emerald-300">Live bearbeitbar</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
