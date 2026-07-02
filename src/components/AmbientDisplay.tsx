import { useState } from 'react'
import { Clock } from './Clock'
import { PresenceIndicator, WeatherWidget } from './PresenceIndicator'
import { HealthWidget } from './HealthWidget'
import { CircadianWidget, FocusTimer, GreetingBanner } from './CircadianWidget'
import { SmartHomeWidget } from './SmartHomeWidget'
import { MemoryWidget } from './MemoryWidget'
import { AgentStatusBar } from './AgentStatusBar'
import { SettingsPanel } from './SettingsPanel'
import { PaperSidebar } from './PaperSidebar'
import { useAgents } from '../hooks/useAgents'
import { useAppStore } from '../store/useAppStore'
import { Settings, Maximize2, Info } from 'lucide-react'

type PageKey = 'home' | 'ambient' | 'health' | 'smarthome' | 'context' | 'settings'

export function AmbientDisplay() {
  const { isReady, triggerFallTest } = useAgents()
  const { circadian } = useAppStore()
  const [showSettings, setShowSettings] = useState(false)
  const [, setIsFullscreen] = useState(false)
  const [activePage, setActivePage] = useState<PageKey>('home')

  const foldShadows: Record<string, string> = {
    morning: 'from-amber-900/[0.03] to-transparent',
    day: 'from-paper-stain/10 to-transparent',
    afternoon: 'from-paper-ink-faded/[0.04] to-transparent',
    evening: 'from-health/[0.06] to-transparent',
    night: 'from-ink/[0.08] to-transparent',
    deepNight: 'from-ink/[0.12] to-transparent',
  }

  const pageTones: Record<PageKey, string> = {
    home: 'page-tone-2 stain-amber',
    ambient: 'page-tone-3 stain-tea',
    health: 'page-tone-1 stain-coffee',
    smarthome: 'page-tone-4 stain-amber',
    context: 'page-tone-5 stain-tea',
    settings: 'page-tone-2 stain-amber',
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleNavigate = (page: PageKey) => {
    setActivePage(page)
    if (page === 'settings') {
      setShowSettings(true)
    }
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />
      case 'ambient':
        return <AmbientPage />
      case 'health':
        return <HealthPage />
      case 'smarthome':
        return <SmartHomePage />
      case 'context':
        return <ContextPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div
      className={`min-h-screen ${pageTones[activePage]} text-ink transition-all duration-1000 relative overflow-hidden`}
    >
      <PaperSidebar active={activePage} onNavigate={handleNavigate} />

      <div className="md:ml-[72px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b ${foldShadows[circadian.phase]}`} />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-paper-stain/[0.06] to-transparent" />
        </div>

        <GreetingBanner />

        <header className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-ink font-serif font-semibold text-lg tracking-tight">ReLife</h1>
              <div className="w-1 h-1 rounded-full bg-presence animate-breathe-present" />
            </div>
            <div className="hidden sm:block">
              <AgentStatusBar />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded hover:bg-paper-fold text-ink-subtle hover:text-ink transition-all"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded hover:bg-paper-fold text-ink-subtle hover:text-ink transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="relative z-10 px-4 md:px-8 pb-8">
          <div className="max-w-6xl mx-auto animate-fade-in" key={activePage}>
            {renderPage()}
          </div>
        </main>

        <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />

        <button
          onClick={triggerFallTest}
          className="fixed bottom-4 right-4 px-3 py-1.5 bg-alert/20 text-health text-xs font-hand rounded border border-alert/30 hover:bg-alert/30 transition-all z-[100]"
        >
          测试跌倒警报
        </button>
      </div>

      {!isReady && (
        <div className="fixed inset-0 bg-paper/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-paper-stain/40 border-t-ink animate-spin" />
            <p className="text-ink-secondary font-serif">ReLife 正在苏醒…</p>
            <p className="text-ink-subtle text-sm mt-1 font-serif">启动环境代理</p>
          </div>
        </div>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col items-center pt-6 md:pt-12 pb-8">
      <Clock variant="large" />
      <div className="mt-6">
        <PresenceIndicator />
      </div>
      <div className="mt-4">
        <WeatherWidget />
      </div>

      <div className="w-full max-w-md mt-10">
        <FocusTimer />
      </div>

      <div className="mt-10 w-full max-w-md">
        <div className="ledger-card px-5 py-3">
          <div className="relative z-10 flex items-start gap-3">
            <Info className="w-4 h-4 text-paper-ink-faded flex-shrink-0 mt-0.5" />
            <p className="font-hand text-ink-subtle text-sm leading-relaxed">
              将 ReLife 安装在旧手机上，即可作为始终在线的环境伴侣使用。
              在 iOS 或 Android 上添加到主屏幕。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AmbientPage() {
  return (
    <div className="flex flex-col items-center pt-8 md:pt-16 pb-8">
      <Clock variant="large" />
      <div className="mt-6">
        <PresenceIndicator />
      </div>
      <div className="mt-4">
        <WeatherWidget />
      </div>

      <div className="w-full max-w-lg mt-10">
        <CircadianWidget />
      </div>
    </div>
  )
}

function HealthPage() {
  return (
    <div className="pt-6 md:pt-10 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-ink mb-2">健康守护</h2>
        <p className="text-ink-subtle text-sm font-serif">
          安静地观察，在需要的时候出现
        </p>
      </div>
      <div className="max-w-lg mx-auto">
        <HealthWidget />
      </div>
    </div>
  )
}

function SmartHomePage() {
  return (
    <div className="pt-6 md:pt-10 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-semibold text-ink mb-2">智能家居</h2>
        <p className="text-ink-subtle text-sm font-serif">
          感知你的情绪，自动调节环境
        </p>
      </div>
      <div className="max-w-lg mx-auto">
        <SmartHomeWidget />
      </div>
    </div>
  )
}

function ContextPage() {
  return (
    <div className="pt-6 md:pt-10 pb-8">
      <div className="max-w-lg mx-auto">
        <MemoryWidget />
      </div>
    </div>
  )
}
