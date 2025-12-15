import '@testing-library/jest-dom';

Object.defineProperty(global.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: jest.fn()
});

Object.defineProperty(global.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  value: jest.fn().mockResolvedValue(undefined)
});

Object.defineProperty(global.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  value: jest.fn()
});
