export default class StateStore {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  setValue(key, value) {
    this.state[key] = value;
    this.notify();
  }

  getValue(key) {
    return this.state[key];
  }

  onChange(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
