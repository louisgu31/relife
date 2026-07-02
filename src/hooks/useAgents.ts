import { useEffect, useRef, useState } from 'react'
import { AgentCoordinator } from '../agents/coordinator'
import { useAppStore } from '../store/useAppStore'
import type { AppSettings } from '../types'

export function useAgents() {
  const coordinatorRef = useRef<AgentCoordinator | null>(null)
  const [isReady, setIsReady] = useState(false)
  const { settings, setPresence, setCircadian, setHealth, setContextEvents, setSmartHome, setAgents } = useAppStore()

  useEffect(() => {
    const coordinator = new AgentCoordinator(settings)
    coordinatorRef.current = coordinator

    coordinator.presence.subscribePresence((data) => {
      setPresence(data)
    })

    coordinator.circadian.subscribeCircadian((state) => {
      setCircadian(state)
    })

    coordinator.health.subscribeHealth((readings) => {
      setHealth(readings)
    })

    coordinator.context.subscribeEvents((events) => {
      setContextEvents(events)
    })

    coordinator.smartHome.subscribeSmartHome((state) => {
      setSmartHome(state)
    })

    const updateAgents = () => {
      if (coordinatorRef.current) {
        setAgents(coordinatorRef.current.getAllAgentStates())
      }
    }

    const agentInterval = setInterval(updateAgents, 2000)

    coordinator
      .start()
      .catch((err) => {
        console.warn('Some agents failed to start:', err)
      })
      .finally(() => {
        setIsReady(true)
        updateAgents()
      })

    return () => {
      clearInterval(agentInterval)
      coordinator.stop()
      coordinatorRef.current = null
    }
  }, [])

  useEffect(() => {
    if (coordinatorRef.current) {
      coordinatorRef.current.updateSettings(settings)
    }
  }, [settings])

  return {
    isReady,
    coordinator: coordinatorRef.current,
    triggerFallTest: () => coordinatorRef.current?.health.triggerFallTest(),
    processVoiceCommand: (cmd: string) => coordinatorRef.current?.smartHome.processVoiceCommand(cmd) ?? '',
    setMood: (mood: any) => coordinatorRef.current?.smartHome.setMood(mood),
  }
}

export function initializeAgents(settings: AppSettings): AgentCoordinator {
  return new AgentCoordinator(settings)
}
