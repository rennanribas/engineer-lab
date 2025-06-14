import React, { useState, useCallback, useEffect } from 'react'
import {
  EventLoopService,
  type EventLoopState,
} from '../../services/EventLoopService'
import { EventLoopVisualization } from '../Visualization/EventLoopVisualization'
import { EventLoopControls } from '../Controls/EventLoopControls'
import { EventLoopInfo } from './EventLoopInfo'

const eventLoopService = new EventLoopService()

export const EventLoopContainer: React.FC = () => {
  const [eventLoopState, setEventLoopState] = useState<EventLoopState>(
    eventLoopService.getCurrentState()
  )

  const updateState = useCallback(() => {
    const newState = eventLoopService.getCurrentState()
    setEventLoopState(newState)
  }, [])

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
    if (
      eventLoopState.isPlaying &&
      eventLoopState.currentStep < eventLoopState.steps.length
    ) {
      interval = setInterval(() => {
        const hasNext = eventLoopService.nextStep()
        if (!hasNext) {
          eventLoopService.setPlaying(false)
        }
        updateState()
      }, 2000)
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
        <EventLoopControls
          steps={eventLoopState.steps}
          currentStep={eventLoopState.currentStep}
          isPlaying={eventLoopState.isPlaying}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          onPlay={handlePlay}
          onPause={handlePause}
          onSelectDemo={handleSelectDemo}
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
