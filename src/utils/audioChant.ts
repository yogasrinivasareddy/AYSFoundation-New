/**
 * Sacred Audio Synthesizer for Chants & Singing Bowl
 * Uses Web Audio API for an authentic, warm acoustic meditation resonance
 * without relying on external media files.
 */

class ChantAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private activeNodes: (OscillatorNode | GainNode)[] = [];
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public onStateChange(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public playSingingBowl(durationSeconds = 8) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
    masterGain.connect(this.ctx.destination);

    // Fundamental frequencies of a 432Hz tuned Tibetan/Indian singing bowl
    const freqs = [216, 432, 864, 1296, 1728];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);

      const amp = 0.4 / (idx + 1);
      gain.gain.setValueAtTime(amp, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds * (1 - idx * 0.12));

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + durationSeconds);
    });
  }

  public playMeditativeDrone(durationSeconds = 14) {
    this.initContext();
    if (!this.ctx) return;

    if (this.isPlaying) {
      this.stop();
      return;
    }

    this.isPlaying = true;
    if (this.onStateChangeCallback) this.onStateChangeCallback(true);

    const now = this.ctx.currentTime;
    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.001, now);
    master.gain.linearRampToValueAtTime(0.25, now + 2);
    master.gain.setValueAtTime(0.25, now + durationSeconds - 2);
    master.gain.linearRampToValueAtTime(0.0001, now + durationSeconds);
    master.connect(this.ctx.destination);

    // Tanpura root notes: Sa (C3 ~ 130.81Hz), Pa (G3 ~ 196.00Hz), Sa high (C4 ~ 261.63Hz)
    const notes = [130.81, 131.2, 196.0, 261.63, 523.25];
    const oscs: OscillatorNode[] = [];

    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for warm organic resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      const level = 0.15 / (i + 1);
      g.gain.setValueAtTime(level, now);

      osc.connect(filter);
      filter.connect(g);
      g.connect(master);

      osc.start(now);
      osc.stop(now + durationSeconds);
      oscs.push(osc);
    });

    this.playSingingBowl(10);

    setTimeout(() => {
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }, durationSeconds * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    if (this.ctx) {
      try {
        this.ctx.close();
        this.ctx = null;
      } catch {
        // no-op
      }
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const chantAudio = new ChantAudioEngine();
