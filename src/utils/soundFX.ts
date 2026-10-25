// High-fidelity romantic Web Audio synthesizer for interactive wedding effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Soft crystal harp / bell chime for button clicks & heart taps
  playChime(frequency: number = 880) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Ignore audio context autoplay limitations
    }
  }

  // Romantic harmonic arpeggio (Harp glissando) for milestone unlocks & unboxing
  playHarpArpeggio() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.09, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.75);
      });
    } catch {}
  }

  // Page turn swoosh for scrapbook flip
  playPageTurn() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {}
  }

  // Wax seal stamp sound (deep soft resonance)
  playWaxSealStamp() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Celebratory wedding bell / blessing chime
  playWeddingBlessing() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [784, 987.77, 1174.66, 1567.98]; // G, B, D, G
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const time = now + idx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
         osc.stop(time + 1.25);
       });
     } catch {}
   }

   // Ethereal floating tone for lantern ascending into the sky
   playLanternRise() {
     if (!this.enabled) return;
     try {
       this.initCtx();
       if (!this.ctx) return;

       const now = this.ctx.currentTime;
       const osc1 = this.ctx.createOscillator();
       const osc2 = this.ctx.createOscillator();
       const gain = this.ctx.createGain();

       osc1.type = "sine";
       osc1.frequency.setValueAtTime(329.63, now); // E4
       osc1.frequency.exponentialRampToValueAtTime(880, now + 1.5); // A5

       osc2.type = "triangle";
       osc2.frequency.setValueAtTime(440, now);
       osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 1.5);

       gain.gain.setValueAtTime(0.08, now);
       gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
       gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

       osc1.connect(gain);
       osc2.connect(gain);
       gain.connect(this.ctx.destination);

       osc1.start(now);
       osc2.start(now);
       osc1.stop(now + 1.6);
       osc2.stop(now + 1.6);
     } catch {}
   }

   // Punchy rhythmic celebratory chime for Jukebox upvoting & DJ chart
   playJukeboxUpvote() {
     if (!this.enabled) return;
     try {
       this.initCtx();
       if (!this.ctx) return;

       const now = this.ctx.currentTime;
       const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
       notes.forEach((f, idx) => {
         const osc = this.ctx!.createOscillator();
         const gain = this.ctx!.createGain();
         const t = now + idx * 0.04;

         osc.type = "sine";
         osc.frequency.setValueAtTime(f, t);

         gain.gain.setValueAtTime(0.1, t);
         gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

         osc.connect(gain);
         gain.connect(this.ctx!.destination);

         osc.start(t);
         osc.stop(t + 0.35);
       });
     } catch {}
   }
}

export const soundFX = new SoundEngine();

