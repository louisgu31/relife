import { useEffect, useState } from 'react'
import { Sun, Moon, Sunrise, Sunset, Cloud, CloudRain, Wind } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export function PresenceIndicator() {
  const { presence, circadian } = useAppStore()
  const [bloom, setBloom] = useState(false)

  useEffect(() => {
    if (presence.motionLevel > 0.5) {
      setBloom(true)
      const t = setTimeout(() => setBloom(false), 600)
      return () => clearTimeout(t)
    }
  }, [presence.motionLevel])

  const getPhaseIcon = () => {
    switch (circadian.phase) {
      case 'morning': return <Sunrise className="w-5 h-5" />
      case 'day': return <Sun className="w-5 h-5" />
      case 'afternoon': return <Sun className="w-5 h-5" />
      case 'evening': return <Sunset className="w-5 h-5" />
      case 'night': return <Moon className="w-5 h-5" />
      case 'deepNight': return <Moon className="w-5 h-5" />
    }
  }

  const phaseLabels: Record<string, string> = {
    morning: '清晨',
    day: '白天',
    afternoon: '午后',
    evening: '傍晚',
    night: '夜间',
    deepNight: '深夜',
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={`w-3 h-3 rounded-full bg-presence transition-all duration-600 ${
            presence.isPresent
              ? bloom ? 'animate-ink-bloom' : 'animate-breathe-present'
              : 'animate-breathe'
          }`}
          style={!presence.isPresent ? { opacity: 0.3 } : undefined}
        />
      </div>
      <span className="text-ink-secondary text-sm font-serif">
        {presence.isPresent ? '在场' : '离开'}
      </span>
      <div className="w-px h-4 bg-paper-stain" />
      <div className="flex items-center gap-1.5 text-circadian">
        {getPhaseIcon()}
        <span className="text-ink-secondary text-sm font-serif">
          {phaseLabels[circadian.phase] || circadian.phase}
        </span>
      </div>
    </div>
  )
}

export function WeatherWidget() {
  const weather = {
    temp: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
  }

  return (
    <div className="flex items-center gap-4 text-ink-secondary">
      <div className="flex items-center gap-2">
        <Cloud className="w-5 h-5 text-paper-ink-faded" />
        <span className="text-2xl font-light font-serif text-ink">{weather.temp}°</span>
      </div>
      <div className="hidden md:flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <CloudRain className="w-4 h-4 text-paper-ink-faded" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-4 h-4 text-paper-ink-faded" />
          <span>{weather.wind} km/h</span>
        </div>
      </div>
    </div>
  )
}
