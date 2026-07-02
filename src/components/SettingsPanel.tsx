import { useState } from 'react'
import { X, Settings as SettingsIcon, User, Clock, Bell, Eye, Mic, Smartphone, Shield, Contrast, Type, Wind } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useAppStore()
  const [activeTab, setActiveTab] = useState<'general' | 'health' | 'accessibility' | 'about'>('general')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full md:w-[480px] md:max-h-[80vh] bg-paper md:rounded-lg rounded-t-lg border border-paper-stain overflow-hidden animate-page-corner paper-texture">
        <div className="relative z-10">
          <div className="flex items-center justify-between p-4 border-b border-paper-stain/40">
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-ink-secondary" />
              <h2 className="text-ink font-serif font-medium">设置</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-paper-fold text-ink-subtle hover:text-ink transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-paper-stain/40 px-2">
            {(['general', 'health', 'accessibility', 'about'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-sans font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'text-ink border-b-2 border-presence'
                    : 'text-ink-subtle hover:text-ink-secondary'
                }`}
              >
                {tab === 'general' ? '通用' : tab === 'health' ? '健康' : tab === 'accessibility' ? '无障碍' : '关于'}
              </button>
            ))}
          </div>

          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <SettingItem icon={<User className="w-5 h-5" />} label="你的名字">
                  <input
                    type="text"
                    value={settings.userName}
                    onChange={(e) => updateSettings({ userName: e.target.value })}
                    className="bg-paper-fold border border-paper-stain/50 rounded px-3 py-2 text-ink text-sm w-full focus:outline-none focus:border-presence/50 font-serif"
                  />
                </SettingItem>

                <SettingItem icon={<Clock className="w-5 h-5" />} label="起床时间">
                  <input
                    type="time"
                    value={settings.wakeTime}
                    onChange={(e) => updateSettings({ wakeTime: e.target.value })}
                    className="bg-paper-fold border border-paper-stain/50 rounded px-3 py-2 text-ink text-sm focus:outline-none focus:border-presence/50 font-serif"
                  />
                </SettingItem>

                <SettingItem icon={<Bell className="w-5 h-5" />} label="入睡时间">
                  <input
                    type="time"
                    value={settings.sleepTime}
                    onChange={(e) => updateSettings({ sleepTime: e.target.value })}
                    className="bg-paper-fold border border-paper-stain/50 rounded px-3 py-2 text-ink text-sm focus:outline-none focus:border-presence/50 font-serif"
                  />
                </SettingItem>

                <SettingItem icon={<Eye className="w-5 h-5" />} label="专注时长">
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="15"
                      max="90"
                      step="5"
                      value={settings.focusDuration}
                      onChange={(e) => updateSettings({ focusDuration: parseInt(e.target.value) })}
                      className="flex-1 accent-health"
                    />
                    <span className="text-ink-secondary text-sm w-16 text-right font-sans">
                      {settings.focusDuration} 分钟
                    </span>
                  </div>
                </SettingItem>

                <SettingItem icon={<Mic className="w-5 h-5" />} label="语音控制">
                  <Toggle
                    enabled={settings.voiceEnabled}
                    onChange={(v) => updateSettings({ voiceEnabled: v })}
                  />
                </SettingItem>

                <SettingItem icon={<Smartphone className="w-5 h-5" />} label="触感反馈">
                  <Toggle
                    enabled={settings.hapticsEnabled}
                    onChange={(v) => updateSettings({ hapticsEnabled: v })}
                  />
                </SettingItem>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-4">
                <SettingItem icon={<Shield className="w-5 h-5" />} label="健康监测">
                  <Toggle
                    enabled={settings.healthMonitoring}
                    onChange={(v) => updateSettings({ healthMonitoring: v })}
                  />
                </SettingItem>

                <div className="ledger-card p-4">
                  <div className="relative z-10">
                    <p className="text-ink-subtle text-sm font-serif leading-relaxed">
                      健康数据完全在设备端处理，不会离开你的手机。
                      基于摄像头的生命体征估计仅供健康参考，
                      并非医疗器械。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="space-y-4">
                <SettingItem icon={<Contrast className="w-5 h-5" />} label="高对比度模式">
                  <Toggle
                    enabled={settings.highContrast}
                    onChange={(v) => updateSettings({ highContrast: v })}
                  />
                </SettingItem>

                <SettingItem icon={<Type className="w-5 h-5" />} label="大字手写模式">
                  <Toggle
                    enabled={settings.largeText}
                    onChange={(v) => updateSettings({ largeText: v })}
                  />
                </SettingItem>

                <SettingItem icon={<Wind className="w-5 h-5" />} label="减少动效">
                  <Toggle
                    enabled={settings.reducedMotion}
                    onChange={(v) => updateSettings({ reducedMotion: v })}
                  />
                </SettingItem>

                <div className="ledger-card p-4">
                  <div className="relative z-10">
                    <p className="text-ink-subtle text-sm font-serif leading-relaxed">
                      无障碍设置让每个人都能舒适地使用 ReLife。
                      所有更改会立即生效，并且会记住你的偏好。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-paper-fold border border-paper-stain flex items-center justify-center">
                    <span className="text-2xl font-serif text-ink">Re</span>
                  </div>
                  <h3 className="text-ink font-serif font-semibold text-lg">ReLife</h3>
                  <p className="text-ink-subtle text-sm font-serif">环境智能伴侣</p>
                  <p className="text-paper-ink-faded text-xs mt-1 font-sans">版本 1.0.0</p>
                </div>

                <div className="ledger-card p-4">
                  <div className="relative z-10 space-y-3">
                    <InfoRow label="构建工具" value="TRAE IDE + Vite + React" />
                    <InfoRow label="架构" value="四代理系统" />
                    <InfoRow label="平台" value="PWA — iOS & Android" />
                    <InfoRow label="隐私" value="端侧处理" />
                  </div>
                </div>

                <p className="text-paper-ink-faded text-xs text-center font-serif">
                  由 AI 协助制作 · TRAE AI 创意大赛 2026
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="ledger-card p-3">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-health">{icon}</span>
          <span className="text-ink-secondary text-sm font-serif font-medium">{label}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-7 rounded-full transition-all ${
        enabled ? 'bg-presence' : 'bg-paper-stain/50'
      }`}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-paper shadow-sm transition-all ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink-subtle font-serif">{label}</span>
      <span className="text-ink-secondary font-sans">{value}</span>
    </div>
  )
}
