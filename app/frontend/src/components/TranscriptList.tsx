import Link from 'next/link';
import { TranscriptRecord } from '@/models/transcript';

interface TranscriptListProps {
  transcripts: TranscriptRecord[];
}

export function TranscriptList({ transcripts }: TranscriptListProps) {
  return (
    <div className="gecko-panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Available transcripts</p>
          <p className="text-xl font-semibold">State-Store Demo</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full border border-indigo-400 text-indigo-200">SSR + ISR</span>
      </div>
      <ul className="divide-y divide-slate-800">
        {transcripts.map((entry) => (
          <li key={entry.id} className="py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{entry.title}</p>
                <p className="text-sm text-slate-400">{entry.description}</p>
              </div>
              <div className="flex gap-3 items-center text-sm text-slate-400">
                <span>Updated {new Date(entry.updatedAt).toLocaleDateString()}</span>
                <Link
                  className="px-3 py-2 rounded bg-slate-800 border border-slate-700 hover:border-emerald-500"
                  href={`/transcripts/${entry.id}`}
                >
                  Open
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
