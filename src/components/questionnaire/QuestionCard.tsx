import React from 'react'

interface QuestionCardProps {
  question: string
  options: string[]
  selectedOptions: string[]
  onToggle: (option: string) => void
  questionType: 'single' | 'multiple'
  minSelections?: number
  maxSelections?: number
}

export default function QuestionCard({ question, options, selectedOptions, onToggle, questionType, minSelections, maxSelections }: QuestionCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{question}</h3>
        {minSelections && (
          <span style={{ fontSize: '0.75rem', color: 'var(--color-error)', fontWeight: 600 }}>
            Select {minSelections}{maxSelections ? `-${maxSelections}` : '+'}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map(option => {
          const isSelected = selectedOptions.includes(option)
          return (
            <label
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                background: isSelected ? 'var(--color-primary)' : 'white',
                color: isSelected ? 'white' : 'var(--color-text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type={questionType === 'single' ? 'radio' : 'checkbox'}
                checked={isSelected}
                onChange={() => onToggle(option)}
                style={{ display: 'none' }}
                aria-label={option}
              />
              <span style={{ fontWeight: 500 }}>{option}</span>
              {isSelected && (
                <span style={{ marginLeft: 'auto', fontSize: '0.875rem' }}>✓</span>
              )}
            </label>
          )
        })}
      </div>
{minSelections && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            {selectedOptions.length}/{maxSelections || options.length} selected
          </div>
        )}
    </div>
  )
}
