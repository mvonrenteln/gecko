import '@testing-library/jest-dom';
import React from 'react';
import { afterEach, vi } from 'vitest';
import { useGeckoStore } from '@/state/store';

vi.mock('next/link', () => {
  const Link = ({ href, children, ...rest }: any) =>
    React.createElement('a', { href, ...rest }, children);
  (Link as any).displayName = 'Link';
  return { default: Link };
});

const originalAudioLoad = HTMLMediaElement.prototype.load;
const originalAudioPlay = HTMLMediaElement.prototype.play;
const originalAudioPause = HTMLMediaElement.prototype.pause;

Object.defineProperty(HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: vi.fn()
});

Object.defineProperty(HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined)
});

Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: vi.fn()
});

afterEach(() => {
  useGeckoStore.setState({
    transcripts: {},
    currentId: undefined,
    audio: { isLoaded: false, isPlaying: false }
  });
  vi.restoreAllMocks();
});

afterEach(() => {
  HTMLMediaElement.prototype.load = originalAudioLoad;
  HTMLMediaElement.prototype.play = originalAudioPlay;
  HTMLMediaElement.prototype.pause = originalAudioPause;
});
