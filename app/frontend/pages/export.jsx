import { useMemo, useState } from 'react';
import TranscriptService from '../src/modules/transcript/transcriptService';
import StateStore from '../src/modules/state/store';

export default function ExportPage() {
  const store = useMemo(() => new StateStore(), []);
  const service = useMemo(() => new TranscriptService(store), [store]);
  const [exported, setExported] = useState('');

  const handleExport = () => {
    const payload = service.exportToJson();
    setExported(payload);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'transcript.json';
    anchor.click();
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold text-white">Export</h1>
        <p className="text-slate-300 text-sm">Schlanker Export-Pfad für den Parallelbetrieb.</p>
      </header>
      <div className="legacy-proxy space-y-2">
        <button className="px-3 py-2 bg-emerald-600 rounded text-white" onClick={handleExport}>
          Export als JSON
        </button>
        <pre className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-emerald-100 overflow-auto min-h-[120px]">
          {exported || 'Noch keine Exportdatei generiert.'}
        </pre>
      </div>
    </div>
  );
}
