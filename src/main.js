import * as Tone from 'tone';
import { AudioEngine } from './audio/AudioEngine.js';
import { UIController } from './ui/UIController.js';
import { PatternManager } from './patterns/PatternManager.js';
import { TransportController } from './transport/TransportController.js';

// Initialize the DAW application
class FlowStudio {
  constructor() {
    this.audioEngine = null;
    this.uiController = null;
    this.patternManager = null;
    this.transportController = null;
    this.isInitialized = false;
  }

  async init() {
    try {
      // Initialize Tone.js audio context
      await Tone.start();
      console.log('Audio context started');

      // Initialize core modules
      this.audioEngine = new AudioEngine();
      this.patternManager = new PatternManager();
      this.transportController = new TransportController(this.audioEngine);
      this.uiController = new UIController(
        this.audioEngine,
        this.patternManager,
        this.transportController
      );

      // Set up initial instruments
      this.setupDefaultInstruments();
      
      // Set up event listeners
      this.setupEventListeners();

      this.isInitialized = true;
      console.log('Flow Studio initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Flow Studio:', error);
    }
  }

  setupDefaultInstruments() {
    // Add default synth
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.audioEngine.addInstrument('Synth', synth);

    // Add drum machine
    const drums = new Tone.MembraneSynth().toDestination();
    this.audioEngine.addInstrument('Drums', drums);
  }

  setupEventListeners() {
    // Transport controls
    document.getElementById('play-btn').addEventListener('click', () => {
      this.transportController.play();
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
      this.transportController.stop();
    });

    document.getElementById('record-btn').addEventListener('click', () => {
      this.transportController.toggleRecord();
    });

    // Pattern management
    document.getElementById('add-pattern-btn').addEventListener('click', () => {
      this.patternManager.createPattern();
      this.uiController.refreshPatternList();
    });
  }
}

// Start the application
const app = new FlowStudio();

// Wait for user interaction to start audio
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.createElement('button');
  startButton.textContent = 'Start Flow Studio';
  startButton.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px 40px; font-size: 18px; cursor: pointer; z-index: 10000; background: #0066ff; color: white; border: none; border-radius: 8px;';
  
  startButton.addEventListener('click', async () => {
    await app.init();
    startButton.remove();
  });
  
  document.body.appendChild(startButton);
});

export default app;
