import React from 'react'
import type { QuestionnaireAnswers, QuestionnaireQuestion } from '../../types'

interface ReviewStepProps {
  answers: QuestionnaireAnswers
  questions: QuestionnaireQuestion[]
  categories: readonly string[]
  onEditCategory: (category: string) => void
  onBack: () => void
  onSubmit: () => void
  canSubmit: boolean
}

export default function ReviewStep({
  answers,
  questions,
  categories,
  onEditCategory,
  onBack,
  onSubmit,
  canSubmit,
}: ReviewStepProps) {
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Review Your Answers</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Check your answers and edit anything you want to change before submitting.
      </p>

      {categories.map(category => {
        const categoryQuestions = questions.filter(question => question.category === category)
        return (
          <section key={category} className="card" style={{ marginBottom: '1rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontWeight: 700 }}>{category}</h3>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => onEditCategory(category)}>
                Edit
                <span className="sr-only"> {category} answers</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categoryQuestions.map(question => {
                const selected = answers[question.id] ?? []
                return (
                  <div key={question.id}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{question.question}</p>
                    {selected.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {selected.map(option => (
                          <span
                            key={option}
                            className="badge"
                            style={{ background: 'var(--color-primary)', color: 'white' }}
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="badge" style={{ background: 'var(--color-error)', color: 'white' }}>
                        Not answered
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      {!canSubmit && (
        <p
          role="alert"
          style={{
            color: 'var(--color-error)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          Some required questions are still unanswered. Use the Edit buttons above to complete them.
        </p>
      )}

      <div className="flex-between" style={{ marginTop: '2rem' }}>
        <button type="button" className="btn btn-outline" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={!canSubmit}>
          Submit &amp; See Results
        </button>
      </div>
    </div>
  )
}
