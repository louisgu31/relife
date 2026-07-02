import { BaseAgent } from './base'
import type { ContextEvent, AppSettings, CircadianState, PresenceData } from '../types'

export class ContextAgent extends BaseAgent {
  private events: ContextEvent[] = []
  private settings: AppSettings
  private eventListeners: Set<(events: ContextEvent[]) => void> = new Set()
  private greetingListeners: Set<(greeting: string) => void> = new Set()
  private intervalId: number | null = null

  constructor(settings: AppSettings) {
    super('context')
    this.settings = settings
  }

  start() {
    this.setStatus('active', 'Context agent monitoring your day')
    this.updateContext()
    this.intervalId = window.setInterval(() => this.updateContext(), 30000)
  }

  stop() {
    this.setStatus('idle')
    if (this.intervalId) clearInterval(this.intervalId)
  }

  tick() {
    this.updateContext()
  }

  subscribeEvents(listener: (events: ContextEvent[]) => void) {
    this.eventListeners.add(listener)
    return () => this.eventListeners.delete(listener)
  }

  subscribeGreeting(listener: (greeting: string) => void) {
    this.greetingListeners.add(listener)
    return () => this.greetingListeners.delete(listener)
  }

  getEvents(): ContextEvent[] {
    return [...this.events]
  }

  updatePresence(presence: PresenceData) {
    if (presence.isPresent && presence.confidence > 0.7) {
      this.generateGreeting()
    }
  }

  updateCircadian(circadian: CircadianState) {
    if (circadian.phase === 'evening' && circadian.sleepReadiness > 0.7) {
      this.addEvent({
        id: 'sleep-soon',
        type: 'reminder',
        title: 'Wind down time approaching',
        detail: 'Try dimming the lights and avoiding screens to improve sleep quality.',
        time: Date.now(),
        priority: 'low',
      })
    }
  }

  private updateContext() {
    const now = new Date()
    const hour = now.getHours()

    this.events = this.events.filter((e) => Date.now() - e.time < 3600000)

    if (hour === 9 && this.events.every((e) => e.id !== 'morning-checkin')) {
      this.addEvent({
        id: 'morning-checkin',
        type: 'greeting',
        title: `Good morning, ${this.settings.userName}`,
        detail: 'You have a productive day ahead. Focus score is at its peak.',
        time: Date.now(),
        priority: 'low',
      })
      this.generateGreeting()
    }

    if (hour === 12 && this.events.every((e) => e.id !== 'lunch-reminder')) {
      this.addEvent({
        id: 'lunch-reminder',
        type: 'reminder',
        title: 'Lunch time',
        detail: 'Remember to take a break and stretch your legs.',
        time: Date.now(),
        priority: 'medium',
      })
    }

    if (hour === 15 && this.events.every((e) => e.id !== 'afternoon-dip')) {
      this.addEvent({
        id: 'afternoon-dip',
        type: 'health',
        title: 'Afternoon focus dip',
        detail: 'Your circadian rhythm dips now. A short walk can help re-energize.',
        time: Date.now(),
        priority: 'low',
      })
    }

    this.notify()
  }

  private generateGreeting() {
    const hour = new Date().getHours()
    const greetings = {
      morning: [
        `Good morning, ${this.settings.userName}. Ready for a great day?`,
        `Rise and shine! Your focus will peak in about 2 hours.`,
        `Welcome back. Coffee first, then conquer the day.`,
      ],
      day: [
        `Hello there. You're in your prime focus window.`,
        `Hey! Making good progress?`,
        `Nice to see you. Keep up the momentum.`,
      ],
      afternoon: [
        `Good afternoon. Feeling that post-lunch slump?`,
        `Hey there. A short walk might help right about now.`,
        `Afternoon check-in. How's the day going?`,
      ],
      evening: [
        `Good evening. Winding down?`,
        `Hey. Your sleep readiness is building.`,
        `Evening. Nice work today.`,
      ],
      night: [
        `Still up? Your body wants sleep.`,
        `Late night session? Consider wrapping up soon.`,
        `You're burning the midnight oil.`,
      ],
      deepNight: [
        `It's very late. Rest is important.`,
        `...shouldn't you be sleeping?`,
      ],
    }

    let phase: keyof typeof greetings = 'day'
    if (hour >= 5 && hour < 9) phase = 'morning'
    else if (hour >= 9 && hour < 14) phase = 'day'
    else if (hour >= 14 && hour < 17) phase = 'afternoon'
    else if (hour >= 17 && hour < 21) phase = 'evening'
    else if (hour >= 21 && hour < 24) phase = 'night'
    else phase = 'deepNight'

    const list = greetings[phase]
    const greeting = list[Math.floor(Math.random() * list.length)]
    this.greetingListeners.forEach((l) => l(greeting))
  }

  private addEvent(event: ContextEvent) {
    if (this.events.some((e) => e.id === event.id)) return
    this.events.push(event)
    this.events.sort((a, b) => b.time - a.time)
    this.notify()
  }

  protected notify() {
    this.eventListeners.forEach((l) => l(this.events))
  }
}
