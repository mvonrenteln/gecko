import { useMemo, useState } from 'react';
import TranscriptService from '../../src/modules/transcript/transcriptService';
import StateStore from '../../src/modules/state/store';

export async function getServerSideProps({ params }) {
  return {
    props: {
      transcriptId: params.transcriptId
    }
  };
}

export default function TranscriptPage({ transcriptId }) {
  const store = useMemo(() => new StateStore(), []);
  const service = useMemo(() => new TranscriptService(store), [store]);
  const transcript = service.loadById(transcriptId);
  const [segments, setSegments] = useState(transcript.segments);

  const handleChange = (segmentId, value) => {
    const updated = service.updateSegment(segmentId, value);
    setSegments(updated.segments);
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold text-white">Transkript: {transcript.title}</h1>
        <p className="text-slate-300 text-sm">Segmentweise Bearbeitung mit Store-Rückmeldung.</p>
      </header>
      <div className="legacy-proxy space-y-3">
        {segments.map((segment) => (
          <div key={segment.id} className="space-y-1">
            <div className="text-xs uppercase tracking-wide text-slate-400">Speaker {segment.speaker}</div>
            <textarea
              className="w-full rounded bg-slate-950 border border-slate-700 p-3 text-slate-100"
              value={segment.text}
              onChange={(event) => handleChange(segment.id, event.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
