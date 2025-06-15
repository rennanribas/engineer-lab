import React, { useState, useEffect, useCallback } from 'react'
import { DemoService, type DemoState } from '../../services/DemoService'
import { HashMapVisualization } from '../Visualization/HashMapVisualization'
import { MapVisualization } from '../Visualization/MapVisualization'
import { CodePreview } from '../Visualization/CodePreview'
import { DemoControls } from '../Controls/DemoControls'

const demoService = new DemoService()

export const DataStructuresContainer: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>(
    demoService.getCurrentState()
  )
  const [highlightedKey, setHighlightedKey] = useState<
    string | number | undefined
  >()
  const [currentOperation, setCurrentOperation] = useState<string | undefined>()

  const updateState = useCallback(() => {
    const newState = demoService.getCurrentState()
    setDemoState(newState)

    // Highlight the key from the current step and set operation type
    if (newState.currentStep > 0 && newState.steps[newState.currentStep - 1]) {
      const currentStep = newState.steps[newState.currentStep - 1]
      setHighlightedKey(currentStep.key)
      setCurrentOperation(currentStep.operation)
      
      // Clear highlight after animation duration
      setTimeout(() => {
        setHighlightedKey(undefined)
        setCurrentOperation(undefined)
      }, 1500)
    } else {
      setHighlightedKey(undefined)
      setCurrentOperation(undefined)
    }
  }, [])

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

  // Auto-play functionality
  useEffect(() => {
    let interval: number
    if (demoState.isPlaying && demoState.currentStep < demoState.steps.length) {
      interval = setInterval(() => {
        const hasNext = demoService.nextStep()
        if (!hasNext) {
          demoService.setPlaying(false)
        }
        updateState()
      }, 1500)
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

  // Initialize with basic demo
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
          />
          
          <DemoControls
            steps={demoState.steps}
            currentStep={demoState.currentStep}
            isPlaying={demoState.isPlaying}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onReset={handleReset}
            onPlay={handlePlay}
            onPause={handlePause}
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
