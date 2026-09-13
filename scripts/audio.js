/**
 * Wizarding Soundscape Engine (Native Web Audio API)
 * Procedurally generates ambient fireplace crackle, magical chimes, and spell sound effects.
 * Requires zero external MP3s, zero CORS issues, instant loading.
 */

class WizardSoundEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.ambientNodes = null;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn("Web Audio API not supported in this browser.");
      return;
    }
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  toggleSound() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbient();
      this.playChime(523.25, 0.4); // C5 chime
      setTimeout(() => this.playChime(659.25, 0.4), 150); // E5
      setTimeout(() => this.playChime(783.99, 0.5), 300); // G5
    } else {
      this.stopAmbient();
    }

    return this.isEnabled;
  }

  startAmbient() {
    if (!this.ctx || !this.isEnabled) return;
    this.stopAmbient();

    try {
      // 1. Procedural Fireplace Noise (Pink/Brown noise filter)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        let brown = (b0 + b1 + b2) * 0.1;
        // Add random crackle pops
        if (Math.random() < 0.0008) {
          brown += (Math.random() - 0.5) * 2.5;
        }
        output[i] = brown;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const fireGain = this.ctx.createGain();
      fireGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(fireGain);
      fireGain.connect(this.masterGain);
      whiteNoise.start();

      // 2. Subtle ethereal drone (Hogwarts nocturnal aura)
      const droneOsc = this.ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      droneOsc.connect(droneGain);
      droneGain.connect(this.masterGain);
      droneOsc.start();

      this.ambientNodes = { whiteNoise, filter, fireGain, droneOsc, droneGain };
    } catch (e) {
      console.warn("Could not start procedural ambient audio:", e);
    }
  }

  stopAmbient() {
    if (this.ambientNodes) {
      try {
        this.ambientNodes.whiteNoise.stop();
        this.ambientNodes.droneOsc.stop();
      } catch (e) {}
      this.ambientNodes = null;
    }
  }

  // Play a mystical chime bell note
  playChime(freq = 659.25, duration = 1.2) {
    if (!this.ctx || !this.isEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  // Wand swoosh whoosh
  playWandSwoosh() {
    if (!this.ctx || !this.isEnabled) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.28);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(3.0, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  // Lumos ignite sparkle
  playLumosSound() {
    if (!this.ctx || !this.isEnabled) return;
    this.playChime(880, 1.0); // A5
    setTimeout(() => this.playChime(1174.66, 1.2), 120); // D6
    setTimeout(() => this.playChime(1318.51, 1.5), 240); // E6
  }

  // Patronus Silver Eruption Sound
  playPatronusSound() {
    if (!this.ctx || !this.isEnabled) return;
    try {
      const now = this.ctx.currentTime;
      [220, 329.63, 440, 659.25, 880].forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 2.5);
        }, idx * 100);
      });
    } catch (e) {}
  }

  // Dramatic Sorting Hat Announcement
  playSortingFanfare() {
    if (!this.ctx || !this.isEnabled) return;
    const now = this.ctx.currentTime;
    // Heroic brass-like sequence
    const notes = [
      { f: 392.00, d: 0.25, delay: 0 },   // G4
      { f: 523.25, d: 0.3, delay: 260 },  // C5
      { f: 659.25, d: 0.3, delay: 560 },  // E5
      { f: 783.99, d: 0.7, delay: 860 }   // G5
    ];

    notes.forEach(note => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + note.d);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + note.d);
      }, note.delay);
    });
  }

  // Alohomora Lock Tumbler Click
  playAlohomoraSound() {
    if (!this.ctx || !this.isEnabled) return;
    try {
      const clicks = [0, 80, 160, 240, 360];
      clicks.forEach(delay => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.04);
        }, delay);
      });
    } catch (e) {}
  }
}

export const soundEngine = new WizardSoundEngine();
