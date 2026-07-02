import { useState } from 'react'
import { Accessibility, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export function AccessibilityToggle() {
  const { settings, updateSettings } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="ledger-card paper-texture p-4 w-64 animate-ink-appear">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="font-hand text-ink text-lg">无障碍</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-paper-fold text-ink-subtle hover:text-ink transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <ToggleRow
                label="高对比度"
                enabled={settings.highContrast}
                onChange={(v) => updateSettings({ highContrast: v })}
              />
              <ToggleRow
                label="大字模式"
                enabled={settings.largeText}
                onChange={(v) => updateSettings({ largeText: v })}
              />
              <ToggleRow
                label="减少动效"
                enabled={settings.reducedMotion}
                onChange={(v) => updateSettings({ reducedMotion: v })}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="ledger-card paper-texture w-12 h-12 rounded-full flex items-center justify-center text-ink-secondary hover:text-ink transition-all hover:scale-105"
          aria-label="无障碍设置"
        >
          <Accessibility className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

function ToggleRow({
  label,
  enabled,
  onChange,
}: {
  label: string
  enabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-hand text-ink-secondary text-base">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-10 h-6 rounded-full transition-all ${
          enabled ? 'bg-presence' : 'bg-paper-stain/50'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-paper shadow-sm transition-all ${
            enabled ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}
