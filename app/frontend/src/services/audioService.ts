import { useGeckoStore } from '@/state/store';

export interface AudioControls {
  load: (src: string, element?: HTMLAudioElement) => Promise<void>;
  toggle: (element?: HTMLAudioElement) => void;
}

export function createAudioService(): AudioControls {
  const store = useGeckoStore.getState;

  const load = async (src: string, element?: HTMLAudioElement) => {
    store().setAudio({ source: src, isLoaded: false });
    if (element) {
      element.src = src;
      await element.load();
    }
    store().setAudio({ isLoaded: true, isPlaying: false });
  };

  const toggle = (element?: HTMLAudioElement) => {
    const audio = store().audio;
    if (!audio.source || !element) return;
    if (audio.isPlaying) {
      element.pause();
      store().setAudio({ isPlaying: false });
    } else {
      void element.play();
      store().setAudio({ isPlaying: true });
    }
  };

  return { load, toggle };
}
