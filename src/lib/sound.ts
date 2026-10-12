// GTA Sound Manager — strictly plays ONLY the user-provided audio file (/gta_sound.mp3)
class SoundManager {
  private audioBuffer: AudioBuffer | null = null;
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private lastPlayTime: number = 0;
  private isPreloading: boolean = false;
  private htmlAudio: HTMLAudioElement | null = null;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gta_sfx_enabled");
      if (stored !== null) {
        this.enabled = stored === "true";
      }
      this.initMobileUnlockListeners();
      this.loadAudio();
    }
  }

  private initMobileUnlockListeners() {
    if (typeof window === "undefined") return;
    const unlockHandler = () => {
      this.unlock();
    };
    window.addEventListener("touchstart", unlockHandler, { capture: true, passive: true });
    window.addEventListener("touchend", unlockHandler, { capture: true, passive: true });
    window.addEventListener("pointerdown", unlockHandler, { capture: true, passive: true });
    window.addEventListener("click", unlockHandler, { capture: true, passive: true });
  }

  public unlock() {
    if (typeof window === "undefined" || this.isUnlocked) return;
    this.initCtx();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    // Prepare HTML5 Audio fallback for mobile environments
    if (!this.htmlAudio) {
      try {
        this.htmlAudio = new Audio("/gta_sound.mp3");
        this.htmlAudio.volume = 0.22;
        this.htmlAudio.preload = "auto";
        this.htmlAudio.load();
      } catch {}
    }
    this.isUnlocked = true;
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
      this.ctx.resume().catch(() => {});
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

    // If AudioBuffer is ready and context is running
    if (this.ctx && this.audioBuffer) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().then(() => {
          this.playBufferSource(volume);
        }).catch(() => {
          this.playHtmlAudioFallback(volume);
        });
        return;
      }
      this.playBufferSource(volume);
      return;
    }

    // Fallback: HTML Audio playback
    this.playHtmlAudioFallback(volume);
    this.loadAudio();
  }

  private playBufferSource(volume = 0.22) {
    if (!this.ctx || !this.audioBuffer) return;
    try {
      const source = this.ctx.createBufferSource();
      source.buffer = this.audioBuffer;
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      source.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      source.start(0);
    } catch {
      this.playHtmlAudioFallback(volume);
    }
  }

  private playHtmlAudioFallback(volume = 0.22) {
    try {
      const audio = new Audio("/gta_sound.mp3");
      audio.volume = volume;
      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } catch {}
  }

  // The ONLY active sound in the portfolio: plays your provided audio on button/cursor clicks
  public playClick() {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastPlayTime < 300) return;
    this.lastPlayTime = now;
    this.playSound(0.22);
  }

  // Completely silenced (all synthetic hover noises removed)
  public playHover() {}

  // Completely silenced (all synthetic milestone sounds removed)
  public playAchievement() {}
}

export const soundManager = new SoundManager();
