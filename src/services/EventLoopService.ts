export interface EventLoopTask {
  id: string
  name: string
  type: 'sync' | 'async' | 'promise' | 'timer'
  delay?: number
  status: 'pending' | 'executing' | 'completed'
}

export interface EventLoopStep {
  id: string
  description: string
  action: 'push' | 'pop' | 'move' | 'execute'
  target: 'callStack' | 'taskQueue' | 'microtaskQueue' | 'webApis'
  task?: EventLoopTask
  operation?: string // Added operation property
}

export interface EventLoopState {
  callStack: EventLoopTask[]
  taskQueue: EventLoopTask[]
  microtaskQueue: EventLoopTask[]
  webApis: EventLoopTask[]
  steps: EventLoopStep[]
  currentStep: number
  isPlaying: boolean
}

export class EventLoopService {
  private state: EventLoopState = {
    callStack: [],
    taskQueue: [],
    microtaskQueue: [],
    webApis: [],
    steps: [],
    currentStep: 0,
    isPlaying: false,
  }

  getCurrentState(): EventLoopState {
    return { ...this.state }
  }

  setSteps(steps: EventLoopStep[]): void {
    this.state.steps = steps
    this.state.currentStep = 0
    this.reset()
  }

  nextStep(): boolean {
    if (this.state.currentStep >= this.state.steps.length) {
      return false
    }

    const step = this.state.steps[this.state.currentStep]
    this.executeStep(step)
    this.state.currentStep++
    return true
  }

  previousStep(): boolean {
    if (this.state.currentStep <= 0) {
      return false
    }

    this.state.currentStep--
    this.rebuildStateFromSteps()
    return true
  }

  reset(): void {
    this.state.callStack = []
    this.state.taskQueue = []
    this.state.microtaskQueue = []
    this.state.webApis = []
    this.state.currentStep = 0
    this.state.isPlaying = false
  }

  setPlaying(playing: boolean): void {
    this.state.isPlaying = playing
  }

  private executeStep(step: EventLoopStep): void {
    const { action, target, task } = step

    if (!task) return

    switch (action) {
      case 'push':
        this.state[target].push({ ...task })
        break
      case 'pop':
        this.state[target].pop()
        break
      case 'move':
        this.moveTask(step)
        break
      case 'execute':
        this.executeTask(task, target)
        break
    }
  }

  private moveTask(step: EventLoopStep): void {
    const { target, task } = step
    if (!task) return

    const sourceQueues = ['webApis', 'taskQueue', 'microtaskQueue'] as const

    for (const source of sourceQueues) {
      const index = this.state[source].findIndex((t) => t.id === task.id)
      if (index !== -1) {
        const [movedTask] = this.state[source].splice(index, 1)
        this.state[target].push(movedTask)
        break
      }
    }
  }

  private executeTask(task: EventLoopTask, target: keyof EventLoopState): void {
    const targetArray = this.state[target] as EventLoopTask[]
    const taskIndex = targetArray.findIndex((t) => t.id === task.id)
    if (taskIndex !== -1) {
      targetArray[taskIndex].status = 'executing'
    }
  }

  private rebuildStateFromSteps(): void {
    this.reset()
    for (let i = 0; i < this.state.currentStep; i++) {
      this.executeStep(this.state.steps[i])
    }
  }

