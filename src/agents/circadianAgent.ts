import { BaseAgent } from './base'
import type { CircadianState } from '../types'

export class CircadianAgent extends BaseAgent {
  private circadianState: CircadianState = {
    phase: 'day',
    colorTemp: 6500,
    brightness: 1,
    focusScore: 0.8,
    sleepReadiness: 0.2,
  }
  private wakeHour = 7
  private sleepHour = 23
  private circadianListeners: Set<(state: CircadianState) => void> = new Set()
  private intervalId: number | null = null

  constructor() {
    super('circadian')
  }

  start() {
    this.setStatus('active', 'Circadian rhythm tracking active')
    this.update()
    this.intervalId = window.setInterval(() => this.update(), 60000)
  }

  stop() {
    this.setStatus('idle')
    if (this.intervalId) clearInterval(this.intervalId)
  }

  tick() {
    this.update()
  }

  subscribeCircadian(listener: (state: CircadianState) => void) {
    this.circadianListeners.add(listener)
    return () => this.circadianListeners.delete(listener)
  }

  getCircadian(): CircadianState {
    return { ...this.circadianState }
  }

  setSchedule(wakeHour: number, sleepHour: number) {
    this.wakeHour = wakeHour
    this.sleepHour = sleepHour
    this.update()
  }

  private update() {
    const now = new Date()
    const hour = now.getHours() + now.getMinutes() / 60

    const phase = this.determinePhase(hour)
    const colorTemp = this.calculateColorTemp(hour)
    const brightness = this.calculateBrightness(hour)
    const focusScore = this.calculateFocusScore(hour)
    const sleepReadiness = this.calculateSleepReadiness(hour)

    this.circadianState = {
      phase,
      colorTemp,
      brightness,
      focusScore,
      sleepReadiness,
    }

    this.notify()
  }

  private determinePhase(hour: number): CircadianState['phase'] {
    if (hour >= this.wakeHour && hour < this.wakeHour + 2) return 'morning'
    if (hour >= this.wakeHour + 2 && hour < 14) return 'day'
    if (hour >= 14 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < this.sleepHour - 1) return 'evening'
    if (hour >= this.sleepHour - 1 && hour < this.sleepHour + 1) return 'night'
    return 'deepNight'
  }

  private calculateColorTemp(hour: number): number {
    const wakeT = this.wakeHour
    const sleepT = this.sleepHour

    if (hour >= wakeT && hour <= wakeT + 1) {
      const t = (hour - wakeT) / 1
      return 3000 + t * 2500
    }
    if (hour >= wakeT + 1 && hour <= sleepT - 2) {
      return 6500
    }
    if (hour >= sleepT - 2 && hour <= sleepT) {
      const t = (hour - (sleepT - 2)) / 2
      return 6500 - t * 5000
    }
    return 1800
  }

  private calculateBrightness(hour: number): number {
    const wakeT = this.wakeHour
    const sleepT = this.sleepHour

    if (hour >= wakeT && hour <= wakeT + 1) {
      return 0.3 + ((hour - wakeT) / 1) * 0.7
    }
    if (hour >= wakeT + 1 && hour <= sleepT - 2) {
      return 1
    }
    if (hour >= sleepT - 2 && hour <= sleepT) {
      return 1 - ((hour - (sleepT - 2)) / 2) * 0.7
    }
    return 0.1
  }

  private calculateFocusScore(hour: number): number {
    const peak1 = 10
    const peak2 = 15
    const valley = 14

    const dist1 = Math.abs(hour - peak1)
    const dist2 = Math.abs(hour - peak2)
    const distValley = Math.abs(hour - valley)

    const score1 = Math.max(0, 1 - dist1 / 4)
    const score2 = Math.max(0, 1 - dist2 / 3)
    const valleyPenalty = Math.max(0, 0.3 - distValley / 2) * 0.3

    return Math.min(1, Math.max(0.3, score1 * 0.7 + score2 * 0.5 - valleyPenalty + 0.3))
  }

  private calculateSleepReadiness(hour: number): number {
    const sleepT = this.sleepHour
    const wakeT = this.wakeHour

    if (hour >= sleepT - 3 && hour <= sleepT) {
      return (hour - (sleepT - 3)) / 3
    }
    if (hour > sleepT || hour < wakeT) {
      return 0.9
    }
    if (hour >= wakeT && hour <= wakeT + 1) {
      return 0.7 - ((hour - wakeT) / 1) * 0.5
    }
    return 0.2
  }

  protected notify() {
    this.circadianListeners.forEach((l) => l(this.circadianState))
  }
}
