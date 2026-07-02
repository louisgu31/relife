export interface AgentState {
  name: string
  status: 'idle' | 'active' | 'alert' | 'resting'
  lastActivity: number
  message?: string
}

export interface PresenceData {
  isPresent: boolean
  confidence: number
  lastDetected: number
  motionLevel: number
}

export interface HealthReading {
  timestamp: number
  heartRate?: number
  breathingRate?: number
  posture: 'sitting' | 'standing' | 'lying' | 'unknown'
  activity: 'still' | 'moving' | 'exercising' | 'fall' | 'unknown'
}

export interface CircadianState {
  phase: 'morning' | 'day' | 'afternoon' | 'evening' | 'night' | 'deepNight'
  colorTemp: number
  brightness: number
  focusScore: number
  sleepReadiness: number
}

export interface ContextEvent {
  id: string
  type: 'meeting' | 'reminder' | 'weather' | 'health' | 'greeting'
  title: string
  detail?: string
  time: number
  priority: 'low' | 'medium' | 'high'
}

export type Mood = 'calm' | 'focused' | 'tired' | 'energized' | 'stressed' | 'unknown'

export interface SmartDevice {
  id: string
  name: string
  type: 'light' | 'ac' | 'curtain' | 'speaker'
  on: boolean
  brightness?: number
  color?: string
  temperature?: number
}

export interface SmartHomeState {
  devices: SmartDevice[]
  mood: Mood
  autoMode: boolean
  lastVoiceCommand?: string
  lastAdjustedAt?: number
}

export interface AppState {
  presence: PresenceData
  health: HealthReading[]
  circadian: CircadianState
  contextEvents: ContextEvent[]
  smartHome: SmartHomeState
  agents: Record<string, AgentState>
  settings: AppSettings
}

export interface AppSettings {
  userName: string
  wakeTime: string
  sleepTime: string
  location: string
  focusDuration: number
  breakDuration: number
  healthMonitoring: boolean
  voiceEnabled: boolean
  hapticsEnabled: boolean
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
}

export type AgentType = 'presence' | 'context' | 'health' | 'circadian' | 'smarthome'
