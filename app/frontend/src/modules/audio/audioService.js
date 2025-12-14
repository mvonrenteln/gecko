export default class AudioService {
  constructor(store) {
    this.store = store;
    this.audio = null;
    this.stateSubscribers = [];
    this.state = { status: 'idle', duration: 0 };
  }

  onStateChange(cb) {
    this.stateSubscribers.push(cb);
    cb(this.state);
    return () => {
      this.stateSubscribers = this.stateSubscribers.filter((fn) => fn !== cb);
    };
  }

  setState(next) {
    this.state = { ...this.state, ...next };
    this.store.setValue('audio', this.state);
    this.stateSubscribers.forEach((cb) => cb(this.state));
  }

  load(src) {
    this.audio = new Audio(src);
    this.audio.addEventListener('loadedmetadata', () => {
      this.setState({ status: 'ready', duration: this.audio.duration });
    });
    this.audio.addEventListener('ended', () => this.setState({ status: 'ended' }));
    this.setState({ status: 'loading' });
  }

  play() {
    if (this.audio) {
      this.audio.play();
      this.setState({ status: 'playing' });
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.setState({ status: 'paused' });
    }
  }
}
