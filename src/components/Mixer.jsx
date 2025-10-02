import React from 'react';
import './Mixer.css';

function Mixer({ channels, onChannelUpdate }) {
  return (
    <div className="mixer">
      <h3>Mixer</h3>
      <div className="mixer-channels">
        {channels.map(channel => (
          <div key={channel.id} className="mixer-channel">
            <div className="channel-name">{channel.name}</div>
            <div className="fader-container">
              <input
                type="range"
                className="volume-fader"
                min="-60"
                max="0"
                value={channel.volume}
                onChange={(e) => onChannelUpdate(channel.id, { volume: Number(e.target.value) })}
                orient="vertical"
              />
              <span className="volume-label">{channel.volume}dB</span>
            </div>
            <div className="pan-container">
              <input
                type="range"
                className="pan-knob"
                min="-1"
                max="1"
                step="0.1"
                value={channel.pan}
                onChange={(e) => onChannelUpdate(channel.id, { pan: Number(e.target.value) })}
              />
              <span className="pan-label">Pan: {channel.pan}</span>
            </div>
            <div className="channel-controls">
              <button
                className={channel.muted ? 'active' : ''}
                onClick={() => onChannelUpdate(channel.id, { muted: !channel.muted })}
              >
                M
              </button>
              <button
                className={channel.solo ? 'active' : ''}
                onClick={() => onChannelUpdate(channel.id, { solo: !channel.solo })}
              >
                S
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mixer;
