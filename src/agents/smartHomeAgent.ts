import { BaseAgent } from './base'
import type { SmartHomeState, SmartDevice, Mood, CircadianState, PresenceData } from '../types'

export class SmartHomeAgent extends BaseAgent {
  private smartHomeState: SmartHomeState = {
    devices: [
      { id: 'light-living', name: '客厅灯', type: 'light', on: true, brightness: 60, color: '#A4B494' },
      { id: 'light-desk', name: '台灯', type: 'light', on: true, brightness: 80, color: '#D0C9A6' },
      { id: 'ac-living', name: '空调', type: 'ac', on: false, temperature: 24 },
      { id: 'curtain-living', name: '窗帘', type: 'curtain', on: true },
    ],
    mood: 'calm',
    autoMode: true,
  }
  private smartHomeListeners: Set<(state: SmartHomeState) => void> = new Set()
  private intervalId: number | null = null

  constructor() {
    super('smarthome')
  }

  start() {
    this.setStatus('active', '智能家居代理已启动')
    this.intervalId = window.setInterval(() => this.tick(), 5000)
  }

  stop() {
    this.setStatus('idle')
    if (this.intervalId) clearInterval(this.intervalId)
  }

  tick() {
    // Periodically check if auto-adjustments are needed
    if (this.smartHomeState.autoMode) {
      this.notify()
    }
  }

  subscribeSmartHome(listener: (state: SmartHomeState) => void) {
    this.smartHomeListeners.add(listener)
    return () => this.smartHomeListeners.delete(listener)
  }

  getSmartHome(): SmartHomeState {
    return { ...this.smartHomeState, devices: [...this.smartHomeState.devices] }
  }

  getState(): import('../types').AgentState {
    return { ...this.agentState }
  }

