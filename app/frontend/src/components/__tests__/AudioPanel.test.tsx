import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudioPanel } from '../AudioPanel';
import { resetStore } from '@/tests/storeTestUtils';

describe('AudioPanel', () => {
  beforeEach(() => {
    resetStore();
  });

  afterEach(() => {
    resetStore();
  });

  it('loads audio source and toggles playback state', async () => {
    await act(async () => {
      render(<AudioPanel src="https://example.com/audio.mp3" />);
    });

    await act(async () => {
      await waitFor(() => expect(screen.getByText('geladen')).toBeInTheDocument());
    });

    const toggleButton = screen.getByTestId('toggle-audio');
    expect(toggleButton).toHaveTextContent('Play');

    const user = userEvent.setup();
    await act(async () => {
      await user.click(toggleButton);
    });
    await waitFor(() => expect(toggleButton).toHaveTextContent('Pause'));

    const audioElement = screen.getByTestId('audio-element') as HTMLAudioElement;
    expect(audioElement.src).toContain('https://example.com/audio.mp3');
  });
});
