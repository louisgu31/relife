import { useState, useEffect } from 'react'
import { AmbientDisplay } from './components/AmbientDisplay'
import { DemoPage } from './components/DemoPage'
import { AccessibilityToggle } from './components/AccessibilityToggle'
import { useAppStore } from './store/useAppStore'
import { useAgents } from './hooks/useAgents'

function App() {
  const [route, setRoute] = useState<'demo' | 'ambient'>('demo')
  const { settings } = useAppStore()

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/ambient' || path.includes('ambient')) {
      setRoute('ambient')
    }
  }, [])

  const rootClasses = [
    settings.highContrast ? 'high-contrast' : '',
    settings.largeText ? 'large-text' : '',
    settings.reducedMotion ? 'reduced-motion' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClasses}>
      {route === 'ambient' ? <AmbientApp /> : <DemoPage />}
      <AccessibilityToggle />
    </div>
  )
}

function AmbientApp() {
  useAgents()
  return <AmbientDisplay />
}

export default App
