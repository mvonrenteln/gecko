import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranscriptEditor } from '../TranscriptEditor';
import { TranscriptRecord } from '@/models/transcript';
import { useGeckoStore } from '@/state/store';
import { resetStore } from '@/tests/storeTestUtils';

describe('TranscriptEditor', () => {
  const transcript: TranscriptRecord = {
    id: 'alpha',
    title: 'Discovery Call',
    description: 'Team spricht über einen neuen Datensatz.',
    audioUrl: 'https://example.com/audio.mp3',
    updatedAt: '2024-12-03T10:00:00Z',
    segments: [
      {
        start: 0,
        end: 4.2,
        speaker: 'Alice',
        text: 'Hallo zusammen, ich habe die Audiodatei geladen.'
      }
    ]
  };

  beforeEach(() => {
    resetStore();
    act(() => {
      useGeckoStore.setState({
        transcripts: { [transcript.id]: transcript },
        currentId: transcript.id,
        audio: { isLoaded: false, isPlaying: false }
      });
    });
  });

  afterEach(() => {
    resetStore();
  });

  it('renders editable transcript and updates store on save', async () => {
    await act(async () => {
      render(<TranscriptEditor transcript={transcript} />);
    });

    const user = userEvent.setup();

    const textarea = screen.getByTestId('transcript-textarea');
    expect(textarea).toHaveValue('Hallo zusammen, ich habe die Audiodatei geladen.');

    await act(async () => {
      await user.clear(textarea);
      await user.type(textarea, 'Überarbeiteter Text');
      await user.click(screen.getByTestId('save-transcript'));
    });

    const stored = useGeckoStore.getState().transcripts[transcript.id];
    expect(stored.segments[0].text).toBe('Überarbeiteter Text');
  });

  it('links to transcript export endpoint', () => {
    act(() => {
      render(<TranscriptEditor transcript={transcript} />);
    });
    expect(screen.getByTestId('export-transcript')).toHaveAttribute('href', '/api/transcripts/alpha/export');
  });
});
