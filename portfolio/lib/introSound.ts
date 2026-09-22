/** Original short ambient cue; no downloaded audio or external requests. */
export function createIntroSound() {
  const context = new AudioContext();
  const master = context.createGain();
  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.ratio.value = 3;
  master.connect(compressor);
  compressor.connect(context.destination);
  const meter = context.createAnalyser();
  compressor.connect(meter);
  const now = context.currentTime;
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(0.8, now + 0.65);
  master.gain.setValueAtTime(0.8, now + 2.5);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 3.65);

  // Diffuse stereo hall: independent reflections with a softened high end.
  const reverb = context.createConvolver();
  const impulse = context.createBuffer(2, context.sampleRate * 2.5, context.sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const samples = impulse.getChannelData(channel);
    let softened = 0;
    for (let i = 0; i < samples.length; i++) {
      softened = softened * 0.65 + (Math.random() * 2 - 1) * 0.35;
      samples[i] = softened * Math.pow(1 - i / samples.length, 3);
    }
  }
  reverb.buffer = impulse;
  const wet = context.createGain();
  wet.gain.value = 0.65;
  reverb.connect(wet).connect(master);

  const voice = (frequency: number, offset: number, level: number, pan: number, bell = false) => {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const position = context.createStereoPanner();
    const at = now + offset;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.detune.value = pan * 5;
    position.pan.value = pan;
    envelope.gain.setValueAtTime(0, at);
    envelope.gain.linearRampToValueAtTime(level, at + (bell ? 0.025 : 0.65));
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + (bell ? 3.1 : 3.4));
    oscillator.connect(envelope).connect(position);
    position.connect(master);
    position.connect(reverb);
    oscillator.start(at);
    oscillator.stop(now + 3.5);
  };
  // Warm foundation, floating D-major/add-nine pad and delicate upper harmonics.
  voice(146.83, 0, 0.22, 0);
  [293.66, 369.99, 440, 554.37, 659.25].forEach((note, index) => {
    voice(note, index * 0.08, 0.11, (index - 2) * 0.3);
    voice(note * 2, index * 0.08, 0.012, (2 - index) * 0.3);
  });
  [880, 1108.73, 1318.51].forEach((note, index) => {
    voice(note, 0.8 + index * 0.27, 0.075, (index - 1) * 0.55, true);
    voice(note * 2.001, 0.8 + index * 0.27, 0.006, (1 - index) * 0.4, true);
  });
  // Cinematic low impact and an airy upward sweep beneath the harmonic bloom.
  const impact = context.createOscillator();
  const impactGain = context.createGain();
  impact.frequency.setValueAtTime(100, now);
  impact.frequency.exponentialRampToValueAtTime(42, now + 0.9);
  impactGain.gain.setValueAtTime(0, now);
  impactGain.gain.linearRampToValueAtTime(0.35, now + 0.045);
  impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  impact.connect(impactGain).connect(master);
  impact.start(now);
  impact.stop(now + 1.7);
  const air = context.createBufferSource();
  const airBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const airData = airBuffer.getChannelData(0);
  for (let i = 0; i < airData.length; i++) airData[i] = Math.random() * 2 - 1;
  air.buffer = airBuffer;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(350, now);
  filter.frequency.exponentialRampToValueAtTime(2400, now + 1.5);
  const airGain = context.createGain();
  airGain.gain.setValueAtTime(0, now);
  airGain.gain.linearRampToValueAtTime(0.09, now + 0.8);
  airGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.9);
  air.connect(filter).connect(airGain).connect(reverb);
  air.start(now);
  let cleanup: ReturnType<typeof setTimeout> | undefined;
  return {
        resume: async () => {
      try {
        if (context.state === 'closed') return false;
        await context.resume();
        if (context.state !== 'running') return false;
        if (!cleanup) {
          cleanup = setTimeout(() => { void context.close().catch(() => {}); }, 3900);
          if (process.env.NODE_ENV === 'development') {
            setTimeout(() => {
              const samples = new Float32Array(meter.fftSize);
              meter.getFloatTimeDomainData(samples);
              console.info('[intro-audio] playback', JSON.stringify({ state: context.state, time: context.currentTime, peak: Math.max(...samples.map(Math.abs)) }));
            }, 1000);
          }
        }
        return true;
      } catch { return false; }
    },
    stop: () => { clearTimeout(cleanup); if (context.state !== 'closed') void context.close().catch(() => {}); },
  };
}




