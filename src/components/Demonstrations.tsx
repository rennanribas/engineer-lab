import React, { useState } from 'react'
import type { DemoOption } from '../data/dataStructuresDemos'

interface DemonstrationsComponentProps {
  demoOptions: DemoOption[]
  onSelectDemo: (demoType: string) => void
  defaultDemo?: string
}

export const DemonstrationsComponent: React.FC<
  DemonstrationsComponentProps
> = ({ demoOptions, onSelectDemo, defaultDemo = demoOptions[0]?.id || '' }) => {
  const [selectedDemo, setSelectedDemo] = useState<string>(defaultDemo)

  const handleSelectDemo = (demoId: string) => {
    setSelectedDemo(demoId)
    onSelectDemo(demoId)
  }

  return (
    <div className='demonstrations-container'>
      <div className='demonstrations-section demonstrations-section--controls'>
        <div className='demonstrations-subsection'>
          <h3 className='demonstrations-title'>Demonstrations</h3>
          <div className='demonstrations-grid'>
            {demoOptions.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleSelectDemo(demo.id)}
                className={`demonstrations-card ${
                  selectedDemo === demo.id
                    ? 'demonstrations-card--selected'
                    : ''
                }`}
              >
                <div className='demonstrations-card-header'>
                  <span className='demonstrations-label'>{demo.label}</span>
                  <span
                    className={`demonstrations-complexity demonstrations-complexity--${demo.complexity.toLowerCase()}`}
                  >
                    {demo.complexity}
                  </span>
                </div>
                <p className='demonstrations-description'>{demo.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
