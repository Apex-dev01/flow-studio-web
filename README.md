# Flow Studio Web

 A professional web-based Digital Audio Workstation (DAW) inspired by FL Studio, built with React, Vite, Tone.js, and Web Audio API. Features a dark theme and is fully deployable to Vercel.

## Features

- **Sequencer/Pattern Editor**: 16-step sequencer with visual grid for programming beats and melodies
- **Channel Rack**: Manage multiple instrument channels (Kick, Snare, Hi-Hat, Synth)
- **Mixer**: Control volume and panning for each channel
- **Playlist/Timeline**: Arrange patterns into complete songs
- **Dark Theme**: Professional dark interface inspired by FL Studio
- **Real-time Audio**: Powered by Tone.js and Web Audio API
- **Vercel Ready**: Optimized for deployment to Vercel

## Tech Stack

- **React 18**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **Tone.js**: Web Audio framework for synthesis and scheduling
- **CSS3**: Custom dark theme styling

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Apex-dev01/flow-studio-web.git
cd flow-studio-web

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Play/Pause**: Click the play button in the toolbar to start/stop playback
2. **Adjust BPM**: Change the tempo using the BPM control (60-200 BPM)
3. **Program Patterns**: Click on the sequencer grid to add/remove notes
4. **Mix**: Adjust volume and panning for each channel in the mixer
5. **Arrange**: Build complete tracks in the playlist

## Project Structure

```
flow-studio-web/
├── src/
│   ├── components/
│   │   ├── Toolbar.jsx          # Transport controls and BPM
│   │   ├── Sequencer.jsx        # Step sequencer/pattern editor
│   │   ├── Mixer.jsx            # Volume and panning controls
│   │   ├── ChannelRack.jsx      # Instrument channel management
│   │   ├── Playlist.jsx         # Song arrangement
│   │   ├── Toolbar.css
│   │   ├── Sequencer.css
│   │   ├── Mixer.css
│   │   ├── ChannelRack.css
│   │   └── Playlist.css
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global app styles
│   └── main.js                  # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Vite and deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Development Notes

### Implementing Remaining Components

The following components need to be created:

**Mixer.jsx**:
```jsx
// Component with volume faders and pan knobs for each channel
// Update channel volumes/panning via onChannelUpdate prop
```

**ChannelRack.jsx**:
```jsx
// List of instruments with mute/solo controls
// Allow adding/removing channels
```

**Playlist.jsx**:
```jsx
// Timeline view for arranging patterns
// Drag and drop pattern blocks
```

### Component CSS Files

Each component should have corresponding CSS:
- Dark colors (#1a1a1a, #2a2a2a backgrounds)
- Cyan/teal accents (#14ffec, #0d7377)
- Proper hover states and transitions

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License

## Acknowledgments

- Inspired by FL Studio
- Built with Tone.js
- Powered by React and Vite
