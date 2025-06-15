import { HashMap, type HashMapVisualizationData } from '../core/HashMap'
import { MapWrapper, type MapVisualizationData } from '../core/MapWrapper'

export interface DemoStep {
  id: string
  operation: string
  description: string
  key?: string | number
  value?: string | number
}

export interface DemoState {
  hashMapData: HashMapVisualizationData<string | number, string | number>
  mapData: MapVisualizationData<string | number, string | number>
  currentStep: number
  steps: DemoStep[]
  isPlaying: boolean
}

export class HashMapService {
  private hashMap: HashMap<string | number, string | number>
  private mapWrapper: MapWrapper<string | number, string | number>
  private steps: DemoStep[] = []
  private currentStep: number = 0
  private isPlaying: boolean = false

  constructor() {
    this.hashMap = new HashMap<string | number, string | number>(8)
    this.mapWrapper = new MapWrapper<string | number, string | number>()
  }

  createBasicDemo(): DemoStep[] {
    return [
      {
        id: '1',
        operation: 'set',
        description: 'Adding first key-value pair',
        key: 'name',
        value: 'John',
      },
      {
        id: '2',
        operation: 'set',
        description: 'Adding second key-value pair',
        key: 'age',
        value: 25,
      },
      {
        id: '3',
        operation: 'set',
        description: 'Adding third key-value pair',
        key: 'city',
        value: 'New York',
      },
      {
        id: '4',
        operation: 'get',
        description: 'Retrieving value for key "name"',
        key: 'name',
      },
      {
        id: '5',
        operation: 'set',
        description: 'Updating existing key',
        key: 'age',
        value: 26,
      },
      {
        id: '6',
        operation: 'delete',
        description: 'Removing key "city"',
        key: 'city',
      },
    ]
  }

  createCollisionDemo(): DemoStep[] {
    return [
      {
        id: '1',
        operation: 'set',
        description: 'Adding key that will hash to bucket 0',
        key: 'a',
        value: 'value1',
      },
      {
        id: '2',
        operation: 'set',
        description: 'Adding another key that may cause collision',
        key: 'q',
        value: 'value2',
      },
      {
        id: '3',
        operation: 'set',
        description: 'Adding third key to demonstrate chaining',
        key: 'A',
        value: 'value3',
      },
      {
        id: '4',
        operation: 'get',
        description: 'Retrieving from collision bucket',
        key: 'q',
      },
    ]
  }

  createResizeDemo(): DemoStep[] {
    const steps: DemoStep[] = []
    for (let i = 0; i < 15; i++) {
      steps.push({
        id: `${i + 1}`,
        operation: 'set',
        description:
          i < 12
            ? `Adding item ${i + 1}`
            : `Triggering resize at item ${i + 1}`,
        key: `key${i}`,
        value: `value${i}`,
      })
    }
    return steps
  }

  executeStep(step: DemoStep): void {
    switch (step.operation) {
      case 'set':
        if (step.key !== undefined && step.value !== undefined) {
          this.hashMap.set(step.key, step.value)
          this.mapWrapper.set(step.key, step.value)
        }
        break
      case 'get':
        if (step.key !== undefined) {
          this.hashMap.get(step.key)
          this.mapWrapper.get(step.key)
        }
        break
      case 'delete':
        if (step.key !== undefined) {
          this.hashMap.delete(step.key)
          this.mapWrapper.delete(step.key)
        }
        break
    }
  }

  reset(): void {
    this.hashMap.clear()
    this.mapWrapper.clear()
    this.currentStep = 0
    this.isPlaying = false
  }

  getCurrentState(): DemoState {
    return {
      hashMapData: this.hashMap.getVisualizationData(),
      mapData: this.mapWrapper.getVisualizationData(),
      currentStep: this.currentStep,
      steps: this.steps,
      isPlaying: this.isPlaying,
    }
  }

  setSteps(steps: DemoStep[]): void {
    this.steps = steps
    this.reset()
  }

  nextStep(): boolean {
    if (this.currentStep < this.steps.length) {
      const step = this.steps[this.currentStep]
      if (step) {
        this.executeStep(step)
        this.currentStep++
        return true
      }
    }
    return false
  }

  previousStep(): boolean {
    if (this.currentStep > 0) {
      this.currentStep--
      this.rebuildState()
      return true
    }
    return false
  }

  private rebuildState(): void {
    this.hashMap.clear()
    this.mapWrapper.clear()
    for (let i = 0; i < this.currentStep; i++) {
      const step = this.steps[i]
      if (step) {
        this.executeStep(step)
      }
    }
  }

  setPlaying(playing: boolean): void {
    this.isPlaying = playing
  }
}
