import sampleTranscript from './sampleTranscript';

export default class TranscriptService {
  constructor(store) {
    this.store = store;
    this.store.setValue('transcript', sampleTranscript);
  }

  loadById(id) {
    const transcript = id === sampleTranscript.id ? sampleTranscript : { id, title: id, segments: [] };
    this.store.setValue('transcript', transcript);
    return transcript;
  }

  updateSegment(id, text) {
    const transcript = { ...this.store.getValue('transcript') };
    transcript.segments = transcript.segments.map((segment) =>
      segment.id === id ? { ...segment, text } : segment
    );
    this.store.setValue('transcript', transcript);
    return transcript;
  }

  exportToJson() {
    const transcript = this.store.getValue('transcript');
    return JSON.stringify(transcript, null, 2);
  }
}
