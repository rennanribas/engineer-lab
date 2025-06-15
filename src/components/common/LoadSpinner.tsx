interface LoadSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
  label?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
}

const variantStyles = {
  primary: { color: 'var(--primary-600)' },
  secondary: { color: 'var(--text-secondary)' },
  accent: { color: 'var(--secondary-600)' },
}

export function LoadSpinner({
  size = 'md',
  variant = 'primary',
  className = '',
  label = 'Loading...',
}: LoadSpinnerProps) {
  const classes = ['animate-spin', sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className='flex items-center justify-center'
      role='status'
      aria-label={label}
    >
      <svg
        className={classes}
        style={variantStyles[variant]}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
      <span className='sr-only'>{label}</span>
    </div>
  )
}
