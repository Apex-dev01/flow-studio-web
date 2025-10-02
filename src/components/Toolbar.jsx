import React from 'react';
import './Toolbar.css';

function Toolbar({ isPlaying, onPlayPause, onStop, bpm, onBpmChange }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <h1 className="logo">Flow Studio</h1>
      </div>
      <div className="toolbar-center">
        <button 
          className={isPlaying ? 'active' : ''}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={onStop} title="Stop">⏹</button>
        <div className="bpm-control">
          <label>BPM:</label>
          <input
            type="number"
            min="60"
            max="200"
            value={bpm}
            onChange={(e) => onBpmChange(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="toolbar-right">
        <button title="Export">💾 Export</button>
      </div>
    </div>
  );
}

export default Toolbar;
