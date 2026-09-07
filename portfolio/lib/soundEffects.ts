"use client";

// High-End Organic Acoustic & Cyber-Luxe Web Audio Synthesizer
// Inspired by modern sound design in Apple, Linear, Raycast & Stripe interfaces.

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private lastHoverTime: number = 0;
  private hoverIndex: number = 0;
  private hoverResetTimeout: ReturnType<typeof setTimeout> | null = null;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  // Pentatonic acoustic scale for dynamic, musical hover interaction
  private pentatonicScale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5, D5, E5, G5, A5, C6

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-sound-enabled");
      this.enabled = saved !== null ? saved === "true" : true;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-sound-enabled", String(this.enabled));
    }
    if (this.enabled) {
      this.playToggle();
    }
    this.listeners.forEach((listener) => listener(this.enabled));
    return this.enabled;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // 1. Organic Glass/Marimba Musical Hover Droplet
  public playHover(pitchMultiplier = 1) {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastHoverTime < 45) return;
    this.lastHoverTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const baseFreq =
        this.pentatonicScale[this.hoverIndex % this.pentatonicScale.length] * pitchMultiplier;
      this.hoverIndex = (this.hoverIndex + 1) % this.pentatonicScale.length;

      if (this.hoverResetTimeout) clearTimeout(this.hoverResetTimeout);
      this.hoverResetTimeout = setTimeout(() => {
        this.hoverIndex = 0;
      }, 1200);

      const t = ctx.currentTime;

      const carrier = ctx.createOscillator();
      const carrierGain = ctx.createGain();
      const modulator = ctx.createOscillator();
      const modulatorGain = ctx.createGain();

      carrier.type = "sine";
      carrier.frequency.setValueAtTime(baseFreq, t);
      carrier.frequency.exponentialRampToValueAtTime(baseFreq * 0.98, t + 0.04);

      modulator.type = "triangle";
      modulator.frequency.setValueAtTime(baseFreq * 2.76, t);

      modulatorGain.gain.setValueAtTime(baseFreq * 0.6, t);
      modulatorGain.gain.exponentialRampToValueAtTime(0.01, t + 0.035);

      modulator.connect(carrier.frequency);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.04);

      carrierGain.gain.setValueAtTime(0.035, t);
      carrierGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      carrier.connect(filter);
      filter.connect(carrierGain);
      carrierGain.connect(ctx.destination);

      carrier.start(t);
      modulator.start(t);
      carrier.stop(t + 0.05);
      modulator.stop(t + 0.05);
    } catch (_err) {}
  }

  // 2. Tactile Precision Haptic Pop (Apple/Linear style click)
  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // Layer 1: High transient snappy click
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = "triangle";
      snapOsc.frequency.setValueAtTime(1400, t);
      snapOsc.frequency.exponentialRampToValueAtTime(180, t + 0.025);

      snapGain.gain.setValueAtTime(0.08, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);

      snapOsc.start(t);
      snapOsc.stop(t + 0.03);

      // Layer 2: Deep tactile acoustic sub-body
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(160, t);
      subOsc.frequency.exponentialRampToValueAtTime(55, t + 0.04);

      subGain.gain.setValueAtTime(0.12, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(t);
      subOsc.stop(t + 0.05);
    } catch (_err) {}
  }

  // 3. Cinematic Celestial 360° Spin & Orbital Resonance
  public playSpin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const duration = 0.95;

      // Layer 1: Sweeping Energy Riser
      const riserOsc = ctx.createOscillator();
      const riserGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      riserOsc.type = "sine";
      riserOsc.frequency.setValueAtTime(220, t);
      riserOsc.frequency.exponentialRampToValueAtTime(1320, t + duration * 0.6);
      riserOsc.frequency.exponentialRampToValueAtTime(660, t + duration);

      filter.type = "bandpass";
      filter.Q.value = 5;
      filter.frequency.setValueAtTime(300, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t + duration * 0.6);
      filter.frequency.exponentialRampToValueAtTime(800, t + duration);

      riserGain.gain.setValueAtTime(0.001, t);
      riserGain.gain.linearRampToValueAtTime(0.07, t + duration * 0.4);
      riserGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      riserOsc.connect(filter);
      filter.connect(riserGain);
      riserGain.connect(ctx.destination);

      riserOsc.start(t);
      riserOsc.stop(t + duration);

      // Layer 2: Sparkling celestial crystal bell cascade
      const chimeFrequencies = [659.25, 880.0, 1046.5, 1318.51, 1567.98]; // E5, A5, C6, E6, G6
      chimeFrequencies.forEach((freq, i) => {
        const chimeTime = t + i * 0.12;
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(freq, chimeTime);

        chimeGain.gain.setValueAtTime(0.035, chimeTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 0.28);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(chimeTime);
        chimeOsc.stop(chimeTime + 0.3);
      });
    } catch (_err) {}
  }

  // 4. Smooth Magnetic Tab Switch (Acoustic Pluck)
  public playTab() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      [0, 0.035].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        const freq = idx === 0 ? 520 : 780;
        osc.frequency.setValueAtTime(freq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, t + offset + 0.04);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, t + offset);

        gain.gain.setValueAtTime(0.045, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + offset);
        osc.stop(t + offset + 0.05);
      });
    } catch (_err) {}
  }

  // 5. Crystalline Modern Theme & Sound Chime (Major 6th Chord)
  public playToggle() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      [1046.5, 1318.51, 1760.0].forEach((freq, idx) => {
        const noteTime = t + idx * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.04, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.24);
      });
    } catch (_err) {}
  }

  // 6. Euphoric Success Harp Cascade (Major 9th Chord)
  public playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98];

      chord.forEach((freq, index) => {
        const noteTime = t + index * 0.06;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.05, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.48);
      });
    } catch (_err) {}
  }
}

export const soundEffects = new SoundManager();
