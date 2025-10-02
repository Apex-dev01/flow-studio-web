import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import './Sequencer.css';

function Sequencer({ pattern, channels, onStepChange, isPlaying }) {
  const synthsRef = useRef({});
  const sequenceRef = useRef(null);

  useEffect(() => {
    // Initialize synths for each channel
    channels.forEach(channel => {
      if (!synthsRef.current[channel.id]) {
        switch (channel.type) {
          case 'kick':
            synthsRef.current[channel.id] = new Tone.MembraneSynth().toDestination();
            break;
          case 'snare':
            synthsRef.current[channel.id] = new Tone.NoiseSynth({
              noise: { type: 'white' },
              envelope: { attack: 0.005, decay: 0.1, sustain: 0 }
            }).toDestination();
            break;
          case 'hihat':
            synthsRef.current[channel.id] = new Tone.MetalSynth({
              frequency: 200,
              envelope: { attack: 0.001, decay: 0.05, release: 0.01 }
            }).toDestination();
            break;
          case 'synth':
            synthsRef.current[channel.id] = new Tone.PolySynth(Tone.Synth).toDestination();
            break;
          default:
            synthsRef.current[channel.id] = new Tone.Synth().toDestination();
        }
      }
    });
  }, [channels]);

  useEffect(() => {
    if (isPlaying && pattern) {
      sequenceRef.current = new Tone.Sequence(
        (time, step) => {
          pattern.steps[step] && Object.entries(pattern.steps[step]).forEach(([channelId, active]) => {
            if (active && synthsRef.current[channelId]) {
              const channel = channels.find(c => c.id === Number(channelId));
              if (channel && !channel.muted) {
                if (channel.type === 'synth') {
                  synthsRef.current[channelId].triggerAttackRelease('C4', '8n', time);
                } else {
                  synthsRef.current[channelId].triggerAttackRelease('8n', time);
                }
              }
            }
          });
        },
        [...Array(pattern.length).keys()],
        '16n'
      );
      sequenceRef.current.start(0);
    }

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
    };
  }, [isPlaying, pattern, channels]);

  const toggleStep = (stepIndex, channelId) => {
    const currentValue = pattern.steps[stepIndex]?.[channelId];
    onStepChange(stepIndex, channelId, !currentValue);
  };

  return (
    <div className="sequencer">
      <h3>Pattern Editor</h3>
      <div className="sequencer-grid">
        <div className="channel-labels">
          {channels.map(channel => (
            <div key={channel.id} className="channel-label">{channel.name}</div>
          ))}
        </div>
        <div className="steps-container">
          {Array.from({ length: pattern.length }).map((_, stepIndex) => (
            <div key={stepIndex} className="step-column">
              <div className="step-number">{stepIndex + 1}</div>
              {channels.map(channel => (
                <button
                  key={`${stepIndex}-${channel.id}`}
                  className={`step-button ${pattern.steps[stepIndex]?.[channel.id] ? 'active' : ''}`}
                  onClick={() => toggleStep(stepIndex, channel.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sequencer;
