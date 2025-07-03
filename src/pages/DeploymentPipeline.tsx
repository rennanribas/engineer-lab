import React, { useState, useEffect, useCallback, useTransition } from 'react'
import { motion, useAnimationControls, AnimatePresence } from 'motion/react'

// Modern React 19.1 hooks for state management
const usePipelineState = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
  const [selectedChange, setSelectedChange] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [processingBaskets, setProcessingBaskets] = useState<Set<string>>(
    new Set()
  )
  const [isPending, startTransition] = useTransition()

  const resetPipeline = useCallback(() => {
    startTransition(() => {
      setCurrentStep(0)
      setSelectedRepo(null)
      setSelectedChange(null)
      setIsPlaying(false)
      setProcessingBaskets(new Set())
    })
  }, [])

  const selectChange = useCallback((repo: string, change: string) => {
    startTransition(() => {
      setSelectedRepo(repo)
      setSelectedChange(change)
      setCurrentStep(0)
    })
  }, [])

  return {
    currentStep,
    selectedRepo,
    selectedChange,
    isPlaying,
    processingBaskets,
    isPending,
    resetPipeline,
    selectChange,
    setCurrentStep,
    setIsPlaying,
    setProcessingBaskets,
  }
}

// Liquid Glass Card Component
const LiquidGlassCard: React.FC<{
  children: React.ReactNode
  className?: string
  isActive?: boolean
  isProcessing?: boolean
  onClick?: () => void
}> = ({
  children,
  className = '',
  isActive = false,
  isProcessing = false,
  onClick,
}) => {
  const springConfig = { type: 'spring' as const, stiffness: 400, damping: 30 }

  return (
    <motion.div
      className={`liquid-glass-card ${className} ${
        isActive ? 'liquid-glass-card--active' : ''
      } ${isProcessing ? 'liquid-glass-card--processing' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springConfig}
      layout
    >
      <div className='liquid-glass-backdrop' />
      <div className='liquid-glass-content'>{children}</div>
      {isProcessing && (
        <motion.div
          className='liquid-processing-effect'
          animate={{
            background: [
              'radial-gradient(circle at 0% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}

// Processing Basket Component with improved positioning
const ProcessingBasket: React.FC<{
  title: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  isProcessing: boolean
  position: { x: number; y: number }
  size?: 'small' | 'medium' | 'large'
  stepNumber?: number
}> = ({
  title,
  description,
  icon,
  isActive,
  isProcessing,
  position,
  size = 'medium',
  stepNumber,
}) => {
  const controls = useAnimationControls()

  useEffect(() => {
    if (isProcessing) {
      controls.start({
        rotate: [0, 2, -2, 0],
        scale: [1, 1.03, 1],
        transition: { duration: 0.6, repeat: 3 },
      })
    }
  }, [isProcessing, controls])

  return (
    <motion.div
      className='processing-basket'
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={controls}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0.2 + (stepNumber || 0) * 0.1,
        type: 'spring',
        stiffness: 300,
      }}
    >
      <LiquidGlassCard
        isActive={isActive}
        isProcessing={isProcessing}
        className={`basket-card basket-card--${size}`}
      >
        {stepNumber && <div className='basket-step-number'>{stepNumber}</div>}

        <div className='basket-icon'>{icon}</div>
        <h3 className='basket-title'>{title}</h3>
        <p className='basket-description'>{description}</p>

        {isProcessing && (
          <motion.div
            className='processing-indicator'
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
              <circle
                cx='12'
                cy='12'
                r='8'
                stroke='currentColor'
                strokeWidth='2'
                strokeDasharray='6 3'
              />
            </svg>
          </motion.div>
        )}
      </LiquidGlassCard>
    </motion.div>
  )
}

// Enhanced Process Card that flows between baskets
const ProcessCard: React.FC<{
  fromPosition: { x: number; y: number }
  toPosition: { x: number; y: number }
  type: 'code' | 'image' | 'deploy' | 'infrastructure'
  changeLabel: string
  onComplete?: () => void
  delay?: number
}> = ({
  fromPosition,
  toPosition,
  type,
  changeLabel,
  onComplete,
  delay = 0,
}) => {
  const controls = useAnimationControls()

  useEffect(() => {
    const animate = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay))

      await controls.start({
        x: `${toPosition.x - fromPosition.x}%`,
        y: `${toPosition.y - fromPosition.y}%`,
        transition: {
          duration: 2.5,
          ease: 'easeInOut',
        },
      })
      onComplete?.()
    }
    animate()
  }, [controls, fromPosition, toPosition, onComplete, delay])

  const getProcessStyle = () => {
    const styles = {
      code: 'process-card--code',
      image: 'process-card--image',
      deploy: 'process-card--deploy',
      infrastructure: 'process-card--infrastructure',
    }
    return `process-card ${styles[type]}`
  }

  return (
    <motion.div
      animate={controls}
      className={getProcessStyle()}
      style={{
        position: 'absolute',
        left: `${fromPosition.x}%`,
        top: `${fromPosition.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 30,
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className='process-card-content'>
        <div className='process-card-icon'>
          {type === 'code' && (
            <svg width='16' height='16' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M12.316 3.051a1 1 0 01.633 1.265L11.91 6.37l1.043.02a1 1 0 01.993 1.009l-.01 2.439 1.08.048a1 1 0 01.943 1.096l-.268 2.78a1 1 0 01-.995.904H3.304a1 1 0 01-.995-.904l-.268-2.78a1 1 0 01.943-1.096l1.08-.048-.01-2.44a1 1 0 01.993-1.008l1.043-.02L4.05 4.316a1 1 0 01.633-1.265l1.36-.464a1 1 0 011.114.249L10 5.415l2.843-2.579a1 1 0 011.114-.249l1.36.464z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {type === 'image' && (
            <svg width='16' height='16' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' />
            </svg>
          )}
          {type === 'deploy' && (
            <svg width='16' height='16' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
                clipRule='evenodd'
              />
            </svg>
          )}
          {type === 'infrastructure' && (
            <svg width='16' height='16' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 14v-1h10v1H5zm10-3H5V9h10v4zm0-6H5V5h10v2z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        <span className='process-card-label'>{changeLabel}</span>
      </div>

      <motion.div
        className='process-card-pulse'
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  )
}

// Repository Selection Panel
const RepositoryPanel: React.FC<{
  onSelectChange: (repo: string, change: string) => void
  selectedRepo: string | null
  selectedChange: string | null
}> = ({ onSelectChange, selectedRepo, selectedChange }) => {
  const repositories = [
    {
      id: 'infra-rennan-tech',
      name: 'Infrastructure',
      description: 'Terraform & AWS Resources',
      icon: (
        <svg width='24' height='24' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 14v-1h10v1H5zm10-3H5V9h10v4zm0-6H5V5h10v2z'
            clipRule='evenodd'
          />
        </svg>
      ),
      changes: [
        {
          id: 'infrastructure-update',
          label: 'Update Infrastructure',
          description: 'Modify AWS resources',
        },
        {
          id: 'security-patch',
          label: 'Security Patch',
          description: 'Apply security updates',
        },
      ],
    },
    {
      id: 'engineer-lab',
      name: 'Engineer Lab',
      description: 'Interactive Platform',
      icon: (
        <svg width='24' height='24' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
            clipRule='evenodd'
          />
        </svg>
      ),
      changes: [
        {
          id: 'new-feature',
          label: 'New Feature',
          description: 'Add pipeline visualization',
        },
        {
          id: 'bug-fix',
          label: 'Bug Fix',
          description: 'Fix animation issues',
        },
        {
          id: 'ui-update',
          label: 'UI Update',
          description: 'Improve user interface',
        },
      ],
    },
    {
      id: 'rennan-tech-landing',
      name: 'Landing Page',
      description: 'Main Website',
      icon: (
        <svg width='24' height='24' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
      changes: [
        {
          id: 'content-update',
          label: 'Content Update',
          description: 'Update portfolio content',
        },
        {
          id: 'performance-optimization',
          label: 'Performance',
          description: 'Optimize loading speed',
        },
      ],
    },
  ]

  return (
    <div className='repository-panel'>
      <h3 className='panel-title'>Choose what to deploy</h3>
      <div className='repositories-grid'>
        {repositories.map((repo) => (
          <LiquidGlassCard
            key={repo.id}
            className='repo-card'
            isActive={selectedRepo === repo.id}
          >
            <div className='repo-header'>
              <div className='repo-icon'>{repo.icon}</div>
              <div className='repo-info'>
                <h4 className='repo-name'>{repo.name}</h4>
                <p className='repo-description'>{repo.description}</p>
              </div>
            </div>

            <div className='repo-changes'>
              {repo.changes.map((change) => (
                <motion.button
                  key={change.id}
                  className={`change-button ${
                    selectedRepo === repo.id && selectedChange === change.id
                      ? 'change-button--selected'
                      : ''
                  }`}
                  onClick={() => onSelectChange(repo.id, change.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className='change-label'>{change.label}</span>
                  <span className='change-description'>
                    {change.description}
                  </span>
                </motion.button>
              ))}
            </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  )
}

export const DeploymentPipeline: React.FC = () => {
  const {
    currentStep,
    selectedRepo,
    selectedChange,
    isPlaying,
    processingBaskets,
    isPending,
    resetPipeline,
    selectChange,
    setCurrentStep,
    setIsPlaying,
    setProcessingBaskets,
  } = usePipelineState()

  const [processCards, setProcessCards] = useState<
    Array<{
      id: string
      fromPosition: { x: number; y: number }
      toPosition: { x: number; y: number }
      type: 'code' | 'image' | 'deploy' | 'infrastructure'
      changeLabel: string
      delay: number
    }>
  >([])

  // Organized basket positions in a cleaner flow
  const baskets = [
    // Row 1 - Source and Build
    {
      id: 'github',
      title: 'GitHub',
      description: 'Source Code',
      position: { x: 15, y: 30 },
      size: 'medium' as const,
      stepNumber: 1,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M12.316 3.051a1 1 0 01.633 1.265L11.91 6.37l1.043.02a1 1 0 01.993 1.009l-.01 2.439 1.08.048a1 1 0 01.943 1.096l-.268 2.78a1 1 0 01-.995.904H3.304a1 1 0 01-.995-.904l-.268-2.78a1 1 0 01.943-1.096l1.08-.048-.01-2.44a1 1 0 01.993-1.008l1.043-.02L4.05 4.316a1 1 0 01.633-1.265l1.36-.464a1 1 0 011.114.249L10 5.415l2.843-2.579a1 1 0 011.114-.249l1.36.464z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },

    {
      id: 'actions',
      title: 'GitHub Actions',
      description: 'CI/CD Pipeline',
      position: { x: 50, y: 20 },
      size: 'large' as const,
      stepNumber: 2,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },

    // Row 2 - Processing branches
    {
      id: 'ecr',
      title: 'Amazon ECR',
      description: 'Container Registry',
      position: { x: 75, y: 40 },
      size: 'medium' as const,
      stepNumber: 3,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' />
        </svg>
      ),
    },

    {
      id: 'terraform',
      title: 'Terraform',
      description: 'Infrastructure as Code',
      position: { x: 25, y: 60 },
      size: 'medium' as const,
      stepNumber: 3,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 14v-1h10v1H5zm10-3H5V9h10v4zm0-6H5V5h10v2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },

    // Row 3 - Deployment and Production
    {
      id: 'ec2',
      title: 'AWS EC2',
      description: 'Application Host',
      position: { x: 50, y: 80 },
      size: 'large' as const,
      stepNumber: 4,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },

    {
      id: 'users',
      title: 'Live Website',
      description: 'Production',
      position: { x: 85, y: 70 },
      size: 'medium' as const,
      stepNumber: 5,
      icon: (
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      ),
    },
  ]

  // Pipeline steps based on selected repository and change
  const getPipelineSteps = () => {
    if (!selectedRepo || !selectedChange) return []

    const baseSteps = [
      { id: 'github', title: 'Code Push', description: 'Push to repository' },
      { id: 'actions', title: 'CI/CD Trigger', description: 'Build and test' },
    ]

    if (selectedRepo === 'infra-rennan-tech') {
      return [
        ...baseSteps,
        {
          id: 'terraform',
          title: 'Provision',
          description: 'Update infrastructure',
        },
        { id: 'ec2', title: 'Deploy', description: 'Update services' },
        { id: 'users', title: 'Live', description: 'Available to users' },
      ]
    } else {
      return [
        ...baseSteps,
        { id: 'ecr', title: 'Build Image', description: 'Create container' },
        { id: 'ec2', title: 'Deploy', description: 'Update application' },
        { id: 'users', title: 'Live', description: 'Available to users' },
      ]
    }
  }

  const pipelineSteps = getPipelineSteps()

  const startPipeline = useCallback(() => {
    if (!selectedRepo || !selectedChange || pipelineSteps.length === 0) return

    setIsPlaying(true)
    setCurrentStep(0)
    setProcessCards([])

    let stepIndex = 0
    const processStep = () => {
      if (stepIndex >= pipelineSteps.length) {
        setIsPlaying(false)
        return
      }

      const currentBasket = pipelineSteps[stepIndex].id
      setProcessingBaskets((prev) => new Set([...prev, currentBasket]))

      // Create process card if not the first step
      if (stepIndex > 0) {
        const fromBasket = baskets.find(
          (b) => b.id === pipelineSteps[stepIndex - 1].id
        )
        const toBasket = baskets.find((b) => b.id === currentBasket)

        if (fromBasket && toBasket) {
          const flowType =
            stepIndex <= 2 ? 'code' : stepIndex === 3 ? 'image' : 'deploy'
          const changeLabel = selectedChange.replace('-', ' ').toUpperCase()

          setProcessCards((prev) => [
            ...prev,
            {
              id: `process-${stepIndex}-${Date.now()}`,
              fromPosition: fromBasket.position,
              toPosition: toBasket.position,
              type: flowType,
              changeLabel,
              delay: 0,
            },
          ])
        }
      }

      setTimeout(() => {
        setProcessingBaskets((prev) => {
          const newSet = new Set(prev)
          newSet.delete(currentBasket)
          return newSet
        })

        setCurrentStep(stepIndex + 1)

        stepIndex++
        if (stepIndex < pipelineSteps.length) {
          setTimeout(processStep, 1200)
        } else {
          setIsPlaying(false)
        }
      }, 2800)
    }

    processStep()
  }, [selectedRepo, selectedChange, pipelineSteps, baskets])

  // Clean up process cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setProcessCards([])
    }, 8000)
    return () => clearTimeout(timer)
  }, [processCards])

  return (
    <div className='deployment-pipeline'>
      {/* Header */}
      <section className='page-header'>
        <div className='page-header-content'>
          <motion.h1
            className='page-header-title'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Interactive Deployment Pipeline
          </motion.h1>
          <motion.p
            className='page-header-subtitle'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose a repository and change type to watch the automated
            deployment flow
          </motion.p>
        </div>
      </section>

      <div className='pipeline-container'>
        {/* Repository Selection */}
        <RepositoryPanel
          onSelectChange={selectChange}
          selectedRepo={selectedRepo}
          selectedChange={selectedChange}
        />

        {/* Controls */}
        {selectedRepo && selectedChange && (
          <motion.div
            className='pipeline-controls'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className='control-buttons'>
              <motion.button
                onClick={startPipeline}
                disabled={isPlaying || isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`control-button control-button--play ${
                  isPlaying || isPending ? 'control-button--disabled' : ''
                }`}
              >
                {isPlaying ? 'Deploying...' : 'Start Deployment'}
              </motion.button>

              <motion.button
                onClick={resetPipeline}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='control-button control-button--reset'
              >
                Reset
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Pipeline Visualization */}
        {selectedRepo && selectedChange && (
          <motion.div
            className='pipeline-visualization'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Processing Baskets */}
            {baskets.map((basket) => (
              <ProcessingBasket
                key={basket.id}
                {...basket}
                isActive={pipelineSteps.some((step) => step.id === basket.id)}
                isProcessing={processingBaskets.has(basket.id)}
              />
            ))}

            {/* Process Cards */}
            <AnimatePresence>
              {processCards.map((processCard) => (
                <ProcessCard
                  key={processCard.id}
                  {...processCard}
                  onComplete={() => {
                    setProcessCards((prev) =>
                      prev.filter((pc) => pc.id !== processCard.id)
                    )
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Current Step Info */}
        {isPlaying && currentStep < pipelineSteps.length && (
          <motion.div
            className='current-step-display'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LiquidGlassCard className='step-info-card'>
              <h3 className='current-step-title'>
                Step {currentStep + 1}: {pipelineSteps[currentStep]?.title}
              </h3>
              <p className='current-step-description'>
                {pipelineSteps[currentStep]?.description}
              </p>
              <div className='step-progress-bar'>
                <div
                  className='step-progress-fill'
                  style={{
                    width: `${
                      ((currentStep + 1) / pipelineSteps.length) * 100
                    }%`,
                  }}
                />
              </div>
            </LiquidGlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
