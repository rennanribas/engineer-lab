import { useCallback } from 'react'
import { useCodePreview } from './useCodePreview'
import type { EventLoopStep } from '../services/EventLoopService'

export const useEventLoopCodeGenerator = () => {
  const { generateLines, setCurrentStep } = useCodePreview()

  const generateEventLoopCode = useCallback((step: EventLoopStep): string => {
    const { action, target, task, description } = step
    
    if (!task) return `// ${description}`

    switch (action) {
      case 'push':
        if (target === 'callStack') {
          if (task.type === 'sync') {
            return `// 🔄 Call Stack: ${task.name}`
          }
          return `// 🔄 Call Stack: Executing ${task.name}`
        }
        if (target === 'webApis') {
          return `// 🌐 Web APIs: ${task.name} registered`
        }
        if (target === 'microtaskQueue') {
          return `// ⚡ Microtask Queue: ${task.name} queued`
        }
        if (target === 'taskQueue') {
          return `// 📋 Task Queue: ${task.name} queued`
        }
        break
        
      case 'pop':
        return `// ✅ Completed: ${task.name}`
        
      case 'move':
        if (target === 'callStack') {
          return `// ➡️  Event Loop: Moving ${task.name} to Call Stack`
        }
        if (target === 'taskQueue') {
          return `// ➡️  ${task.name} → Task Queue`
        }
        if (target === 'microtaskQueue') {
          return `// ➡️  ${task.name} → Microtask Queue`
        }
        break
        
      case 'execute':
        return `// 🚀 Executing: ${task.name}`
        
      default:
        return `// ${description}`
    }
    
    return `// ${description}`
  }, [])

  const updateCodePreview = useCallback(
    (steps: EventLoopStep[], currentStep: number) => {
      generateLines(steps, currentStep, generateEventLoopCode)
      setCurrentStep(currentStep)
    },
    [generateLines, setCurrentStep, generateEventLoopCode]
  )

  return {
    updateCodePreview,
    generateEventLoopCode,
  }
}