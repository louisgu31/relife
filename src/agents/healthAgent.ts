import { BaseAgent } from './base'
import type { HealthReading } from '../types'

export class HealthAgent extends BaseAgent {
  private readings: HealthReading[] = []
  private healthListeners: Set<(readings: HealthReading[]) => void> = new Set()
  private alertListeners: Set<(alert: HealthReading) => void> = new Set()
  private intervalId: number | null = null
  private videoEl: HTMLVideoElement | null = null
  private canvasEl: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private stream: MediaStream | null = null

  constructor() {
    super('health')
  }

  async start(monitoring = true) {
    this.setStatus('active', monitoring ? 'Health monitoring active' : 'Health agent idle')

    if (monitoring) {
      try {
        await this.initCamera()
      } catch (e) {
        console.warn('Health camera not available, using simulation')
        this.startSimulation()
      }
    } else {
      this.startSimulation()
    }
  }

  stop() {
    this.setStatus('idle')
    if (this.intervalId) clearInterval(this.intervalId)
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop())
      this.stream = null
    }
    this.videoEl = null
    this.canvasEl = null
    this.ctx = null
  }

  tick() {}

  subscribeHealth(listener: (readings: HealthReading[]) => void) {
    this.healthListeners.add(listener)
    return () => this.healthListeners.delete(listener)
  }

  subscribeAlerts(listener: (alert: HealthReading) => void) {
    this.alertListeners.add(listener)
    return () => this.alertListeners.delete(listener)
  }

  getReadings(): HealthReading[] {
    return [...this.readings]
  }

  getLatest(): HealthReading | null {
    return this.readings[this.readings.length - 1] || null
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
    this.canvasEl.width = 100
    this.canvasEl.height = 100
    this.ctx = this.canvasEl.getContext('2d', { willReadFrequently: true })

    this.monitorWithCamera()
  }

  private monitorWithCamera() {
    let lastBrightness = 0
    let beatTimes: number[] = []

    const sample = () => {
      if (!this.ctx || !this.videoEl || this.videoEl.readyState < 2) {
        requestAnimationFrame(sample)
        return
      }

      this.ctx.drawImage(this.videoEl, 30, 20, 60, 60, 0, 0, 100, 100)
      const data = this.ctx.getImageData(0, 0, 100, 100)

      let totalRed = 0
      for (let i = 0; i < data.data.length; i += 4) {
        totalRed += data.data[i]
      }
      const avgRed = totalRed / (data.data.length / 4)
      const brightnessChange = Math.abs(avgRed - lastBrightness)
      lastBrightness = avgRed

      const now = Date.now()
      if (brightnessChange > 1.5) {
        beatTimes.push(now)
      }

      beatTimes = beatTimes.filter((t) => now - t < 10000)
      const heartRate = (beatTimes.length / 10) * 60

      const reading: HealthReading = {
        timestamp: now,
        heartRate: heartRate > 40 && heartRate < 180 ? Math.round(heartRate) : undefined,
        posture: 'sitting',
        activity: brightnessChange > 5 ? 'moving' : 'still',
      }

      this.addReading(reading)
      requestAnimationFrame(sample)
    }

    sample()
  }

  private startSimulation() {
    this.intervalId = window.setInterval(() => {
      const now = Date.now()
      const baseHR = 70
      const variation = Math.sin(now / 5000) * 8 + Math.random() * 4

      const reading: HealthReading = {
        timestamp: now,
        heartRate: Math.round(baseHR + variation),
        breathingRate: Math.round(14 + Math.random() * 4),
        posture: 'sitting',
        activity: Math.random() > 0.9 ? 'moving' : 'still',
      }

      this.addReading(reading)
    }, 2000)
  }

  private addReading(reading: HealthReading) {
    this.readings.push(reading)
    if (this.readings.length > 1800) {
      this.readings = this.readings.slice(-1800)
    }

    if (reading.activity === 'fall') {
      this.setStatus('alert', 'Fall detected!')
      this.alertListeners.forEach((l) => l(reading))
    }

    if (reading.heartRate && (reading.heartRate < 50 || reading.heartRate > 120)) {
      this.setStatus('alert', `Heart rate anomaly: ${reading.heartRate} bpm`)
    }

    this.healthListeners.forEach((l) => l(this.readings))
  }

  triggerFallTest() {
    const reading: HealthReading = {
      timestamp: Date.now(),
      heartRate: 95,
      posture: 'lying',
      activity: 'fall',
    }
    this.addReading(reading)
  }
}
