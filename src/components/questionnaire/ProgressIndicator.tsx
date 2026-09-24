import React from 'react'
import { Link } from 'react-router-dom'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  progress: number
  categories: string[]
  onStepClick: (step: number) => void
}

export default function ProgressIndicator({ currentStep, totalSteps, progress, categories, onStepClick }: ProgressIndicatorProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span style={{ color: 'var(--color-muted)' }}>{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: '1rem' }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => onStepClick(index)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: index === currentStep ? 'var(--color-primary)' : 'var(--color-border)',
              color: index === currentStep ? 'white' : 'var(--color-muted)',
              transition: 'all 0.2s ease',
            }}
            aria-label={`Go to step ${index + 1}: ${category}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
