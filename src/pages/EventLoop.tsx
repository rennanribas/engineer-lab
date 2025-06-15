import React, { useState, useEffect, useCallback } from 'react'
import { EventLoopService, type EventLoopState } from '../services/EventLoopService'
import { EventLoopVisualization } from '../components/Visualization/eventloopvisualization'
import { CodePreview } from '../components/CodePreview'
import { DemonstrationsComponent } from '../components/Demonstrations'
import { eventLoopDemoOptions } from '../data/eventLoopDemos'
import { CodePreviewProvider } from '../contexts/CodePreviewContext'
import { useEventLoopCodeGenerator } from '../hooks/useEventLoopCodeGenerator'
import { EventLoopInfo } from '../components/EventLoopInfo'

const eventLoopService = new EventLoopService()

const EventLoopContent: React.FC = () => {
  const [eventLoopState, setEventLoopState] = useState<EventLoopState>(
    eventLoopService.getCurrentState()
  )
  const { updateCodePreview } = useEventLoopCodeGenerator()

  const updateState = useCallback(() => {
    const newState = eventLoopService.getCurrentState()
    setEventLoopState(newState)
    updateCodePreview(newState.steps, newState.currentStep)
  }, [updateCodePreview])

  const handleSelectDemo = useCallback(
    (demoType: string) => {
      let steps
      switch (demoType) {
        case 'basic':
          steps = eventLoopService.createBasicDemo()
          break
        case 'promises':
          steps = eventLoopService.createPromisesDemo()
          break
        case 'timers':
          steps = eventLoopService.createTimersDemo()
          break
        case 'mixed':
          steps = eventLoopService.createMixedDemo()
          break
        default:
          steps = eventLoopService.createBasicDemo()
      }
      eventLoopService.setSteps(steps)
      updateState()
    },
    [updateState]
  )

  const handleNext = useCallback(() => {
    eventLoopService.nextStep()
    updateState()
  }, [updateState])

  const handlePrevious = useCallback(() => {
    eventLoopService.previousStep()
    updateState()
  }, [updateState])

  const handleReset = useCallback(() => {
    eventLoopService.reset()
    updateState()
  }, [updateState])

  const handlePlay = useCallback(() => {
    eventLoopService.setPlaying(true)
    updateState()
  }, [updateState])

  const handlePause = useCallback(() => {
    eventLoopService.setPlaying(false)
    updateState()
  }, [updateState])

  useEffect(() => {
    let interval: number
    if (eventLoopState.isPlaying) {
      if (eventLoopState.currentStep >= eventLoopState.steps.length) {
        eventLoopService.setPlaying(false)
        updateState()
      } else {
        interval = setInterval(() => {
          const hasNext = eventLoopService.nextStep()
          const newState = eventLoopService.getCurrentState()

          if (!hasNext || newState.currentStep >= newState.steps.length) {
            eventLoopService.setPlaying(false)
          }
          updateState()
        }, 1500)
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [
    eventLoopState.isPlaying,
    eventLoopState.currentStep,
    eventLoopState.steps.length,
    updateState,
  ])

  useEffect(() => {
    handleSelectDemo('basic')
  }, [handleSelectDemo])

  return (
    <div className='eventloop-container'>
      <div className='eventloop-main'>
        <DemonstrationsComponent 
          demoOptions={eventLoopDemoOptions} 
          onSelectDemo={handleSelectDemo} 
          defaultDemo={eventLoopDemoOptions[0]?.id || ''} 
        />
        <CodePreview 
          steps={eventLoopState.steps.map(step => ({ ...step, operation: step.operation || `${step.action} ${step.target}${step.task ? ` (${step.task.name})` : ''}` }))}
          currentStep={eventLoopState.currentStep}
          isPlaying={eventLoopState.isPlaying}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <EventLoopVisualization
          callStack={eventLoopState.callStack}
          taskQueue={eventLoopState.taskQueue}
          microtaskQueue={eventLoopState.microtaskQueue}
          webApis={eventLoopState.webApis}
          currentStep={eventLoopState.currentStep}
          steps={eventLoopState.steps}
        />
      </div>

      <EventLoopInfo />
    </div>
  )
}

export const EventLoop: React.FC = () => {
  return (
    <CodePreviewProvider initialTitle='event-loop-demo.js'>
      <EventLoopContent />
    </CodePreviewProvider>
  )
}
