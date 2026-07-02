import { BookOpen, Calendar, Heart, Sun, CloudRain, Clock } from 'lucide-react'
import type { ContextEvent } from '../types'

const eventIcons: Record<ContextEvent['type'], typeof Sun> = {
  meeting: Calendar,
  reminder: Clock,
  weather: CloudRain,
  health: Heart,
  greeting: Sun,
}

const eventTypeLabels: Record<ContextEvent['type'], string> = {
  meeting: '日程',
  reminder: '提醒',
  weather: '天气',
  health: '健康',
  greeting: '问候',
}

function formatTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const sampleMemories: { date: string; events: ContextEvent[] }[] = [
  {
    date: '今天',
    events: [
      {
        id: 'mem-1',
        type: 'greeting',
        title: '早安，Friend',
        detail: '今天的专注分数会在上午 10 点达到峰值。',
        time: Date.now() - 3600000 * 3,
        priority: 'low',
      },
      {
        id: 'mem-2',
        type: 'health',
        title: '走路步数偏少',
        detail: '今天只走了 1200 步，比昨天少了一半。',
        time: Date.now() - 3600000 * 2,
        priority: 'low',
      },
      {
        id: 'mem-3',
        type: 'reminder',
        title: '该休息了',
        detail: '你已经专注了 50 分钟，站起来走走吧。',
        time: Date.now() - 3600000,
        priority: 'medium',
      },
    ],
  },
  {
    date: '昨天',
    events: [
      {
        id: 'mem-4',
        type: 'health',
        title: '睡眠质量',
        detail: '昨晚睡了 7 小时 20 分，深度睡眠 1 小时 45 分。',
        time: Date.now() - 3600000 * 20,
        priority: 'low',
      },
      {
        id: 'mem-5',
        type: 'reminder',
        title: '午餐时间',
        detail: '记得起身活动一下。',
        time: Date.now() - 3600000 * 26,
        priority: 'low',
      },
    ],
  },
]

export function MemoryWidget() {
  const grouped = sampleMemories

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-circadian" />
          <h2 className="text-2xl font-serif font-semibold text-ink">记忆</h2>
        </div>
        <p className="text-ink-subtle text-sm font-serif">
          ReLife 悄悄记下的点点滴滴
        </p>
      </div>

      <div className="space-y-8">
        {grouped.map((group, gi) => (
          <div key={gi}>
            <p className="text-xs font-hand text-ink-subtle mb-3 pl-2 relative">
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-paper-stain" />
              {group.date}
            </p>
            <div className="space-y-3">
              {group.events.map((event, ei) => {
                const Icon = eventIcons[event.type]
                return (
                  <div
                    key={event.id}
                    className="ledger-card paper-texture p-4"
                    style={{ transform: `rotate(${[-0.8, 0.5, -0.3, 0.8][ei % 4]}deg)` }}
                  >
                    <div className="relative z-10 flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-circadian/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-circadian" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-serif font-medium text-ink">
                            {event.title}
                          </p>
                          <span className="text-[10px] font-sans text-ink-subtle flex-shrink-0">
                            {formatTime(event.time)}
                          </span>
                        </div>
                        {event.detail && (
                          <p className="text-xs font-hand text-ink-secondary mt-1 leading-relaxed">
                            {event.detail}
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-paper-fold text-ink-subtle">
                            {eventTypeLabels[event.type]}
                          </span>
                          {event.priority === 'high' && (
                            <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-alert/20 text-health">
                              重要
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="ledger-card paper-texture p-4" style={{ transform: 'rotate(0.5deg)' }}>
          <div className="relative z-10">
            <p className="font-hand text-circadian text-sm leading-relaxed">
              记忆不是为了记录数据，
              <br />
              而是为了在你忘记的时候，
              <br />
              轻声提醒你——你被关注着。
            </p>
            <p className="text-[10px] font-hand text-ink-subtle mt-2 text-right">
              — ReLife
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
