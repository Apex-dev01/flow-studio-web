import React from 'react';
import './Playlist.css';

function Playlist({ patterns, playlist, onPlaylistUpdate }) {
  return (
    <div className="playlist">
      <h3>Playlist / Timeline</h3>
      <div className="playlist-info">
        <p>Arrange patterns to create your track</p>
      </div>
      <div className="playlist-container">
        <div className="pattern-library">
          <h4>Patterns</h4>
          {patterns.map(pattern => (
            <div key={pattern.id} className="pattern-item" draggable="true">
              <span className="pattern-icon">🎵</span>
              <span>{pattern.name}</span>
            </div>
          ))}
        </div>
        <div className="timeline">
          <div className="timeline-header">
            <div className="timeline-ruler">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="timeline-marker">{i + 1}</div>
              ))}
            </div>
          </div>
          <div className="timeline-tracks">
            <div className="timeline-track">
              <div className="track-label">Track 1</div>
              <div className="track-content">
                {playlist.length === 0 && (
                  <div className="track-empty">Drag patterns here</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
