import React from 'react'
import type { DemoStep } from '../../services/DemoService'

interface CodePreviewProps {
  steps: DemoStep[]
  currentStep: number
}

interface CodeLine {
  content: string
  isStep: boolean
  stepIndex?: number
  isActive?: boolean
  isFaded?: boolean
}

type CodeToken = React.ReactElement<HTMLSpanElement>

export const CodePreview: React.FC<CodePreviewProps> = ({
  steps,
  currentStep,
}) => {
  const generateCodeLines = (): CodeLine[] => {
    const lines: CodeLine[] = [
      { content: 'const hashMap = new HashMap()', isStep: false },
      { content: '', isStep: false },
    ]

    steps.forEach((step: DemoStep, index: number) => {
      let codeLine: string = ''
      switch (step.operation) {
        case 'set':
          codeLine = `hashMap.set('${step.key}', ${typeof step.value === 'string' ? `'${step.value}'` : step.value})`
          break
        case 'get':
          codeLine = `hashMap.get('${step.key}')`
          break
        case 'delete':
          codeLine = `hashMap.delete('${step.key}')`
          break
      }
      
      lines.push({
        content: codeLine,
        isStep: true,
        stepIndex: index,
        isActive: index === currentStep - 1,
        isFaded: currentStep > 0 && index !== currentStep - 1
      })
    })

    return lines
  }



  const parseCodeLine = (line: string): CodeToken[] | null => {
    if (!line) return null
    
    const tokens: CodeToken[] = []
    const parts: string[] = line.split(/([\w]+|[.(),'"\s]+)/g).filter(Boolean)
    
    parts.forEach((part: string, index: number) => {
      const key: string = `${line}-${index}-${part}`
      if (part === 'const') {
        tokens.push(<span key={key} className='code-keyword'>{part}</span>)
      } else if (part === 'hashMap') {
        tokens.push(<span key={key} className='code-variable'>{part}</span>)
      } else if (part === 'new') {
        tokens.push(<span key={key} className='code-keyword'>{part}</span>)
      } else if (part === 'HashMap') {
        tokens.push(<span key={key} className='code-class'>{part}</span>)
      } else if (['set', 'get', 'delete'].includes(part)) {
        tokens.push(<span key={key} className='code-method'>{part}</span>)
      } else if (part === '=') {
        tokens.push(<span key={key} className='code-operator'>{part}</span>)
      } else if (['(', ')', '.'].includes(part)) {
        tokens.push(<span key={key} className='code-bracket'>{part}</span>)
      } else if (part.startsWith("'") && part.endsWith("'")) {
        tokens.push(<span key={key} className='code-param'>{part}</span>)
      } else if (!isNaN(Number(part))) {
        tokens.push(<span key={key} className='code-param'>{part}</span>)
      } else {
        tokens.push(<span key={key}>{part}</span>)
      }
    })
    
    return tokens
  }

  const codeLines: CodeLine[] = generateCodeLines()

  return (
    <div className='code-preview'>
      <div className='code-header'>
        <div className='code-dots'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className='code-title'>demo.js</span>
      </div>
      <div className='code-content'>
        {codeLines.map((line: CodeLine, index: number) => (
          <div
            key={`${index}-${line.content}-${line.isStep ? line.stepIndex : 'static'}`}
            className={`code-line ${
              line.isFaded ? 'code-line--fade' : ''
            } ${
              line.isActive ? 'code-line--active' : ''
            }`}
          >
            {parseCodeLine(line.content)}
          </div>
        ))}
      </div>
    </div>
  )
}