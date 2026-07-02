import { useState, useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { Sun, Moon, Sunrise, Sunset, Coffee, Battery, Zap, ChevronDown, ChevronUp } from 'lucide-react'

const phaseInfo = {
  morning: { icon: Sunrise, label: '清晨觉醒', desc: '身体正在苏醒，专注力逐渐汇聚', aiNote: '新的一天开始了 ☀' },
  day: { icon: Sun, label: '专注高峰', desc: '认知表现处于最佳状态', aiNote: '适合处理重要事务' },
  afternoon: { icon: Coffee, label: '午后低谷', desc: '能量自然回落', aiNote: '来杯茶吧，休息一下' },
  evening: { icon: Sunset, label: '渐入宁静', desc: '褪黑素开始分泌', aiNote: '放慢脚步，享受傍晚' },
  night: { icon: Moon, label: '入眠准备', desc: '调暗灯光，平复心绪', aiNote: '今晚早点休息吧' },
  deepNight: { icon: Battery, label: '深度休整', desc: '身体进入恢复模式', aiNote: '该睡觉了 🌙' },
}

export function CircadianWidget() {
  const { circadian } = useAppStore()
  const info = phaseInfo[circadian.phase]
  const Icon = info.icon

  return (
    <div className="ledger-card paper-texture p-4">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-circadian" />
            <h3 className="text-ink font-serif font-medium">{info.label}</h3>
          </div>
          <span className="text-xs text-ink-subtle font-sans">
            {Math.round(circadian.colorTemp)}K
          </span>
        </div>

        <p className="text-ink-secondary text-sm mb-4 font-serif">{info.desc}</p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-ink-subtle mb-1 font-sans">
              <span>专注力</span>
              <span>{Math.round(circadian.focusScore * 100)}%</span>
            </div>
            <div className="h-1.5 bg-paper-stain/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-circadian rounded-full transition-all duration-1000"
                style={{ width: `${circadian.focusScore * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-ink-subtle mb-1 font-sans">
              <span>入睡准备</span>
              <span>{Math.round(circadian.sleepReadiness * 100)}%</span>
            </div>
            <div className="h-1.5 bg-paper-stain/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-presence rounded-full transition-all duration-1000"
                style={{ width: `${circadian.sleepReadiness * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-ink-subtle mb-1 font-sans">
              <span>光照度</span>
              <span>{Math.round(circadian.brightness * 100)}%</span>
            </div>
            <div className="h-1.5 bg-paper-stain/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-health rounded-full transition-all duration-1000"
                style={{ width: `${circadian.brightness * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-paper-stain/30">
          <p className="font-hand text-circadian text-sm animate-margin-note">
            {info.aiNote}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FocusTimer() {
  const { settings, updateSettings } = useAppStore()
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [showDurations, setShowDurations] = useState(false)

  const focusOptions = [15, 25, 45, 60]
  const breakOptions = [5, 10, 15, 20]

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          const nextMode = mode === 'focus' ? 'break' : 'focus'
          setMode(nextMode)
          return nextMode === 'focus' ? settings.focusDuration * 60 : settings.breakDuration * 60
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning, mode, settings.focusDuration, settings.breakDuration])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const total = mode === 'focus' ? settings.focusDuration * 60 : settings.breakDuration * 60
  const progress = 1 - timeLeft / total

  const handleDurationChange = (minutes: number) => {
    if (mode === 'focus') {
      updateSettings({ focusDuration: minutes })
      if (!isRunning) {
        setTimeLeft(minutes * 60)
      }
    } else {
      updateSettings({ breakDuration: minutes })
      if (!isRunning) {
        setTimeLeft(minutes * 60)
      }
    }
    setShowDurations(false)
  }

  return (
    <div className="ledger-card paper-texture p-4">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-ink font-serif font-medium flex items-center gap-2">
            <Zap className="w-5 h-5 text-health" />
            专注时刻
          </h3>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs px-2 py-0.5 rounded font-sans ${
                mode === 'focus'
                  ? 'bg-health/15 text-health'
                  : 'bg-circadian/15 text-circadian'
              }`}
            >
              {mode === 'focus' ? '专注' : '休息'}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-4">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-paper-stain/30"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * progress}
              strokeLinecap="round"
              className={mode === 'focus' ? 'text-health' : 'text-circadian'}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-light text-ink font-serif tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-ink-subtle mt-1 font-hand">
              {mode === 'focus' ? '保持专注' : '深呼吸'}
            </span>
          </div>
        </div>

        {/* Duration selector */}
        <div className="mb-3">
          <button
            onClick={() => setShowDurations(!showDurations)}
            className="w-full flex items-center justify-center gap-1 text-xs text-ink-subtle hover:text-ink font-sans transition-colors py-1.5 rounded hover:bg-paper-fold/50"
          >
            <span>{mode === 'focus' ? `专注时长：${settings.focusDuration} 分钟` : `休息时长：${settings.breakDuration} 分钟`}</span>
            {showDurations ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {showDurations && (
            <div className="mt-2 flex gap-1.5 justify-center animate-fade-in">
              {(mode === 'focus' ? focusOptions : breakOptions).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDurationChange(d)}
                  className={`px-3 py-1 rounded text-xs font-sans transition-all ${
                    (mode === 'focus'
                      ? settings.focusDuration === d
                      : settings.breakDuration === d)
                      ? 'bg-health/15 text-health'
                      : 'bg-paper-fold/50 text-ink-subtle hover:bg-paper-fold'
                  }`}
                >
                  {d} 分钟
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-2 rounded text-sm font-sans font-medium transition-all ${
              isRunning
                ? 'bg-paper-fold text-ink-secondary hover:bg-paper-stain/30'
                : 'bg-health/15 text-health hover:bg-health/25'
            }`}
          >
            {isRunning ? '暂停' : '开始'}
          </button>
          <button
            onClick={() => {
              setTimeLeft(mode === 'focus' ? settings.focusDuration * 60 : settings.breakDuration * 60)
              setIsRunning(false)
            }}
            className="px-4 py-2 rounded text-sm font-sans text-ink-subtle hover:text-ink-secondary hover:bg-paper-fold transition-all"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  )
}

export function GreetingBanner() {
  const [greeting, setGreeting] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const { presence } = useAppStore()
  const [lastGreeted, setLastGreeted] = useState(0)

  useEffect(() => {
    const now = Date.now()
    if (presence.isPresent && presence.confidence > 0.7 && now - lastGreeted > 60000) {
      const hour = new Date().getHours()
      let g = ''
      if (hour >= 5 && hour < 9) g = '早安，新的一天开始了'
      else if (hour >= 9 && hour < 12) g = '专注时间到了'
      else if (hour >= 12 && hour < 14) g = '午餐时间，休息一下'
      else if (hour >= 14 && hour < 17) g = '午后，再坚持一下'
      else if (hour >= 17 && hour < 21) g = '辛苦了，今天也做得很棒'
      else g = '夜深了，早些休息'

      setGreeting(g)
      setVisible(true)
      setLastGreeted(now)

      const t = setTimeout(() => setVisible(false), 5000)
      return () => clearTimeout(t)
    }
  }, [presence.isPresent, presence.confidence])

  if (!visible || !greeting) return null

  return (
    <div className="fixed bottom-8 right-6 z-50 animate-margin-note">
      <div className="bg-paper/90 backdrop-blur-sm rounded px-4 py-2 border border-paper-stain/40 shadow-sm">
        <p className="font-hand text-circadian text-lg">
          {greeting}
        </p>
      </div>
    </div>
  )
}
