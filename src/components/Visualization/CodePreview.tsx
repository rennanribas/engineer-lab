import React from 'react'
import type { DemoStep } from '../../services/DemoService'

interface CodePreviewProps {
  steps: DemoStep[]
  currentStep: number
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  steps,
  currentStep,
}) => {
  const generateCodeLines = () => {
    const lines = [
      { content: 'const hashMap = new HashMap()', isStep: false },
      { content: '', isStep: false },
    ]

    steps.forEach((step, index) => {
      let codeLine = ''
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



  const parseCodeLine = (line: string) => {
    if (!line) return null
    
    const tokens = []
    const parts = line.split(/([\w]+|[.(),'"\s]+)/g).filter(Boolean)
    
    parts.forEach((part, index) => {
      const key = `${line}-${index}-${part}`
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

  const codeLines = generateCodeLines()

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
        {codeLines.map((line, index) => (
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