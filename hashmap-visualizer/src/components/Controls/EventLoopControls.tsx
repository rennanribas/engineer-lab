import React from 'react'
import type { EventLoopStep } from '../../services/EventLoopService'

interface EventLoopControlsProps {
  steps: EventLoopStep[]
  currentStep: number
  isPlaying: boolean
  onNext: () => void
  onPrevious: () => void
  onReset: () => void
  onPlay: () => void
  onPause: () => void
  onSelectDemo: (demoType: string) => void
}

interface DemoOption {
  id: string
  label: string
  description: string
  complexity: 'Basic' | 'Intermediate' | 'Advanced'
}

const demoOptions: DemoOption[] = [
  {
    id: 'basic',
    label: 'Basic Execution',
    description: 'Simple synchronous and asynchronous execution flow',
    complexity: 'Basic',
  },
  {
    id: 'promises',
    label: 'Promises vs Timers',
    description: 'Understanding microtask queue priority over task queue',
    complexity: 'Intermediate',
  },
  {
    id: 'timers',
    label: 'Multiple Timers',
    description: 'Different timer delays and execution order',
    complexity: 'Intermediate',
  },
  {
    id: 'mixed',
    label: 'Mixed Operations',
    description: 'Complex scenario with promises, timers, and sync code',
    complexity: 'Advanced',
  },
]

export const EventLoopControls: React.FC<EventLoopControlsProps> = ({
  steps,
  currentStep,
  isPlaying,
  onNext,
  onPrevious,
  onReset,
  onPlay,
  onPause,
  onSelectDemo,
}) => {
  const canGoNext = currentStep < steps.length
  const canGoPrevious = currentStep > 0
  const progress = steps.length > 0 ? (currentStep / steps.length) * 100 : 0

  return (
    <div className='eventloop-controls'>
      <div className='controls-section controls-section--controls'>
        <div className='controls-subsection'>
          <h3 className='controls-title'>Demonstrations</h3>
          <div className='demo-grid'>
            {demoOptions.map((demo) => (
              <button
                key={demo.id}
                onClick={() => onSelectDemo(demo.id)}
                className='demo-card'
              >
                <div className='demo-card-header'>
                  <span className='demo-label'>{demo.label}</span>
                  <span
                    className={`demo-complexity demo-complexity--${demo.complexity.toLowerCase()}`}
                  >
                    {demo.complexity}
                  </span>
                </div>
                <p className='demo-description'>{demo.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className='controls-subsection'>
          <h3 className='controls-title'>Playback Controls</h3>

          <div className='progress-container'>
            <div className='progress-info'>
              <span className='progress-text'>
                Step {currentStep} of {steps.length}
              </span>
              <span className='progress-percentage'>
                {Math.round(progress)}%
              </span>
            </div>
            <div className='progress-bar'>
              <div
                className='progress-fill'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className='playback-buttons'>
            <button
              onClick={onReset}
              className='control-button control-button--reset'
              disabled={currentStep === 0 && !isPlaying}
              title='Reset to beginning'
            >
              <svg viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z' />
              </svg>
              Reset
            </button>

            <button
              onClick={onPrevious}
              className='control-button control-button--previous'
              disabled={!canGoPrevious || isPlaying}
              title='Previous step'
            >
              <svg viewBox='0 0 24 24' fill='currentColor'>
                <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
              </svg>
              Previous
            </button>

            {isPlaying ? (
              <button
                onClick={onPause}
                className='control-button control-button--pause'
                title='Pause animation'
              >
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                </svg>
                Pause
              </button>
            ) : (
              <button
                onClick={onPlay}
                className='control-button control-button--play'
                disabled={!canGoNext}
                title='Play animation'
              >
                <svg viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M8 5v14l11-7z' />
                </svg>
                Play
              </button>
            )}

            <button
              onClick={onNext}
              className='control-button control-button--next'
              disabled={!canGoNext || isPlaying}
              title='Next step'
            >
              <svg viewBox='0 0 24 24' fill='currentColor'>
                <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
              </svg>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
