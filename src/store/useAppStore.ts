import { create } from 'zustand'
import type { AppState, AppSettings, HealthReading, SmartHomeState, SmartDevice, Mood } from '../types'

const defaultSettings: AppSettings = {
  userName: 'Friend',
  wakeTime: '07:00',
  sleepTime: '23:00',
  location: 'Local',
  focusDuration: 25,
  breakDuration: 5,
  healthMonitoring: true,
  voiceEnabled: false,
  hapticsEnabled: true,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
}

const defaultDevices: SmartDevice[] = [
  { id: 'light-living', name: '客厅灯', type: 'light', on: true, brightness: 60, color: '#A4B494' },
  { id: 'light-desk', name: '台灯', type: 'light', on: true, brightness: 80, color: '#D0C9A6' },
  { id: 'ac-living', name: '空调', type: 'ac', on: false, temperature: 24 },
  { id: 'curtain-living', name: '窗帘', type: 'curtain', on: true },
]

const defaultSmartHome: SmartHomeState = {
  devices: defaultDevices,
  mood: 'calm',
  autoMode: true,
}

const defaultState: AppState = {
  presence: {
    isPresent: true,
    confidence: 0.5,
    lastDetected: Date.now(),
    motionLevel: 0,
  },
  health: [],
  circadian: {
    phase: 'day',
    colorTemp: 6500,
    brightness: 1,
    focusScore: 0.8,
    sleepReadiness: 0.2,
  },
  contextEvents: [],
  smartHome: defaultSmartHome,
  agents: {},
  settings: defaultSettings,
}

export const useAppStore = create<AppState & {
  setPresence: (presence: AppState['presence']) => void
  setHealth: (health: HealthReading[]) => void
  setCircadian: (circadian: AppState['circadian']) => void
  setContextEvents: (events: AppState['contextEvents']) => void
  setSmartHome: (smartHome: SmartHomeState) => void
  setSmartHomeDevices: (devices: SmartDevice[]) => void
  setMood: (mood: Mood) => void
  toggleDevice: (deviceId: string) => void
  updateDevice: (deviceId: string, updates: Partial<SmartDevice>) => void
  setAutoMode: (auto: boolean) => void
  setVoiceCommand: (cmd: string) => void
  setAgents: (agents: AppState['agents']) => void
  updateSettings: (settings: Partial<AppSettings>) => void
}>((set) => ({
  ...defaultState,

  setPresence: (presence) => set({ presence }),
  setHealth: (health) => set({ health }),
  setCircadian: (circadian) => set({ circadian }),
  setContextEvents: (contextEvents) => set({ contextEvents }),
  setSmartHome: (smartHome) => set({ smartHome }),
  setSmartHomeDevices: (devices) => set((s) => ({ smartHome: { ...s.smartHome, devices } })),
  setMood: (mood) => set((s) => ({ smartHome: { ...s.smartHome, mood } })),
  toggleDevice: (deviceId) => set((s) => ({
    smartHome: {
      ...s.smartHome,
      devices: s.smartHome.devices.map((d) => d.id === deviceId ? { ...d, on: !d.on } : d),
      lastAdjustedAt: Date.now(),
    },
  })),
  updateDevice: (deviceId, updates) => set((s) => ({
    smartHome: {
      ...s.smartHome,
      devices: s.smartHome.devices.map((d) => d.id === deviceId ? { ...d, ...updates } : d),
      lastAdjustedAt: Date.now(),
    },
  })),
  setAutoMode: (auto) => set((s) => ({ smartHome: { ...s.smartHome, autoMode: auto } })),
  setVoiceCommand: (cmd) => set((s) => ({ smartHome: { ...s.smartHome, lastVoiceCommand: cmd, lastAdjustedAt: Date.now() } })),
  setAgents: (agents) => set({ agents }),
  updateSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
}))
