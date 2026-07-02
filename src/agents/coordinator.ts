import { PresenceAgent } from './presenceAgent'
import { CircadianAgent } from './circadianAgent'
import { HealthAgent } from './healthAgent'
import { ContextAgent } from './contextAgent'
import { SmartHomeAgent } from './smartHomeAgent'
import type { AppSettings, PresenceData, CircadianState, HealthReading, ContextEvent, AgentState, SmartHomeState } from '../types'

export class AgentCoordinator {
  presence: PresenceAgent
  circadian: CircadianAgent
  health: HealthAgent
  context: ContextAgent
  smartHome: SmartHomeAgent
  private settings: AppSettings
  private started = false

  constructor(settings: AppSettings) {
    this.settings = settings
    this.presence = new PresenceAgent()
    this.circadian = new CircadianAgent()
    this.health = new HealthAgent()
    this.context = new ContextAgent(settings)
    this.smartHome = new SmartHomeAgent()
  }

  async start() {
    if (this.started) return
    this.started = true

    this.circadian.start()
    this.context.start()
    this.smartHome.start()

    this.circadian.subscribeCircadian((state: CircadianState) => {
      this.context.updateCircadian(state)
      this.smartHome.autoAdjustForCircadian(state)
    })

    this.presence.subscribePresence((data: PresenceData) => {
      this.context.updatePresence(data)
      this.smartHome.autoAdjustForPresence(data)
    })

    try {
      await this.presence.start()
    } catch (e) {
      console.warn('Presence agent failed to start:', e)
    }

    try {
      await this.health.start(this.settings.healthMonitoring)
    } catch (e) {
      console.warn('Health agent failed to start:', e)
    }
  }

  stop() {
    this.started = false
    this.presence.stop()
    this.circadian.stop()
    this.health.stop()
    this.context.stop()
    this.smartHome.stop()
  }

  getAllAgentStates(): Record<string, AgentState> {
    return {
      presence: this.presence.getState(),
      circadian: this.circadian.getState(),
      health: this.health.getState(),
      context: this.context.getState(),
      smarthome: this.smartHome.getState(),
    }
  }

  getPresence(): PresenceData {
    return this.presence.getPresence()
  }

  getCircadian(): CircadianState {
    return this.circadian.getCircadian()
  }

  getHealth(): HealthReading[] {
    return this.health.getReadings()
  }

  getEvents(): ContextEvent[] {
    return this.context.getEvents()
  }

  getSmartHome(): SmartHomeState {
    return this.smartHome.getSmartHome()
  }

  updateSettings(settings: AppSettings) {
    this.settings = settings
    this.circadian.setSchedule(
      parseInt(settings.wakeTime.split(':')[0]),
      parseInt(settings.sleepTime.split(':')[0]),
    )
  }
}