  createBasicDemo(): EventLoopStep[] {
    return [
      {
        id: '1',
        description: 'Execute console.log("Start")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '2',
        description: 'Complete console.log("Start")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '3',
        description: 'Execute setTimeout callback',
        action: 'push',
        target: 'webApis',
        task: {
          id: 'timeout',
          name: 'setTimeout(() => console.log("Timeout"), 0)',
          type: 'timer',
          delay: 0,
          status: 'pending',
        },
      },
      {
        id: '4',
        description: 'Execute console.log("End")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '5',
        description: 'Complete console.log("End")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '6',
        description: 'Move timeout to task queue',
        action: 'move',
        target: 'taskQueue',
        task: {
          id: 'timeout',
          name: 'setTimeout callback',
          type: 'timer',
          status: 'pending',
        },
      },
      {
        id: '7',
        description: 'Execute timeout callback',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'executing',
        },
      },
      {
        id: '8',
        description: 'Complete timeout callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'completed',
        },
      },
    ]
  }

  createPromisesDemo(): EventLoopStep[] {
    return [
      {
        id: '1',
        description: 'Execute console.log("Start")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '2',
        description: 'Complete console.log("Start")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '3',
        description: 'Create Promise',
        action: 'push',
        target: 'microtaskQueue',
        task: {
          id: 'promise',
          name: 'Promise.resolve().then(() => console.log("Promise"))',
          type: 'promise',
          status: 'pending',
        },
      },
      {
        id: '4',
        description: 'Execute setTimeout',
        action: 'push',
        target: 'webApis',
        task: {
          id: 'timeout',
          name: 'setTimeout(() => console.log("Timeout"), 0)',
          type: 'timer',
          delay: 0,
          status: 'pending',
        },
      },
      {
        id: '5',
        description: 'Execute console.log("End")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '6',
        description: 'Complete console.log("End")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '7',
        description: 'Execute Promise callback (microtask has priority)',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'promise',
          name: 'console.log("Promise")',
          type: 'promise',
          status: 'executing',
        },
      },
      {
        id: '8',
        description: 'Complete Promise callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'promise',
          name: 'console.log("Promise")',
          type: 'promise',
          status: 'completed',
        },
      },
      {
        id: '9',
        description: 'Move timeout to task queue',
        action: 'move',
        target: 'taskQueue',
        task: {
          id: 'timeout',
          name: 'setTimeout callback',
          type: 'timer',
          status: 'pending',
        },
      },
      {
        id: '10',
        description: 'Execute timeout callback',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'executing',
        },
      },
      {
        id: '11',
        description: 'Complete timeout callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'completed',
        },
      },
    ]
  }

  createTimersDemo(): EventLoopStep[] {
    return [
      {
        id: '1',
        description: 'Execute console.log("Start")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '2',
        description: 'Complete console.log("Start")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '3',
        description: 'Execute setTimeout with 100ms delay',
        action: 'push',
        target: 'webApis',
        task: {
          id: 'timeout1',
          name: 'setTimeout(() => console.log("Timeout 1"), 100)',
          type: 'timer',
          delay: 100,
          status: 'pending',
        },
      },
      {
        id: '4',
        description: 'Execute setTimeout with 0ms delay',
        action: 'push',
        target: 'webApis',
        task: {
          id: 'timeout2',
          name: 'setTimeout(() => console.log("Timeout 2"), 0)',
          type: 'timer',
          delay: 0,
          status: 'pending',
        },
      },
      {
        id: '5',
        description: 'Execute console.log("End")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '6',
        description: 'Complete console.log("End")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '7',
        description: 'Timeout 2 (0ms) completes first',
        action: 'move',
        target: 'taskQueue',
        task: {
          id: 'timeout2',
          name: 'setTimeout callback (0ms)',
          type: 'timer',
          status: 'pending',
        },
      },
      {
        id: '8',
        description: 'Execute timeout 2 callback',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'timeout2',
          name: 'console.log("Timeout 2")',
          type: 'timer',
          status: 'executing',
        },
      },
      {
        id: '9',
        description: 'Complete timeout 2 callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'timeout2',
          name: 'console.log("Timeout 2")',
          type: 'timer',
          status: 'completed',
        },
      },
      {
        id: '10',
        description: 'Timeout 1 (100ms) completes',
        action: 'move',
        target: 'taskQueue',
        task: {
          id: 'timeout1',
          name: 'setTimeout callback (100ms)',
          type: 'timer',
          status: 'pending',
        },
      },
      {
        id: '11',
        description: 'Execute timeout 1 callback',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'timeout1',
          name: 'console.log("Timeout 1")',
          type: 'timer',
          status: 'executing',
        },
      },
      {
        id: '12',
        description: 'Complete timeout 1 callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'timeout1',
          name: 'console.log("Timeout 1")',
          type: 'timer',
          status: 'completed',
        },
      },
    ]
  }

  createMixedDemo(): EventLoopStep[] {
    return [
      {
        id: '1',
        description: 'Execute console.log("Start")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '2',
        description: 'Complete console.log("Start")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'start',
          name: 'console.log("Start")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '3',
        description: 'Create Promise',
        action: 'push',
        target: 'microtaskQueue',
        task: {
          id: 'promise1',
          name: 'Promise.resolve().then(() => console.log("Promise 1"))',
          type: 'promise',
          status: 'pending',
        },
      },
      {
        id: '4',
        description: 'Execute setTimeout',
        action: 'push',
        target: 'webApis',
        task: {
          id: 'timeout',
          name: 'setTimeout(() => console.log("Timeout"), 0)',
          type: 'timer',
          delay: 0,
          status: 'pending',
        },
      },
      {
        id: '5',
        description: 'Create another Promise',
        action: 'push',
        target: 'microtaskQueue',
        task: {
          id: 'promise2',
          name: 'Promise.resolve().then(() => console.log("Promise 2"))',
          type: 'promise',
          status: 'pending',
        },
      },
      {
        id: '6',
        description: 'Execute console.log("End")',
        action: 'push',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'pending',
        },
      },
      {
        id: '7',
        description: 'Complete console.log("End")',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'end',
          name: 'console.log("End")',
          type: 'sync',
          status: 'completed',
        },
      },
      {
        id: '8',
        description: 'Execute Promise 1 (microtasks first)',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'promise1',
          name: 'console.log("Promise 1")',
          type: 'promise',
          status: 'executing',
        },
      },
      {
        id: '9',
        description: 'Complete Promise 1',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'promise1',
          name: 'console.log("Promise 1")',
          type: 'promise',
          status: 'completed',
        },
      },
      {
        id: '10',
        description: 'Execute Promise 2',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'promise2',
          name: 'console.log("Promise 2")',
          type: 'promise',
          status: 'executing',
        },
      },
      {
        id: '11',
        description: 'Complete Promise 2',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'promise2',
          name: 'console.log("Promise 2")',
          type: 'promise',
          status: 'completed',
        },
      },
      {
        id: '12',
        description: 'Move timeout to task queue',
        action: 'move',
        target: 'taskQueue',
        task: {
          id: 'timeout',
          name: 'setTimeout callback',
          type: 'timer',
          status: 'pending',
        },
      },
      {
        id: '13',
        description: 'Execute timeout callback',
        action: 'move',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'executing',
        },
      },
      {
        id: '14',
        description: 'Complete timeout callback',
        action: 'pop',
        target: 'callStack',
        task: {
          id: 'timeout',
          name: 'console.log("Timeout")',
          type: 'timer',
          status: 'completed',
        },
      },
    ]
  }
}
