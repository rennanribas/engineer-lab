import React, { useState, useEffect, useCallback } from 'react'
import { DemoService, type DemoState } from '../../services/DemoService'
import { HashMapVisualization } from '../Visualization/HashMapVisualization'
import { MapVisualization } from '../Visualization/MapVisualization'
import { DemoControls } from '../Controls/DemoControls'

const demoService = new DemoService()

export const DemoContainer: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>(
    demoService.getCurrentState()
  )
  const [highlightedKey, setHighlightedKey] = useState<
    string | number | undefined
  >()

  const updateState = useCallback(() => {
    const newState = demoService.getCurrentState()
    setDemoState(newState)

    // Highlight the key from the current step
    if (newState.currentStep > 0 && newState.steps[newState.currentStep - 1]) {
      const currentStep = newState.steps[newState.currentStep - 1]
      setHighlightedKey(currentStep.key)
    } else {
      setHighlightedKey(undefined)
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

      <div className='visualizations'>
        <div className='visualization-panel'>
          <MapVisualization
            data={demoState.mapData}
            highlightedKey={highlightedKey}
          />
        </div>

        <div className='visualization-panel'>
          <HashMapVisualization
            data={demoState.hashMapData}
            highlightedKey={highlightedKey}
          />
        </div>
      </div>
    </div>
  )
}
