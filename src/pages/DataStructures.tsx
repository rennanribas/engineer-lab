import React, { useState, useCallback, useEffect } from 'react'
import { HashMapService, type DemoState } from '../services/HashMapService'
import { CodePreviewProvider } from '../contexts/CodePreviewContext'
import { useDemoCodeGenerator } from '../hooks/useDemoCodeGenerator'
import { CodePreview } from '../components/CodePreview'
import { MapVisualization } from '../components/Visualization/MapVisualization'
import { HashMapVisualization } from '../components/Visualization/HashMapVisualization'
import { DemonstrationsComponent } from '../components/Demonstrations'
import { hashMapDemos } from '../data/dataStructuresDemos'

const demoService = new HashMapService()

const DataStructuresContent: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>(
    demoService.getCurrentState()
  )
  const [highlightedKey, setHighlightedKey] = useState<
    string | number | undefined
  >()
  const [currentOperation, setCurrentOperation] = useState<string | undefined>()
  const { updateCodePreview } = useDemoCodeGenerator()

  const updateState = useCallback(() => {
    const newState = demoService.getCurrentState()
    setDemoState(newState)
    updateCodePreview(newState.steps, newState.currentStep)

    if (newState.currentStep > 0 && newState.steps[newState.currentStep - 1]) {
      const currentStep = newState.steps[newState.currentStep - 1]
      setHighlightedKey(currentStep.key)
      setCurrentOperation(currentStep.operation)
    } else {
      setHighlightedKey(undefined)
      setCurrentOperation(undefined)
    }
  }, [updateCodePreview])

  const handleSelectDemo = useCallback(
    (demoType: string) => {
      let steps
      switch (demoType) {
        case 'basic':
          steps = demoService.createBasicDemo()
          break
        case 'collision':
          steps = demoService.createCollisionDemo()
          break
        case 'resize':
          steps = demoService.createResizeDemo()
          break
        default:
          steps = demoService.createBasicDemo()
      }
      demoService.setSteps(steps)
      updateState()
    },
    [updateState]
  )

  const handleNext = useCallback(() => {
    demoService.nextStep()
    updateState()
  }, [updateState])

  const handlePrevious = useCallback(() => {
    demoService.previousStep()
    updateState()
  }, [updateState])

  const handleReset = useCallback(() => {
    demoService.reset()
    updateState()
  }, [updateState])

  const handlePlay = useCallback(() => {
    demoService.setPlaying(true)
    updateState()
  }, [updateState])

  const handlePause = useCallback(() => {
    demoService.setPlaying(false)
    updateState()
  }, [updateState])

  useEffect(() => {
    let interval: number
    if (demoState.isPlaying) {
      if (demoState.currentStep >= demoState.steps.length) {
        demoService.setPlaying(false)
        updateState()
      } else {
        interval = setInterval(() => {
          const hasNext = demoService.nextStep()
          const newState = demoService.getCurrentState()

          if (!hasNext || newState.currentStep >= newState.steps.length) {
            demoService.setPlaying(false)
          }
          updateState()
        }, 1500)
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [
    demoState.isPlaying,
    demoState.currentStep,
    demoState.steps.length,
    updateState,
  ])

  useEffect(() => {
    handleSelectDemo('basic')
  }, [handleSelectDemo])

  return (
    <div className='demo-container'>
      <div className='demo-main'>
        <div className='demo-controls-column'>
          <CodePreview
            steps={demoState.steps}
            currentStep={demoState.currentStep}
            isPlaying={demoState.isPlaying}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReset={handleReset}
            onPlay={handlePlay}
            onPause={handlePause}
          />
          <DemonstrationsComponent
            demoOptions={hashMapDemos}
            onSelectDemo={handleSelectDemo}
          />
        </div>
        <div className='visualizations'>
          <div className='visualization-panel'>
            <MapVisualization
              data={demoState.mapData}
              highlightedKey={highlightedKey}
              currentOperation={currentOperation}
            />
          </div>

          <div className='visualization-panel'>
            <HashMapVisualization
              data={demoState.hashMapData}
              highlightedKey={highlightedKey}
              currentOperation={currentOperation}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const DataStructures: React.FC = () => {
  return (
    <CodePreviewProvider initialTitle='hashmap-demo.js'>
      <DataStructuresContent />
    </CodePreviewProvider>
  )
}
