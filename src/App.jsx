import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import Sequencer from './components/Sequencer';
import Mixer from './components/Mixer';
import ChannelRack from './components/ChannelRack';
import Playlist from './components/Playlist';
import Toolbar from './components/Toolbar';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [channels, setChannels] = useState([
    { id: 1, name: 'Kick', type: 'kick', volume: -6, pan: 0, muted: false, solo: false },
    { id: 2, name: 'Snare', type: 'snare', volume: -6, pan: 0, muted: false, solo: false },
    { id: 3, name: 'Hi-Hat', type: 'hihat', volume: -12, pan: 0, muted: false, solo: false },
    { id: 4, name: 'Synth', type: 'synth', volume: -8, pan: 0, muted: false, solo: false },
  ]);
  const [patterns, setPatterns] = useState([
    { id: 1, name: 'Pattern 1', steps: Array(16).fill(null).map(() => ({})), length: 16 },
  ]);
  const [currentPattern, setCurrentPattern] = useState(0);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const togglePlayback = async () => {
    if (!isPlaying) {
      await Tone.start();
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
    setIsPlaying(!isPlaying);
  };

  const stopPlayback = () => {
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    setIsPlaying(false);
  };

  const updateChannel = (id, updates) => {
    setChannels(channels.map(ch => ch.id === id ? { ...ch, ...updates } : ch));
  };

  const updatePattern = (patternIndex, stepIndex, channelId, value) => {
    const newPatterns = [...patterns];
    if (!newPatterns[patternIndex].steps[stepIndex]) {
      newPatterns[patternIndex].steps[stepIndex] = {};
    }
    newPatterns[patternIndex].steps[stepIndex][channelId] = value;
    setPatterns(newPatterns);
  };

  return (
    <div className="app">
      <Toolbar
        isPlaying={isPlaying}
        onPlayPause={togglePlayback}
        onStop={stopPlayback}
        bpm={bpm}
        onBpmChange={setBpm}
      />
      <div className="main-content">
        <div className="left-panel">
          <ChannelRack
            channels={channels}
            onChannelUpdate={updateChannel}
          />
          <Sequencer
            pattern={patterns[currentPattern]}
            channels={channels}
            onStepChange={(stepIndex, channelId, value) =>
              updatePattern(currentPattern, stepIndex, channelId, value)
            }
            isPlaying={isPlaying}
          />
        </div>
        <div className="right-panel">
          <Playlist
            patterns={patterns}
            playlist={playlist}
            onPlaylistUpdate={setPlaylist}
          />
          <Mixer
            channels={channels}
            onChannelUpdate={updateChannel}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
