import { useState, useEffect } from 'react'
import { ResponsiveContainer, Area, AreaChart } from 'recharts'
import { useAppStore } from '../store/useAppStore'
import { Heart, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

export function HealthWidget() {
  const { health, settings } = useAppStore()
  const [showAlert, setShowAlert] = useState(false)

  const latest = health[health.length - 1]
  const recentData = health.slice(-60).map((h, i) => ({
    index: i,
    hr: h.heartRate || 0,
  }))

  useEffect(() => {
    const latestFall = health.find((h) => h.activity === 'fall')
    if (latestFall) {
      setShowAlert(true)
      const t = setTimeout(() => setShowAlert(false), 8000)
      return () => clearTimeout(t)
    }
  }, [health])

  return (
    <div className="ledger-card paper-texture p-4">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-health" />
            <h3 className="text-ink font-serif font-medium">健康</h3>
          </div>
          {settings.healthMonitoring && latest ? (
            <span className="flex items-center gap-1 text-xs text-circadian font-sans">
              <CheckCircle className="w-3 h-3" />
              监测中
            </span>
          ) : (
            <span className="text-xs text-ink-subtle font-sans">待机</span>
          )}
        </div>

        {showAlert && (
          <div className="mb-4 p-3 bg-alert/20 border border-alert/40 rounded flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-health flex-shrink-0" />
            <div>
              <p className="font-hand text-ink text-sm">检测到跌倒</p>
              <p className="font-hand text-ink-subtle text-xs">紧急联系人将被通知</p>
            </div>
          </div>
        )}

        {latest?.heartRate ? (
          <div className="flex items-baseline gap-2 mb-3">
            <Heart className="w-4 h-4 text-health" />
            <span className="text-3xl font-light text-ink font-serif">
              {latest.heartRate}
            </span>
            <span className="text-ink-subtle text-sm font-sans">bpm</span>
          </div>
        ) : (
          <div className="text-ink-subtle text-sm mb-3 font-serif">心率数据暂不可用</div>
        )}

        {recentData.length > 2 && (
          <div className="h-16 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recentData}>
                <defs>
                  <linearGradient id="hrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B8956A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#B8956A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="hr"
                  stroke="#B8956A"
                  strokeWidth={1.5}
                  fill="url(#hrGradient)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="flex gap-4 mt-3 pt-3 border-t border-paper-stain/30 text-xs text-ink-subtle font-sans">
          <div>
            <span className="text-paper-ink-faded">姿态 </span>
            <span className="capitalize font-serif">
              {latest?.posture === 'sitting' ? '坐' : latest?.posture === 'standing' ? '站' : latest?.posture === 'lying' ? '卧' : '—'}
            </span>
          </div>
          <div>
            <span className="text-paper-ink-faded">活动 </span>
            <span className="capitalize font-serif">
              {latest?.activity === 'still' ? '静坐' : latest?.activity === 'moving' ? '走动' : latest?.activity === 'exercising' ? '运动' : latest?.activity === 'fall' ? '跌倒' : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
