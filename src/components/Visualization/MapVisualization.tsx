import React from 'react'
import type { MapVisualizationData } from '../../core/MapWrapper'

interface MapVisualizationProps {
  data: MapVisualizationData<string | number, string | number>
  highlightedKey?: string | number
  currentOperation?: string
}

export const MapVisualization: React.FC<MapVisualizationProps> = ({
  data,
  highlightedKey,
  currentOperation,
}) => {
  const { entries, size, insertionOrder } = data

  return (
    <div className='map-visualization'>
      <div className='visualization-header'>
        <h3>Map Structure</h3>
        <div className='stats'>
          <span className='stat'>Size: {size}</span>
          <span className='stat'>Insertion Order Preserved</span>
        </div>
      </div>

      <div className='map-container'>
        <div className='insertion-order'>
          <h4>Insertion Order</h4>
          <div className='order-list'>
            {insertionOrder.map((key, index) => (
              <div
                key={index}
                className={`order-item ${
                  key === highlightedKey ? 'highlighted' : ''
                } ${
                  key === highlightedKey && currentOperation
                    ? `operation-${currentOperation}`
                    : ''
                }`}
              >
                {index + 1}. {String(key)}
              </div>
            ))}
          </div>
        </div>

        <div className='entries-list'>
          <h4>Key-Value Pairs</h4>
          <div className='entries'>
            {entries.length === 0 ? (
              <div className='empty-map'>No entries</div>
            ) : (
              entries.map(([key, value], index) => (
                <div
                  key={index}
                  className={`map-entry ${
                    key === highlightedKey ? 'highlighted' : ''
                  } ${
                    key === highlightedKey && currentOperation
                      ? `operation-${currentOperation}`
                      : ''
                  }`}
                >
                  <span className='entry-key'>{String(key)}</span>
                  <span className='entry-separator'>→</span>
                  <span className='entry-value'>{String(value)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
