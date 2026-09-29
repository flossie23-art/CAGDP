import React from 'react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  progress: number
  labels: string[]
  getStepState: (step: number) => 'complete' | 'available' | 'locked'
  onStepClick: (step: number) => void
}

const STATE_LABELS = {
  complete: 'completed',
  available: 'current',
  locked: 'not yet available',
} as const

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  progress,
  labels,
  getStepState,
  onStepClick,
}: ProgressIndicatorProps) {
  return (
    <nav aria-label="Questionnaire progress" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span style={{ color: 'var(--color-muted)' }}>{Math.round(progress)}%</span>
      </div>

      <div
        className="progress-bar"
        style={{ marginBottom: '1rem' }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Overall completion"
      >
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <ol
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {labels.map((label, index) => {
          const state = getStepState(index)
          const isLocked = state === 'locked'
          const isComplete = state === 'complete'
          const isCurrent = index === currentStep

          return (
            <li key={label} style={{ flex: '1 1 auto', minWidth: 'fit-content' }}>
              <button
                type="button"
                onClick={() => !isLocked && onStepClick(index)}
                disabled={isLocked}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Step ${index + 1} of ${totalSteps}: ${label}, ${STATE_LABELS[state]}`}
                style={{
                  width: '100%',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: `1px solid ${isCurrent ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  background: isCurrent
                    ? 'var(--color-primary)'
                    : isComplete
                      ? 'var(--color-surface)'
                      : 'var(--color-bg)',
                  color: isCurrent
                    ? 'white'
                    : isLocked
                      ? 'var(--color-muted)'
                      : 'var(--color-text)',
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                <span aria-hidden="true" style={{ marginRight: '0.25rem' }}>
                  {isComplete ? '✓' : index + 1}
                </span>
                {label}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
