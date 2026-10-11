// GTA Sound Manager — strictly plays ONLY the user-provided audio file (/gta_sound.mp3)
class SoundManager {
  private audioBuffer: AudioBuffer | null = null;
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private lastPlayTime: number = 0;
  private isPreloading: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gta_sfx_enabled");
      if (stored !== null) {
        this.enabled = stored === "true";
      }
      this.loadAudio();
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private async loadAudio() {
    if (this.audioBuffer || this.isPreloading || typeof window === "undefined") return;
    this.isPreloading = true;
    try {
      this.initCtx();
      const response = await fetch("/gta_sound.mp3");
      const arrayBuffer = await response.arrayBuffer();
      if (this.ctx) {
        this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      }
    } catch {
      // Fetch or decode failed
    } finally {
      this.isPreloading = false;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("gta_sfx_enabled", String(this.enabled));
    }
    return this.enabled;
  }

  // Play ONLY the authentic user-provided audio file
  private playSound(volume = 0.22) {
    if (!this.enabled || typeof window === "undefined") return;
    this.initCtx();

    if (!this.audioBuffer) {
      const fallbackAudio = new Audio("/gta_sound.mp3");
      fallbackAudio.volume = volume;
      fallbackAudio.play().catch(() => {});
      this.loadAudio();
      return;
    }

    if (!this.ctx) return;
    try {
      const source = this.ctx.createBufferSource();
      source.buffer = this.audioBuffer;
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      source.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      source.start(0);
    } catch {
      // Audio play error
    }
  }

  // The ONLY active sound in the portfolio: plays your provided audio on button/cursor clicks
  public playClick() {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastPlayTime < 60) return;
    this.lastPlayTime = now;
    this.playSound(0.22);
  }

  // Completely silenced (all synthetic hover noises removed)
  public playHover() {
    // Disabled per user request
  }

  // Completely silenced (all synthetic milestone sounds removed)
  public playAchievement() {
    // Disabled per user request
  }
}

export const soundManager = new SoundManager();
