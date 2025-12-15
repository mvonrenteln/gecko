import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import transcripts from '@/data/transcripts.json';
import * as transcriptService from '@/services/transcriptService';
import { useGeckoStore } from '@/state/store';
import { TranscriptEditor } from '../TranscriptEditor';

describe('TranscriptEditor', () => {
  const transcript = transcripts[0];

  beforeEach(() => {
    useGeckoStore.setState({
      transcripts: { [transcript.id]: transcript },
      currentId: transcript.id,
      audio: { isLoaded: false, isPlaying: false }
    });
  });

  it('saves edited text and updates the store', async () => {
    const updatedText = 'Updated line for the save flow';
    const user = userEvent.setup();
    const saveSpy = vi
      .spyOn(transcriptService, 'saveTranscript')
      .mockReturnValue({ ...transcript, segments: [{ ...transcript.segments[0], text: updatedText }] });
    const updateSpy = vi.spyOn(useGeckoStore.getState(), 'updateTranscript');

    render(<TranscriptEditor transcript={transcript} />);

    const textarea = screen.getByTestId('transcript-textarea');
    await user.clear(textarea);
    await user.type(textarea, updatedText);
    await user.click(screen.getByTestId('save-transcript'));

    expect(saveSpy).toHaveBeenCalledWith(transcript.id, updatedText, 0);
    expect(updateSpy).toHaveBeenCalledWith(transcript.id, updatedText, 0);
    expect(textarea).toHaveValue(updatedText);
  });
});
