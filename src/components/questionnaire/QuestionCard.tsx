import React from 'react'

interface QuestionCardProps {
  question: string
  options: string[]
  selectedOptions: string[]
  onToggle: (option: string) => void
  questionType: 'single' | 'multiple'
}

export default function QuestionCard({ question, options, selectedOptions, onToggle, questionType }: QuestionCardProps) {
  return (
    <div className="card">
      <h3 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.125rem' }}>{question}</h3>
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
            </label>
          )
        })}
      </div>
    </div>
  )
}
