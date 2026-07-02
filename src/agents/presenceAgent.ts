import { BaseAgent } from './base'
import type { PresenceData } from '../types'

export class PresenceAgent extends BaseAgent {
  private videoEl: HTMLVideoElement | null = null
  private canvasEl: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private stream: MediaStream | null = null
  private animationId: number | null = null
  private lastFrameData: ImageData | null = null
  private presenceData: PresenceData = {
    isPresent: false,
    confidence: 0,
    lastDetected: 0,
    motionLevel: 0,
  }
  private presenceListeners: Set<(data: PresenceData) => void> = new Set()
  private useFallback = false

  constructor() {
    super('presence')
  }

  async start() {
    this.setStatus('active', 'Presence detection active')
    this.useFallback = true
    this.startFallbackDetection()
  }

  async enableCamera() {
    try {
      await this.initCamera()
      this.useFallback = false
      return true
    } catch (e) {
      console.warn('Camera not available:', e)
      return false
    }
  }

  stop() {
    this.setStatus('idle')
    if (this.animationId) cancelAnimationFrame(this.animationId)
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop())
      this.stream = null
    }
    this.videoEl = null
    this.canvasEl = null
    this.ctx = null
  }

  tick() {}

  subscribePresence(listener: (data: PresenceData) => void) {
    this.presenceListeners.add(listener)
    return () => this.presenceListeners.delete(listener)
  }

  getPresence(): PresenceData {
    return { ...this.presenceData }
  }

  private async initCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: 320, height: 240 },
      audio: false,
    })

    this.videoEl = document.createElement('video')
    this.videoEl.srcObject = this.stream
    this.videoEl.playsInline = true
    this.videoEl.muted = true
    await this.videoEl.play()

    this.canvasEl = document.createElement('canvas')
    this.canvasEl.width = 160
    this.canvasEl.height = 120
    this.ctx = this.canvasEl.getContext('2d', { willReadFrequently: true })

    this.detectMotion()
    this.setStatus('active', 'Camera-based presence detection active')
  }

  private startFallbackDetection() {
    const detect = () => {
      const timeSinceActivity = Date.now() - this.presenceData.lastDetected
      const isPresent = timeSinceActivity < 30000

      this.presenceData = {
        ...this.presenceData,
        isPresent,
        motionLevel: isPresent ? 0.3 : 0,
        confidence: isPresent ? 0.6 : 0.4,
      }

      this.notifyPresence()
      setTimeout(detect, 2000)
    }

    document.addEventListener('touchstart', () => this.touchActivity())
    document.addEventListener('mousemove', () => this.touchActivity())
    document.addEventListener('keydown', () => this.touchActivity())

    detect()
    this.setStatus('active', 'Motion-based presence detection active')
  }

  private touchActivity() {
    if (this.useFallback) {
      this.presenceData.lastDetected = Date.now()
    }
  }

  private detectMotion = () => {
    if (!this.ctx || !this.videoEl || this.videoEl.readyState < 2) {
      this.animationId = requestAnimationFrame(this.detectMotion)
      return
    }

    this.ctx.drawImage(this.videoEl, 0, 0, 160, 120)
    const frameData = this.ctx.getImageData(0, 0, 160, 120)

    let motionPixels = 0
    const totalPixels = 160 * 120

    if (this.lastFrameData) {
      for (let i = 0; i < frameData.data.length; i += 4 * 8) {
        const diff =
          Math.abs(frameData.data[i] - this.lastFrameData.data[i]) +
          Math.abs(frameData.data[i + 1] - this.lastFrameData.data[i + 1]) +
          Math.abs(frameData.data[i + 2] - this.lastFrameData.data[i + 2])

        if (diff > 60) motionPixels++
      }
    }

    this.lastFrameData = frameData
    const motionRatio = motionPixels / (totalPixels / 8)
    const now = Date.now()

    const hasMotion = motionRatio > 0.015
    if (hasMotion) {
      this.presenceData.lastDetected = now
    }

    const timeSinceDetected = now - this.presenceData.lastDetected
    const isPresent = timeSinceDetected < 15000

    this.presenceData = {
      isPresent,
      confidence: isPresent ? Math.min(0.95, 0.5 + motionRatio * 10) : Math.max(0.1, 0.5 - timeSinceDetected / 30000),
      lastDetected: this.presenceData.lastDetected,
      motionLevel: Math.min(1, motionRatio * 20),
    }

    this.notifyPresence()
    this.animationId = requestAnimationFrame(this.detectMotion)
  }

  private notifyPresence() {
    this.presenceListeners.forEach((l) => l(this.presenceData))
  }
}