  toggleDevice(deviceId: string) {
    this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
      d.id === deviceId ? { ...d, on: !d.on } : d
    )
    this.smartHomeState.lastAdjustedAt = Date.now()
    this.notify()
  }

  updateDevice(deviceId: string, updates: Partial<SmartDevice>) {
    this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
      d.id === deviceId ? { ...d, ...updates } : d
    )
    this.smartHomeState.lastAdjustedAt = Date.now()
    this.notify()
  }

  setMood(mood: Mood) {
    this.smartHomeState.mood = mood
    if (this.smartHomeState.autoMode) {
      this.autoAdjustForMood(mood)
    }
    this.notify()
  }

  setAutoMode(auto: boolean) {
    this.smartHomeState.autoMode = auto
    if (auto) {
      this.autoAdjustForMood(this.smartHomeState.mood)
    }
    this.notify()
  }

  processVoiceCommand(command: string): string {
    const cmd = command.toLowerCase().trim()
    this.smartHomeState.lastVoiceCommand = command
    this.smartHomeState.lastAdjustedAt = Date.now()

    // Light commands
    if (cmd.includes('开灯') || cmd.includes('turn on light') || cmd.includes('turn on the light')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'light' ? { ...d, on: true } : d
      )
      this.notify()
      return '灯光已打开'
    }
    if (cmd.includes('关灯') || cmd.includes('turn off light')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'light' ? { ...d, on: false } : d
      )
      this.notify()
      return '灯光已关闭'
    }

    // Brightness
    const brightnessMatch = cmd.match(/(\d+)\s*%/) || cmd.match(/亮度\s*(\d+)/) || cmd.match(/brightness\s*(\d+)/)
    if (brightnessMatch) {
      const val = Math.min(100, Math.max(0, parseInt(brightnessMatch[1])))
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'light' ? { ...d, brightness: val } : d
      )
      this.notify()
      return `亮度已调整为 ${val}%`
    }

    // Color
    if (cmd.includes('暖光') || cmd.includes('warm light') || cmd.includes('warm color')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'light' ? { ...d, color: '#D0C9A6' } : d
      )
      this.notify()
      return '灯光已切换为暖色'
    }
    if (cmd.includes('冷光') || cmd.includes('cool light') || cmd.includes('cool color')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'light' ? { ...d, color: '#7C9D96' } : d
      )
      this.notify()
      return '灯光已切换为冷色'
    }

    // AC
    if (cmd.includes('开空调') || cmd.includes('turn on ac') || cmd.includes('turn on the ac')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.id === 'ac-living' ? { ...d, on: true } : d
      )
      this.notify()
      return '空调已打开'
    }
    if (cmd.includes('关空调') || cmd.includes('turn off ac')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.id === 'ac-living' ? { ...d, on: false } : d
      )
      this.notify()
      return '空调已关闭'
    }
    const tempMatch = cmd.match(/温度\s*(\d+)/) || cmd.match(/(\d+)\s*度/) || cmd.match(/temperature\s*(\d+)/)
    if (tempMatch) {
      const val = Math.min(30, Math.max(16, parseInt(tempMatch[1])))
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'ac' ? { ...d, on: true, temperature: val } : d
      )
      this.notify()
      return `空调温度已设为 ${val}°C`
    }

    // Curtain
    if (cmd.includes('开窗帘') || cmd.includes('open curtain')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'curtain' ? { ...d, on: true } : d
      )
      this.notify()
      return '窗帘已打开'
    }
    if (cmd.includes('关窗帘') || cmd.includes('close curtain')) {
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) =>
        d.type === 'curtain' ? { ...d, on: false } : d
      )
      this.notify()
      return '窗帘已关闭'
    }

    // Mood-based
    if (cmd.includes('我累了') || cmd.includes('i am tired') || cmd.includes('i\'m tired')) {
      this.setMood('tired')
      this.notify()
      return '已为你调暗灯光、调高空调温度，好好休息'
    }
    if (cmd.includes('专注') || cmd.includes('focus')) {
      this.setMood('focused')
      this.notify()
      return '已调亮台灯、切换冷光、空调降温到 22°C'
    }

    this.notify()
    return '抱歉，我没有理解这个指令'
  }

  autoAdjustForCircadian(circadian: CircadianState) {
    if (!this.smartHomeState.autoMode) return

    const phase = circadian.phase
    this.smartHomeState.devices = this.smartHomeState.devices.map((d) => {
      if (d.type === 'light') {
        switch (phase) {
          case 'morning':
            return { ...d, on: true, brightness: 70, color: '#D0C9A6' }
          case 'day':
            return { ...d, on: true, brightness: 90, color: '#A4B494' }
          case 'afternoon':
            return { ...d, on: true, brightness: 75, color: '#D0C9A6' }
          case 'evening':
            return { ...d, on: true, brightness: 50, color: '#D0C9A6' }
          case 'night':
            return { ...d, on: true, brightness: 25, color: '#8C7A66' }
          case 'deepNight':
            return { ...d, on: false, brightness: 5, color: '#8C7A66' }
          default:
            return d
        }
      }
      return d
    })

    this.smartHomeState.lastAdjustedAt = Date.now()
    this.notify()
  }

  autoAdjustForPresence(presence: PresenceData) {
    if (!this.smartHomeState.autoMode) return

    if (!presence.isPresent) {
      // User left — turn off most things
      this.smartHomeState.devices = this.smartHomeState.devices.map((d) => {
        if (d.type === 'light') return { ...d, on: false }
        if (d.type === 'ac') return { ...d, on: false }
        return d
      })
    }
    this.notify()
  }

  private autoAdjustForMood(mood: Mood) {
    this.smartHomeState.devices = this.smartHomeState.devices.map((d) => {
      switch (mood) {
        case 'tired':
          if (d.type === 'light') return { ...d, on: true, brightness: 20, color: '#8C7A66' }
          if (d.type === 'ac') return { ...d, on: true, temperature: 26 }
          return d
        case 'focused':
          if (d.id === 'light-desk') return { ...d, on: true, brightness: 95, color: '#7C9D96' }
          if (d.id === 'light-living') return { ...d, on: false }
          if (d.type === 'ac') return { ...d, on: true, temperature: 22 }
          if (d.type === 'curtain') return { ...d, on: true }
          return d
        case 'energized':
          if (d.type === 'light') return { ...d, on: true, brightness: 85, color: '#A4B494' }
          if (d.type === 'ac') return { ...d, on: true, temperature: 23 }
          return d
        case 'stressed':
          if (d.type === 'light') return { ...d, on: true, brightness: 40, color: '#D0C9A6' }
          if (d.type === 'ac') return { ...d, on: true, temperature: 25 }
          return d
        case 'calm':
          if (d.type === 'light') return { ...d, on: true, brightness: 60, color: '#A4B494' }
          return d
        default:
          return d
      }
    })
    this.smartHomeState.lastAdjustedAt = Date.now()
  }

  protected notify() {
    this.smartHomeListeners.forEach((l) => l(this.smartHomeState))
  }
}
