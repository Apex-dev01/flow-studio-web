// PatternManager.js - Manages pattern creation and storage

export class PatternManager {
  constructor() {
    this.patterns = [];
  }

  createPattern() {
    const pattern = { id: this.patterns.length, notes: [] };
    this.patterns.push(pattern);
    return pattern;
  }
}

export default PatternManager;
