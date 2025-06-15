import React from 'react'
import { useEffect, useState } from 'react'
import type { HashMapVisualizationData } from '../../core/HashMap'

interface HashMapVisualizationProps {
  data: HashMapVisualizationData<string | number, string | number>
  highlightedKey?: string | number
  currentOperation?: string
}

export const HashMapVisualization: React.FC<HashMapVisualizationProps> = ({
  data,
  highlightedKey,
  currentOperation,
}) => {
  const { buckets, size, capacity, loadFactor } = data
  const [activeBucket, setActiveBucket] = useState<number | null>(null)

  // Find which bucket contains the highlighted key
  useEffect(() => {
    if (highlightedKey !== undefined) {
      const bucketIndex = buckets.findIndex((bucket) =>
        bucket.some((entry) => entry.key === highlightedKey)
      )
      if (bucketIndex !== -1) {
        setActiveBucket(bucketIndex)
        // Reset after animation duration
        const timer = setTimeout(() => setActiveBucket(null), 1000)
        return () => clearTimeout(timer)
      }
    }
    setActiveBucket(null)
  }, [highlightedKey, buckets])

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
          <div
            key={index}
            className={`bucket ${activeBucket === index ? 'active' : ''}`}
          >
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
                    } ${
                      entry.key === highlightedKey && currentOperation
                        ? `operation-${currentOperation}`
                        : ''
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
