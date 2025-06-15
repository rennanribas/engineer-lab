import { useContext } from 'react'
import { CodePreviewContext, type CodePreviewContextType } from '../contexts/CodePreviewContextDefinition'

export const useCodePreview = (): CodePreviewContextType => {
  const context = useContext(CodePreviewContext)
  if (!context) {
    throw new Error('useCodePreview must be used within a CodePreviewProvider')
  }
  return context
}