import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudioPanel } from '../AudioPanel';

const AUDIO_SRC = 'https://example.com/test-audio.mp3';

describe('AudioPanel', () => {
  it('shows audio source and toggles playback state', async () => {
    const user = userEvent.setup();
    render(<AudioPanel src={AUDIO_SRC} />);

    expect(screen.getByText(AUDIO_SRC)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('loaded')).toBeInTheDocument());

    const toggle = screen.getByTestId('toggle-audio');
    expect(toggle).toHaveTextContent('Play');

    await user.click(toggle);
    await waitFor(() => expect(toggle).toHaveTextContent('Pause'));

    await user.click(toggle);
    await waitFor(() => expect(toggle).toHaveTextContent('Play'));
  });
});
