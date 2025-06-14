import React from 'react'

export const EventLoopInfo: React.FC = () => {
  return (
    <div className='eventloop-info'>
      <div className='controls-section controls-section--info'>
        <h3 className='controls-title'>How it Works</h3>
        <div className='info-grid'>
          <div className='info-card'>
            <div className='info-icon'>📚</div>
            <h4>Call Stack</h4>
            <p>
              Executes functions synchronously in LIFO order. Must be empty for
              event loop to process queues.
            </p>
          </div>
          <div className='info-card'>
            <div className='info-icon'>⚡</div>
            <h4>Microtask Queue</h4>
            <p>
              High priority queue for Promises. Always processed before task
              queue when call stack is empty.
            </p>
          </div>
          <div className='info-card'>
            <div className='info-icon'>📋</div>
            <h4>Task Queue</h4>
            <p>
              Lower priority queue for timers and DOM events. Processed after
              all microtasks are complete.
            </p>
          </div>
          <div className='info-card'>
            <div className='info-icon'>🌐</div>
            <h4>Web APIs</h4>
            <p>
              Browser handles async operations like timers, HTTP requests, and
              DOM events outside the main thread.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
