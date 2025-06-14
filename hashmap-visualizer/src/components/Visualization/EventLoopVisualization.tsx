import React from 'react'
import type {
  EventLoopTask,
  EventLoopStep,
} from '../../services/EventLoopService'

interface EventLoopVisualizationProps {
  callStack: EventLoopTask[]
  taskQueue: EventLoopTask[]
  microtaskQueue: EventLoopTask[]
  webApis: EventLoopTask[]
  currentStep: number
  steps: EventLoopStep[]
}

interface TaskCardProps {
  task: EventLoopTask
  index: number
  isAnimating?: boolean
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  isAnimating = false,
}) => {
  const getTaskTypeClass = (type: string) => {
    switch (type) {
      case 'sync':
        return 'task-card--sync'
      case 'async':
        return 'task-card--async'
      case 'promise':
        return 'task-card--promise'
      case 'timer':
        return 'task-card--timer'
      default:
        return 'task-card--default'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'task-card--pending'
      case 'executing':
        return 'task-card--executing'
      case 'completed':
        return 'task-card--completed'
      default:
        return ''
    }
  }

  return (
    <div
      className={`task-card ${getTaskTypeClass(task.type)} ${getStatusClass(
        task.status
      )} ${isAnimating ? 'task-card--animating' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: `translateY(${index * 4}px)`,
      }}
    >
      <div className='task-card-header'>
        <div
          className={`task-type-indicator task-type-indicator--${task.type}`}
        >
          {task.type === 'sync' && '⚡'}
          {task.type === 'async' && '🔄'}
          {task.type === 'promise' && '✨'}
          {task.type === 'timer' && '⏰'}
        </div>
        <span className='task-type-label'>{task.type.toUpperCase()}</span>
        {task.delay !== undefined && (
          <span className='task-delay'>{task.delay}ms</span>
        )}
      </div>
      <div className='task-card-content'>
        <code className='task-name'>{task.name}</code>
      </div>
      <div className='task-status-bar'>
        <div
          className={`task-status-fill task-status-fill--${task.status}`}
        ></div>
      </div>
    </div>
  )
}

interface QueueSectionProps {
  title: string
  tasks: EventLoopTask[]
  className: string
  icon: string
  description: string
}

const QueueSection: React.FC<QueueSectionProps> = ({
  title,
  tasks,
  className,
  icon,
  description,
}) => {
  return (
    <div className={`queue-section ${className}`}>
      <div className='queue-header'>
        <div className='queue-title-container'>
          <span className='queue-icon'>{icon}</span>
          <h3 className='queue-title'>{title}</h3>
          <span className='queue-count'>{tasks.length}</span>
        </div>
        <p className='queue-description'>{description}</p>
      </div>
      <div className='queue-content'>
        <div className='queue-tasks'>
          {tasks.length === 0 ? (
            <div className='queue-empty'>
              <span className='queue-empty-icon'>📭</span>
              <span className='queue-empty-text'>Empty</span>
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                isAnimating={task.status === 'executing'}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export const EventLoopVisualization: React.FC<EventLoopVisualizationProps> = ({
  callStack,
  taskQueue,
  microtaskQueue,
  webApis,
  currentStep,
  steps,
}) => {
  const currentStepData = steps[currentStep - 1]

  return (
    <div className='eventloop-visualization'>
      <div className='eventloop-header'>
        <h2 className='eventloop-title'>JavaScript Event Loop</h2>
        {currentStepData && (
          <div className='current-step-info'>
            <span className='step-counter'>
              Step {currentStep} of {steps.length}
            </span>
            <p className='step-description'>{currentStepData.description}</p>
          </div>
        )}
      </div>

      <div className='eventloop-grid'>
        <QueueSection
          title='Call Stack'
          tasks={callStack}
          className='queue-section--callstack'
          icon='📚'
          description='Synchronous execution stack (LIFO)'
        />

        <QueueSection
          title='Web APIs'
          tasks={webApis}
          className='queue-section--webapis'
          icon='🌐'
          description='Browser APIs handling async operations'
        />

        <QueueSection
          title='Microtask Queue'
          tasks={microtaskQueue}
          className='queue-section--microtask'
          icon='⚡'
          description='High priority queue for Promises (FIFO)'
        />

        <QueueSection
          title='Task Queue'
          tasks={taskQueue}
          className='queue-section--taskqueue'
          icon='📋'
          description='Callback queue for timers and events (FIFO)'
        />
      </div>

      <div className='eventloop-flow'>
        <div className='flow-arrows'>
          <div className='flow-arrow flow-arrow--webapis-to-queues'>
            <span className='arrow-label'>Completed async operations</span>
          </div>
          <div className='flow-arrow flow-arrow--queues-to-stack'>
            <span className='arrow-label'>
              Event Loop checks queues when stack is empty
            </span>
          </div>
          <div className='flow-arrow flow-arrow--microtask-priority'>
            <span className='arrow-label'>
              Microtasks have priority over tasks
            </span>
          </div>
        </div>
      </div>

      <div className='eventloop-legend'>
        <h4 className='legend-title'>Task Types</h4>
        <div className='legend-items'>
          <div className='legend-item'>
            <div className='legend-indicator legend-indicator--sync'>⚡</div>
            <span>Synchronous</span>
          </div>
          <div className='legend-item'>
            <div className='legend-indicator legend-indicator--promise'>✨</div>
            <span>Promise/Microtask</span>
          </div>
          <div className='legend-item'>
            <div className='legend-indicator legend-indicator--timer'>⏰</div>
            <span>Timer/Callback</span>
          </div>
          <div className='legend-item'>
            <div className='legend-indicator legend-indicator--async'>🔄</div>
            <span>Async Operation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
