// TransportController.js - Controls playback transport (play, stop, record)

import * as Tone from 'tone';

export class TransportController {
  constructor(audioEngine) {
    this.audioEngine = audioEngine;
    this.isPlaying = false;
    this.isRecording = false;
  }

  play() {
    if (!this.isPlaying) {
      Tone.Transport.start();
      this.isPlaying = true;
    }
  }

  stop() {
    if (this.isPlaying) {
      Tone.Transport.stop();
      this.isPlaying = false;
    }
  }

  toggleRecord() {
    this.isRecording = !this.isRecording;
  }
}

export default TransportController;
