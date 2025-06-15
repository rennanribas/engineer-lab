import { createContext } from 'react'

export interface CodeLine {
  content: string
  isStep: boolean
  stepIndex?: number
  isActive?: boolean
  isFaded?: boolean
}

export interface CodePreviewState {
  lines: CodeLine[]
  currentStep: number
  title: string
}

export interface CodePreviewContextType {
  state: CodePreviewState
  updateLines: (lines: CodeLine[]) => void
  setCurrentStep: (step: number) => void
  setTitle: (title: string) => void
  generateLines: <T>(steps: T[], currentStep: number, generator: (step: T) => string) => void
}

export const CodePreviewContext = createContext<CodePreviewContextType | null>(null)