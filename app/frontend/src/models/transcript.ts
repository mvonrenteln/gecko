export interface TranscriptSegment {
  start: number;
  end: number;
  speaker: string;
  text: string;
}

export interface TranscriptRecord {
  id: string;
  title: string;
  description?: string;
  audioUrl: string;
  segments: TranscriptSegment[];
  updatedAt: string;
}
