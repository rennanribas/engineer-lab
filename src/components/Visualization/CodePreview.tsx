import React from 'react'
import { useCodePreview } from '../../hooks/useCodePreview'

type CodeToken = React.ReactElement<HTMLSpanElement>

export const CodePreview: React.FC = () => {
  const { state } = useCodePreview()



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

  return (
    <div className='code-preview'>
      <div className='code-header'>
        <div className='code-dots'>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className='code-title'>{state.title}</span>
      </div>
      <div className='code-content'>
        {state.lines.map((line, index: number) => (
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