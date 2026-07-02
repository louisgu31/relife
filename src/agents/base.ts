import type { AgentType, AgentState } from '../types'

export abstract class BaseAgent {
  protected name: AgentType
  protected agentState: AgentState
  protected agentListeners: Set<(state: AgentState) => void> = new Set()

  constructor(name: AgentType) {
    this.name = name
    this.agentState = {
      name,
      status: 'idle',
      lastActivity: Date.now(),
    }
  }

  abstract start(): void | Promise<void>
  abstract stop(): void
  abstract tick(): void

  getState(): AgentState {
    return { ...this.agentState }
  }

  subscribe(listener: (state: AgentState) => void) {
    this.agentListeners.add(listener)
    return () => this.agentListeners.delete(listener)
  }

  protected notify() {
    this.agentListeners.forEach((l) => l(this.agentState))
  }

  protected setStatus(status: AgentState['status'], message?: string) {
    this.agentState = {
      ...this.agentState,
      status,
      lastActivity: Date.now(),
      message,
    }
    this.notify()
  }
}
