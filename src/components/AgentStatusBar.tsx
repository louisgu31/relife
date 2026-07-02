import { useAppStore } from '../store/useAppStore'
import { Cpu, Activity, Eye, Clock, Wifi } from 'lucide-react'

const agentIcons: Record<string, React.ElementType> = {
  presence: Eye,
  circadian: Clock,
  health: Activity,
  context: Cpu,
}

const agentLabels: Record<string, string> = {
  presence: '感知',
  circadian: '节律',
  health: '健康',
  context: '语境',
}

export function AgentStatusBar() {
  const { agents } = useAppStore()
  const agentList = Object.entries(agents)

  if (agentList.length === 0) {
    return (
      <div className="flex items-center gap-2 text-ink-subtle text-xs font-serif">
        <Wifi className="w-3 h-3" />
        <span>启动中…</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {agentList.map(([name, state]) => {
        const Icon = agentIcons[name] || Cpu
        const statusColors: Record<string, string> = {
          idle: 'bg-ink-subtle/50',
          active: 'bg-presence',
          alert: 'bg-alert',
          resting: 'bg-paper-ink-faded',
        }
        return (
          <div key={name} className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-ink-subtle" />
            <div className={`w-2 h-2 rounded-full ${statusColors[state.status] || 'bg-ink-subtle/50'}`} />
            <span className="text-ink-subtle text-xs font-serif hidden sm:inline">
              {agentLabels[name] || name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
