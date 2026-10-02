/**
 * Web Audio API based ambient soundscapes and gentle chimes for focused studying.
 * 100% client-side, zero external assets required.
 */

let audioCtx: AudioContext | null = null;
let currentSourceNode: AudioNode | null = null;
let gainNode: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playAmbientSound(type: 'rain' | 'whitenoise' | 'binaural' | 'stream'): void {
  stopAmbientSound();
  const ctx = getAudioContext();

  gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.connect(ctx.destination);

  if (type === 'rain' || type === 'whitenoise' || type === 'stream') {
    // Generate filtered buffer noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'rain') {
        // Pink-brownish noise with random droplet impulses
        lastOut = (lastOut + 0.02 * white) / 1.02;
        const drop = Math.random() > 0.998 ? (Math.random() * 0.8) : 0;
        output[i] = lastOut * 3.5 + drop;
      } else if (type === 'stream') {
        // Soft rolling stream
        lastOut = (lastOut + 0.04 * white) / 1.04;
        output[i] = lastOut * 2.5;
      } else {
        // Gentle white noise
        output[i] = white * 0.3;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Apply lowpass/bandpass filter
    const filter = ctx.createBiquadFilter();
    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);
    } else if (type === 'stream') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
    } else {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, ctx.currentTime);
    }

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    whiteNoise.start();
    currentSourceNode = whiteNoise;
  } else if (type === 'binaural') {
    // Alpha focus 432 Hz + 440 Hz gentle sine waves
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(432, ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, ctx.currentTime);

    osc1.connect(gainNode);
    osc2.connect(gainNode);

    osc1.start();
    osc2.start();
    currentSourceNode = osc1;
  }
}

export function stopAmbientSound(): void {
  if (currentSourceNode) {
    try {
      (currentSourceNode as AudioScheduledSourceNode).stop();
    } catch {
      // Ignore if already stopped
    }
    currentSourceNode.disconnect();
    currentSourceNode = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
}

export function playTimerChime(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

    chimeGain.gain.setValueAtTime(0.3, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch {
    // Audio context may not be initiated yet
  }
}
