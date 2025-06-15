import React, { useEffect, useState } from 'react'
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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

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
      )} ${isAnimating ? 'task-card--animating' : ''} ${
        isVisible ? 'task-card--visible' : ''
      }`}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className='task-card-content'>
        <code className='task-name'>{task.name}</code>
        {task.delay !== undefined && (
          <span className='task-delay'>{task.delay}ms</span>
        )}
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
  isActive?: boolean
}

const QueueSection: React.FC<QueueSectionProps> = ({
  title,
  tasks,
  className,
  icon,
  description,
  isActive = false,
}) => {
  return (
    <div className={`queue-section ${className} ${isActive ? 'queue-section--active' : ''}`}>
      <div className='queue-header'>
        <div className='queue-title-container'>
          <span className='queue-icon'>{icon}</span>
          <h3 className='queue-title'>{title}</h3>
          <span className='queue-count'>{tasks.length}</span>
        </div>
      </div>
      <div className='queue-content'>
        <div className='queue-tasks'>
          {tasks.length === 0 ? (
            <div className='queue-empty'>
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

// EventLoopFlow component removed - no longer needed

const TaskTransition: React.FC<{ 
  isVisible: boolean; 
  fromSection: string; 
  toSection: string; 
  task: EventLoopTask 
}> = ({ isVisible, fromSection, toSection, task }) => {
  if (!isVisible) return null

  return (
    <div className={`task-transition task-transition--${fromSection}-to-${toSection}`}>
      <div className={`task-card task-card--${task.type} task-card--transitioning`}>
        <div className='task-card-content'>
          <span className='task-name'>{task.name}</span>
          {task.delay && <span className='task-delay'>{task.delay}ms</span>}
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
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [transitioningTask, setTransitioningTask] = useState<{
    task: EventLoopTask;
    from: string;
    to: string;
  } | null>(null)

  useEffect(() => {
    if (currentStepData) {
      setActiveSection(currentStepData.target)
      
      // Show task transition animation for move actions
      if (currentStepData.action === 'move' && currentStepData.task) {
        const fromSection = getPreviousLocation(currentStepData.task, currentStep - 1, steps)
        setTransitioningTask({
          task: currentStepData.task,
          from: fromSection,
          to: currentStepData.target
        })
        
        // Clear transition after animation
        setTimeout(() => setTransitioningTask(null), 1000)
      }
      
      const timer = setTimeout(() => setActiveSection(null), 1500)
      return () => clearTimeout(timer)
    }
  }, [currentStepData, currentStep, steps])

  const getPreviousLocation = (task: EventLoopTask, stepIndex: number, allSteps: EventLoopStep[]): string => {
    // Look backwards through steps to find where this task was before
    for (let i = stepIndex; i >= 0; i--) {
      const step = allSteps[i]
      if (step.task?.id === task.id && step.action === 'push') {
        return step.target
      }
    }
    return 'callStack' // Default assumption
  }

  const hasActiveTasks = callStack.some(task => task.status === 'executing') ||
                        webApis.some(task => task.status === 'executing') ||
                        microtaskQueue.some(task => task.status === 'executing') ||
                        taskQueue.some(task => task.status === 'executing')

  const getFlowDirection = (): 'to-apis' | 'to-queues' | 'to-stack' => {
    if (!currentStepData) return 'to-apis'
    
    if (currentStepData.action === 'move') {
      if (currentStepData.target === 'webApis') return 'to-apis'
      if (currentStepData.target === 'callStack') return 'to-stack'
      return 'to-queues'
    }
    
    return 'to-apis'
  }

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

      <div className='eventloop-container-grid'>
        <div className='eventloop-left'>
          <QueueSection
            title='Web APIs'
            tasks={webApis}
            className='queue-section--webapis'
            icon='API'
            description='Browser APIs handling async operations'
            isActive={activeSection === 'webApis'}
          />
        </div>

        <div className='eventloop-center'>
          <QueueSection
            title='Call Stack'
            tasks={callStack}
            className='queue-section--callstack'
            icon='CS'
            description='Synchronous execution stack (LIFO)'
            isActive={activeSection === 'callStack'}
          />
        </div>

        <div className='eventloop-right'>
          <div className='eventloop-queues'>
            <QueueSection
              title='Microtask Queue'
              tasks={microtaskQueue}
              className='queue-section--microtask'
              icon='μQ'
              description='High priority queue for Promises (FIFO)'
              isActive={activeSection === 'microtaskQueue'}
            />

            <QueueSection
              title='Task Queue'
              tasks={taskQueue}
              className='queue-section--taskqueue'
              icon='TQ'
              description='Callback queue for timers and events (FIFO)'
              isActive={activeSection === 'taskQueue'}
            />
          </div>
        </div>
        
        {/* Task Transition Animation */}
        {transitioningTask && (
          <TaskTransition
            isVisible={true}
            fromSection={transitioningTask.from}
            toSection={transitioningTask.to}
            task={transitioningTask.task}
          />
        )}
      </div>
    </div>
  )
}
