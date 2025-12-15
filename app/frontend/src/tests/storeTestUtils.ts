import { act } from 'react';
import { useGeckoStore } from '@/state/store';

export function resetStore() {
  act(() => {
    useGeckoStore.setState({
      transcripts: {},
      currentId: undefined,
      audio: { isLoaded: false, isPlaying: false }
    });
  });
}
