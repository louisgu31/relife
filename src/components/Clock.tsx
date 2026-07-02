import { useEffect, useState } from 'react'
import { format } from 'date-fns'

interface ClockProps {
  variant?: 'large' | 'medium' | 'small'
}

export function Clock({ variant = 'large' }: ClockProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const sizeClasses = {
    large: 'text-7xl md:text-9xl font-light tracking-tight',
    medium: 'text-4xl md:text-5xl font-light tracking-tight',
    small: 'text-xl font-light',
  }

  return (
    <div className="flex flex-col items-center text-ink">
      <div className="relative px-8 py-2 paper-texture rounded">
        <div className={`${sizeClasses[variant]} font-serif relative z-10`}>
          {format(now, 'HH:mm')}
        </div>
      </div>
      {variant !== 'small' && (
        <div className="text-ink-secondary text-sm md:text-base mt-2 font-serif font-light tracking-wide">
          {format(now, 'EEEE, MMMM d')}
        </div>
      )}
    </div>
  )
}
