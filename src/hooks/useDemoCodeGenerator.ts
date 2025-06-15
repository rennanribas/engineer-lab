import { useCallback } from 'react'
import { useCodePreview } from './useCodePreview'
import type { DemoStep } from '../services/HashMapService'

export const useDemoCodeGenerator = () => {
  const { generateLines, setCurrentStep } = useCodePreview()

  const generateDemoCode = useCallback((step: DemoStep): string => {
    switch (step.operation) {
      case 'set':
        return `hashMap.set('${step.key}', ${
          typeof step.value === 'string' ? `'${step.value}'` : step.value
        })`
      case 'get':
        return `hashMap.get('${step.key}')`
      case 'delete':
        return `hashMap.delete('${step.key}')`
      default:
        return ''
    }
  }, [])

  const updateCodePreview = useCallback(
    (steps: DemoStep[], currentStep: number) => {
      generateLines(steps, currentStep, generateDemoCode)
      setCurrentStep(currentStep)
    },
    [generateLines, setCurrentStep, generateDemoCode]
  )

  return {
    updateCodePreview,
    generateDemoCode,
  }
}
