import React from 'react';
import './ChannelRack.css';

function ChannelRack({ channels, onChannelUpdate }) {
  return (
    <div className="channel-rack">
      <h3>Channel Rack</h3>
      <div className="channels-list">
        {channels.map(channel => (
          <div key={channel.id} className="channel-item">
            <div className="channel-info">
              <span className="channel-icon">🎵</span>
              <span className="channel-name">{channel.name}</span>
            </div>
            <div className="channel-buttons">
              <button
                className={`channel-btn ${channel.muted ? 'active' : ''}`}
                onClick={() => onChannelUpdate(channel.id, { muted: !channel.muted })}
                title="Mute"
              >
                M
              </button>
              <button
                className={`channel-btn ${channel.solo ? 'active' : ''}`}
                onClick={() => onChannelUpdate(channel.id, { solo: !channel.solo })}
                title="Solo"
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

export default ChannelRack;
