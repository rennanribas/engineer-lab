import React, { useState } from 'react'
interface DemoControlsProps {
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
    label: 'Basic Operations',
    description: 'Simple get, set, and delete operations on hash map',
    complexity: 'Basic',
  },
  {
    id: 'collision',
    label: 'Hash Collisions',
    description: 'Understanding how collisions are handled with chaining',
    complexity: 'Intermediate',
  },
  {
    id: 'resize',
    label: 'Dynamic Resizing',
    description: 'Automatic resizing when load factor exceeds threshold',
    complexity: 'Intermediate',
  },
]

export const DemoControls: React.FC<DemoControlsProps> = ({
  onSelectDemo,
}) => {
  const [selectedDemo, setSelectedDemo] = useState<string>('basic')

  const handleSelectDemo = (demoId: string) => {
    setSelectedDemo(demoId)
    onSelectDemo(demoId)
  }

  return (
    <div className='eventloop-controls'>
      <div className='controls-section controls-section--controls'>
        <div className='controls-subsection'>
          <h3 className='controls-title'>Demonstrations</h3>
          <div className='demo-grid'>
            {demoOptions.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleSelectDemo(demo.id)}
                className={`demo-card ${selectedDemo === demo.id ? 'demo-card--selected' : ''}`}
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
      </div>
    </div>
  )
}
