import React from 'react'

interface QuestionCardProps {
  question: string
  options: string[]
  selectedOptions: string[]
  onToggle: (option: string) => void
  questionType: 'single' | 'multiple'
  minSelections?: number
  maxSelections?: number
  isOptionDisabled?: (option: string) => boolean
  isAnswered?: boolean
  stepRequirement?: string
}

export default function QuestionCard({
  question,
  options,
  selectedOptions,
  onToggle,
  questionType,
  minSelections,
  maxSelections,
  isOptionDisabled,
  isAnswered = false,
  stepRequirement,
}: QuestionCardProps) {
  const questionId = `question-${question.replace(/\W+/g, '-').toLowerCase()}`
  const isMultiple = questionType === 'multiple'
  const isRequired = isMultiple ? Boolean(minSelections) : true
  const atMax = isMultiple && maxSelections !== undefined && selectedOptions.length >= maxSelections

  const requirementText = isMultiple && minSelections
    ? `Select ${minSelections}${maxSelections ? ` to ${maxSelections}` : ' or more'}`
    : isRequired
      ? 'Required'
      : 'Optional'

  const statusText = isMultiple
    ? `${selectedOptions.length} selected.`
    : selectedOptions.length > 0
      ? 'Answered.'
      : 'Not answered yet.'

  return (
    <fieldset
      className="card option-fieldset"
      style={{
        borderColor: isRequired && !isAnswered ? 'var(--color-warning)' : undefined,
        margin: 0,
        minWidth: 0,
      }}
    >
      <legend className="sr-only">{question}</legend>

      <div className="question-card-header">
        <h3 id={questionId} style={{ fontWeight: 600, fontSize: '1.125rem' }}>
          {question}
        </h3>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            color: isRequired ? 'var(--color-error)' : 'var(--color-muted)',
          }}
        >
          {requirementText}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map(option => {
          const isSelected = selectedOptions.includes(option)
          const isDisabled = isOptionDisabled ? isOptionDisabled(option) : false
          return (
            <label
              key={option}
              className="option-label"
              data-selected={isSelected || undefined}
              data-disabled={isDisabled && !isSelected ? true : undefined}
            >
              <input
                type={isMultiple ? 'checkbox' : 'radio'}
                name={questionId}
                value={option}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className="option-indicator"
                data-shape={isMultiple ? 'square' : 'round'}
              >
                {isSelected ? '✓' : ''}
              </span>
              <span style={{ fontWeight: 500 }}>{option}</span>
            </label>
          )
        })}
      </div>

      <p
        id={`${questionId}-status`}
        aria-live="polite"
        style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-muted)' }}
      >
        {statusText}
        {atMax ? ' You have reached the maximum for this question.' : ''}
        {stepRequirement ? ` ${stepRequirement}` : ''}
      </p>
    </fieldset>
  )
}
