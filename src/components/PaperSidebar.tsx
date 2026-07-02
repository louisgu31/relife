import { Home, Sparkles, Heart, Home as HomeIcon, BookOpen, Settings } from 'lucide-react'

type PageKey = 'home' | 'ambient' | 'health' | 'smarthome' | 'context' | 'settings'

interface PaperSidebarProps {
  active: PageKey
  onNavigate: (page: PageKey) => void
  className?: string
}

interface NavItem {
  key: PageKey
  label: string
  icon: typeof Home
}

const navItems: NavItem[] = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'ambient', label: '陪伴', icon: Sparkles },
  { key: 'health', label: '健康', icon: Heart },
  { key: 'smarthome', label: '家居', icon: HomeIcon },
  { key: 'context', label: '记忆', icon: BookOpen },
  { key: 'settings', label: '设置', icon: Settings },
]

export function PaperSidebar({ active, onNavigate, className = '' }: PaperSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full z-30 hidden md:flex ${className}`}
    >
      <nav className="stitched-strip torn-edge-right tape-tl w-[72px] h-full flex flex-col items-center py-6">
        <div className="flex flex-col items-center gap-3 mt-10">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.key
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded transition-all duration-300 ${
                  isActive ? 'bg-paper-fold/60' : 'hover:bg-paper-fold/30'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <Icon
                    className="w-5 h-5 transition-colors"
                    strokeWidth={1.5}
                    style={{ color: isActive ? 'var(--color-ink)' : 'var(--color-ink-subtle)' }}
                  />
                </div>
                <span
                  className="text-[10px] font-serif mt-0.5 transition-colors"
                  style={{ color: isActive ? 'var(--color-ink)' : 'var(--color-ink-subtle)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-presence animate-breathe-present" />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-auto flex flex-col items-center gap-2 pb-4">
          <div className="w-2 h-2 rounded-full bg-ink animate-breathe" />
          <span className="text-[10px] font-serif text-ink-subtle tracking-widest">ReLife</span>
        </div>
      </nav>
    </aside>
  )
}