import React, { useState, useCallback, type ReactNode } from 'react'
import {
  CodePreviewContext,
  type CodePreviewContextType,
  type CodePreviewState,
  type CodeLine,
} from './CodePreviewContextDefinition'

interface CodePreviewProviderProps {
  children: ReactNode
  initialTitle?: string
}

export const CodePreviewProvider: React.FC<CodePreviewProviderProps> = ({
  children,
  initialTitle = 'demo.js',
}) => {
  const [state, setState] = useState<CodePreviewState>({
    lines: [],
    currentStep: 0,
    title: initialTitle,
  })

  const updateLines = useCallback((lines: CodeLine[]) => {
    setState((prev) => ({ ...prev, lines }))
  }, [])

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
      lines: prev.lines.map((line) => ({
        ...line,
        isActive: line.isStep && line.stepIndex === step - 1,
        isFaded: line.isStep && step > 0 && line.stepIndex !== step - 1,
      })),
    }))
  }, [])

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }))
  }, [])

  const generateLines = useCallback(
    <T,>(steps: T[], currentStep: number, generator: (step: T) => string) => {
      const initialLines = state.title.includes('event-loop') 
        ? [
            { content: 'console.log("Start")', isStep: false },
            { content: 'setTimeout(() => console.log("Timeout"), 0)', isStep: false },
            { content: 'Promise.resolve().then(() => console.log("Promise"))', isStep: false },
            { content: 'console.log("End")', isStep: false },
            { content: '', isStep: false },
            { content: '// Event Loop Execution:', isStep: false },
          ]
        : [
            { content: 'const hashMap = new HashMap()', isStep: false },
            { content: '', isStep: false },
          ]
      
      const lines: CodeLine[] = [...initialLines]

      steps.forEach((step: T, stepIndex: number) => {
        const codeLine = generator(step)

        lines.push({
          content: codeLine,
          isStep: true,
          stepIndex,
          isActive: stepIndex === currentStep - 1,
          isFaded: currentStep > 0 && stepIndex !== currentStep - 1,
        })
      })

      setState({
        lines,
        currentStep,
        title: state.title,
      })
    },
    [state.title]
  )

  const value: CodePreviewContextType = {
    state,
    updateLines,
    setCurrentStep,
    setTitle,
    generateLines,
  }

  return (
    <CodePreviewContext.Provider value={value}>
      {children}
    </CodePreviewContext.Provider>
  )
}
