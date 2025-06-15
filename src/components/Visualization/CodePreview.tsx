import React from 'react'
import { useCodePreview } from '../../hooks/useCodePreview'

type CodeToken = React.ReactElement<HTMLSpanElement>

interface CodePreviewProps {
  steps: unknown[]
  currentStep: number
  isPlaying: boolean
  onNext: () => void
  onPrevious: () => void
  onReset: () => void
  onPlay: () => void
  onPause: () => void
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  steps,
  currentStep,
  isPlaying,
  onNext,
  onPrevious,
  onReset,
  onPlay,
  onPause,
}) => {
  const { state } = useCodePreview()

  const parseCodeLine = (line: string): CodeToken[] | null => {
    if (!line) return null

    const tokens: CodeToken[] = []
    const parts: string[] = line.split(/([\w]+|[.(),'"\s]+)/g).filter(Boolean)

    parts.forEach((part: string, index: number) => {
      const key: string = `${line}-${index}-${part}`
      if (part === 'const') {
        tokens.push(
          <span key={key} className='code-keyword'>
            {part}
          </span>
        )
      } else if (part === 'hashMap') {
        tokens.push(
          <span key={key} className='code-variable'>
            {part}
          </span>
        )
      } else if (part === 'new') {
        tokens.push(
          <span key={key} className='code-keyword'>
            {part}
          </span>
        )
      } else if (part === 'HashMap') {
        tokens.push(
          <span key={key} className='code-class'>
            {part}
          </span>
        )
      } else if (['set', 'get', 'delete'].includes(part)) {
        tokens.push(
          <span key={key} className='code-method'>
            {part}
          </span>
        )
      } else if (part === '=') {
        tokens.push(
          <span key={key} className='code-operator'>
            {part}
          </span>
        )
      } else if (['(', ')', '.'].includes(part)) {
        tokens.push(
          <span key={key} className='code-bracket'>
            {part}
          </span>
        )
      } else if (part.startsWith("'") && part.endsWith("'")) {
        tokens.push(
          <span key={key} className='code-param'>
            {part}
          </span>
        )
      } else if (!isNaN(Number(part))) {
        tokens.push(
          <span key={key} className='code-param'>
            {part}
          </span>
        )
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
            key={`${index}-${line.content}-${
              line.isStep ? line.stepIndex : 'static'
            }`}
            className={`code-line ${line.isFaded ? 'code-line--fade' : ''} ${
              line.isActive ? 'code-line--active' : ''
            }`}
          >
            {parseCodeLine(line.content)}
          </div>
        ))}
      </div>
      <div className='debug-controls'>
        <div className='debug-controls-row'>
          <button
            onClick={onReset}
            className='debug-btn debug-btn--reset'
            title='Restart'
          >
            <svg viewBox='0 0 16 16' fill='currentColor'>
              <path d='M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8Z' />
            </svg>
          </button>
          <button
            onClick={onPrevious}
            className='debug-btn debug-btn--prev'
            disabled={currentStep === 0}
            title='Step back'
          >
            ⏮
          </button>
          {isPlaying ? (
            <button
              onClick={onPause}
              className='debug-btn debug-btn--pause'
              disabled={currentStep >= steps.length}
              title='Pause'
            >
              ⏸
            </button>
          ) : (
            <button
              onClick={onPlay}
              className='debug-btn debug-btn--play'
              disabled={currentStep >= steps.length}
              title='Continue'
            >
              ▶
            </button>
          )}
          <button
            onClick={onNext}
            className='debug-btn debug-btn--next'
            disabled={currentStep >= steps.length}
            title='Step over'
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  )
}
