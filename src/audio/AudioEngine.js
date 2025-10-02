// AudioEngine.js - Manages audio synthesis and playback

export class AudioEngine {
  constructor() {
    this.instruments = new Map();
  }

  addInstrument(name, instrument) {
    this.instruments.set(name, instrument);
  }

  getInstrument(name) {
    return this.instruments.get(name);
  }
}

export default AudioEngine;
