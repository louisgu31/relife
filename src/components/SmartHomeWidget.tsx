import { useState } from 'react'
import { Lightbulb, AirVent, Blinds, Mic, Sparkles, Power } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { Mood } from '../types'

const moodLabels: Record<Mood, string> = {
  calm: '平静',
  focused: '专注',
  tired: '疲倦',
  energized: '活力',
  stressed: '紧张',
  unknown: '未知',
}

export function SmartHomeWidget() {
  const { smartHome, toggleDevice, updateDevice, setMood, setAutoMode, setVoiceCommand } = useAppStore()
  const [voiceInput, setVoiceInput] = useState('')
  const [voiceResponse, setVoiceResponse] = useState('')
  const [showVoiceHint, setShowVoiceHint] = useState(false)

  const handleVoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!voiceInput.trim()) return
    setVoiceCommand(voiceInput)

    // Simple local command processing for demo
    const cmd = voiceInput.toLowerCase().trim()
    let response = ''

    if (cmd.includes('开灯') || cmd.includes('turn on light')) {
      smartHome.devices.forEach((d) => { if (d.type === 'light') updateDevice(d.id, { on: true }) })
      response = '灯光已打开'
    } else if (cmd.includes('关灯') || cmd.includes('turn off light')) {
      smartHome.devices.forEach((d) => { if (d.type === 'light') updateDevice(d.id, { on: false }) })
      response = '灯光已关闭'
    } else if (cmd.includes('开空调') || cmd.includes('turn on ac')) {
      updateDevice('ac-living', { on: true })
      response = '空调已打开'
    } else if (cmd.includes('关空调') || cmd.includes('turn off ac')) {
      updateDevice('ac-living', { on: false })
      response = '空调已关闭'
    } else if (cmd.includes('暖光') || cmd.includes('warm')) {
      smartHome.devices.forEach((d) => { if (d.type === 'light') updateDevice(d.id, { color: '#D0C9A6' }) })
      response = '灯光已切换为暖色'
    } else if (cmd.includes('冷光') || cmd.includes('cool')) {
      smartHome.devices.forEach((d) => { if (d.type === 'light') updateDevice(d.id, { color: '#7C9D96' }) })
      response = '灯光已切换为冷色'
    } else if (cmd.includes('我累了') || cmd.includes('tired')) {
      setMood('tired')
      response = '已为你调暗灯光、调高空调温度，好好休息'
    } else if (cmd.includes('专注') || cmd.includes('focus')) {
      setMood('focused')
      response = '已调亮台灯、切换冷光、空调降温到 22°C'
    } else if (cmd.includes('开窗帘') || cmd.includes('open curtain')) {
      updateDevice('curtain-living', { on: true })
      response = '窗帘已打开'
    } else if (cmd.includes('关窗帘') || cmd.includes('close curtain')) {
      updateDevice('curtain-living', { on: false })
      response = '窗帘已关闭'
    } else {
      response = '抱歉，我没有理解这个指令。试试：开灯、关空调、暖光、专注'
    }

    setVoiceResponse(response)
    setVoiceInput('')
    setShowVoiceHint(true)
    setTimeout(() => setShowVoiceHint(false), 4000)
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'light': return <Lightbulb className="w-4 h-4" />
      case 'ac': return <AirVent className="w-4 h-4" />
      case 'curtain': return <Blinds className="w-4 h-4" />
      default: return <Power className="w-4 h-4" />
    }
  }

  const handleMoodSelect = (mood: Mood) => {
    setMood(mood)
    // Apply mood-based adjustments directly
    const devices = smartHome.devices.map((d) => {
      switch (mood) {
        case 'tired':
          if (d.type === 'light') return { ...d, on: true, brightness: 20, color: '#8C7A66' }
          if (d.type === 'ac') return { ...d, on: true, temperature: 26 }
          return d
        case 'focused':
          if (d.id === 'light-desk') return { ...d, on: true, brightness: 95, color: '#7C9D96' }
          if (d.id === 'light-living') return { ...d, on: false }
          if (d.type === 'ac') return { ...d, on: true, temperature: 22 }
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
    devices.forEach((d) => {
      const original = smartHome.devices.find((orig) => orig.id === d.id)
      if (original && JSON.stringify(original) !== JSON.stringify(d)) {
        updateDevice(d.id, d)
      }
    })
  }

  const moods: Mood[] = ['calm', 'focused', 'tired', 'energized', 'stressed']

  return (
    <div className="ledger-card paper-texture p-5" style={{ transform: 'rotate(0.3deg)' }}>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-circadian" />
            <h3 className="text-sm font-serif font-semibold text-ink">智能家居</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-sans text-ink-subtle">自动</span>
            <button
              onClick={() => setAutoMode(!smartHome.autoMode)}
              className={`relative w-8 h-4 rounded-full transition-all ${
                smartHome.autoMode ? 'bg-presence' : 'bg-paper-stain/50'
              }`}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-paper shadow-sm transition-all ${
                  smartHome.autoMode ? 'left-4' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Current mood */}
        <div className="mb-3">
          <p className="text-xs text-ink-subtle font-serif mb-1.5">当前情绪</p>
          <div className="flex gap-1.5 flex-wrap">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => handleMoodSelect(m)}
                className={`px-2.5 py-1 rounded text-xs font-serif transition-all ${
                  smartHome.mood === m
                    ? 'bg-circadian/20 text-ink border border-circadian/40'
                    : 'bg-paper-fold/50 text-ink-subtle border border-paper-stain/20 hover:bg-paper-fold'
                }`}
              >
                {moodLabels[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="space-y-2 mb-3">
          {smartHome.devices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-2 rounded bg-paper-fold/30 border border-paper-stain/20"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded flex items-center justify-center ${
                    device.on ? 'text-presence bg-presence/10' : 'text-ink-subtle bg-paper-stain/10'
                  }`}
                >
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <p className="text-xs font-serif text-ink">{device.name}</p>
                  <p className="text-[10px] font-sans text-ink-subtle">
                    {device.type === 'light' && device.on && `${device.brightness}% · ${device.color}`}
                    {device.type === 'ac' && device.on && `${device.temperature}°C`}
                    {device.type === 'curtain' && (device.on ? '打开' : '关闭')}
                    {device.type === 'light' && !device.on && '关闭'}
                    {device.type === 'ac' && !device.on && '关闭'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {device.type === 'light' && device.on && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={device.brightness ?? 0}
                    onChange={(e) => updateDevice(device.id, { brightness: parseInt(e.target.value) })}
                    className="w-12 h-1 accent-presence"
                  />
                )}
                {device.type === 'ac' && device.on && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateDevice(device.id, { temperature: Math.max(16, (device.temperature ?? 24) - 1) })}
                      className="w-4 h-4 rounded bg-paper-stain/30 text-ink text-[10px] flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-[10px] font-sans text-ink w-5 text-center">{device.temperature}</span>
                    <button
                      onClick={() => updateDevice(device.id, { temperature: Math.min(30, (device.temperature ?? 24) + 1) })}
                      className="w-4 h-4 rounded bg-paper-stain/30 text-ink text-[10px] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                )}
                {device.type === 'light' && device.on && (
                  <div className="flex gap-0.5">
                    {['#D0C9A6', '#A4B494', '#7C9D96', '#8C7A66'].map((c) => (
                      <button
                        key={c}
                        onClick={() => updateDevice(device.id, { color: c })}
                        className={`w-3 h-3 rounded-full border ${
                          device.color === c ? 'border-ink' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => toggleDevice(device.id)}
                  className={`w-8 h-4 rounded-full transition-all ${
                    device.on ? 'bg-presence' : 'bg-paper-stain/50'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full bg-paper shadow-sm transition-all ${
                      device.on ? 'ml-auto mr-0.5' : 'ml-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Voice command */}
        <form onSubmit={handleVoiceSubmit} className="flex gap-1.5">
          <div className="flex-1 relative">
            <Mic className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-ink-subtle" />
            <input
              type="text"
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              placeholder="说话试试：开灯、关空调、暖光…"
              className="w-full pl-7 pr-2 py-1.5 text-xs font-serif bg-paper-fold/50 border border-paper-stain/30 rounded text-ink placeholder:text-ink-subtle focus:outline-none focus:border-circadian"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-ink text-paper rounded text-xs font-sans hover:bg-ink-secondary transition-colors"
          >
            发送
          </button>
        </form>

        {/* Voice response */}
        {showVoiceHint && voiceResponse && (
          <div className="mt-2 animate-margin-note">
            <p className="font-hand text-circadian text-sm leading-relaxed">
              {voiceResponse}
            </p>
          </div>
        )}

        {/* AI margin note */}
        {smartHome.lastAdjustedAt && Date.now() - smartHome.lastAdjustedAt < 30000 && (
          <div className="mt-2 animate-margin-note">
            <p className="font-hand text-circadian text-xs leading-relaxed">
              {smartHome.mood === 'tired' && '灯光已调暗，温度已调高，好好休息吧。'}
              {smartHome.mood === 'focused' && '台灯已调亮，冷光模式，空调 22°C，专注模式启动。'}
              {smartHome.mood === 'energized' && '灯光调亮，空气清凉，活力满满。'}
              {smartHome.mood === 'stressed' && '灯光变柔和了，深呼吸，一切都会好的。'}
              {smartHome.mood === 'calm' && '一切就绪，安静地陪伴你。'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
