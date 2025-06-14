import React from 'react'
import type { HashMapVisualizationData } from '../../core/HashMap'

interface HashMapVisualizationProps {
  data: HashMapVisualizationData<string | number, string | number>
  highlightedKey?: string | number
}

export const HashMapVisualization: React.FC<HashMapVisualizationProps> = ({
  data,
  highlightedKey,
}) => {
  const { buckets, size, capacity, loadFactor } = data

  return (
    <div className='hashmap-visualization'>
      <div className='visualization-header'>
        <h3>HashMap Structure</h3>
        <div className='stats'>
          <span className='stat'>Size: {size}</span>
          <span className='stat'>Capacity: {capacity}</span>
          <span className='stat'>Load Factor: {loadFactor.toFixed(2)}</span>
        </div>
      </div>

      <div className='buckets-container'>
        {buckets.map((bucket, index) => (
          <div key={index} className='bucket'>
            <div className='bucket-header'>
              <span className='bucket-index'>{index}</span>
            </div>
            <div className='bucket-content'>
              {bucket.length === 0 ? (
                <div className='empty-bucket'>Empty</div>
              ) : (
                bucket.map((entry, entryIndex) => (
                  <div
                    key={entryIndex}
                    className={`entry ${
                      entry.key === highlightedKey ? 'highlighted' : ''
                    }`}
                  >
                    <span className='entry-key'>{String(entry.key)}</span>
                    <span className='entry-separator'>:</span>
                    <span className='entry-value'>{String(entry.value)}</span>
                    <span className='entry-hash'>#{entry.hash}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
