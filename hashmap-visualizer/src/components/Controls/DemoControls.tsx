import React from 'react'
import type { DemoStep } from '../../services/DemoService'

interface DemoControlsProps {
  steps: DemoStep[]
  currentStep: number
  isPlaying: boolean
  onNext: () => void
  onPrevious: () => void
  onReset: () => void
  onPlay: () => void
  onPause: () => void
  onSelectDemo: (demoType: string) => void
}

export const DemoControls: React.FC<DemoControlsProps> = ({
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
  const currentStepData = steps[currentStep - 1]

  return (
    <div className='demo-controls'>
      <div className='demo-selector'>
        <h3>Select Demo</h3>
        <div className='demo-buttons'>
          <button className='demo-button' onClick={() => onSelectDemo('basic')}>
            Basic Operations
          </button>
          <button
            className='demo-button'
            onClick={() => onSelectDemo('collision')}
          >
            Hash Collisions
          </button>
          <button
            className='demo-button'
            onClick={() => onSelectDemo('resize')}
          >
            Dynamic Resizing
          </button>
        </div>
      </div>

      <div className='step-info'>
        <h3>Current Step</h3>
        <div className='step-display'>
          <span className='step-counter'>
            {currentStep} / {steps.length}
          </span>
          {currentStepData && (
            <div className='step-details'>
              <div className='step-operation'>
                Operation: <strong>{currentStepData.operation}</strong>
              </div>
              <div className='step-description'>
                {currentStepData.description}
              </div>
              {currentStepData.key && (
                <div className='step-params'>
                  Key: <code>{currentStepData.key}</code>
                  {currentStepData.value && (
                    <>
                      , Value: <code>{currentStepData.value}</code>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='playback-controls'>
        <h3>Controls</h3>
        <div className='control-buttons'>
          <button
            className='control-button'
            onClick={onPrevious}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>

          {isPlaying ? (
            <button className='control-button play-pause' onClick={onPause}>
              ⏸ Pause
            </button>
          ) : (
            <button
              className='control-button play-pause'
              onClick={onPlay}
              disabled={currentStep >= steps.length}
            >
              ▶ Play
            </button>
          )}

          <button
            className='control-button'
            onClick={onNext}
            disabled={currentStep >= steps.length}
          >
            Next →
          </button>

          <button className='control-button reset' onClick={onReset}>
            ↻ Reset
          </button>
        </div>
      </div>

      <div className='progress-bar'>
        <div
          className='progress-fill'
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
