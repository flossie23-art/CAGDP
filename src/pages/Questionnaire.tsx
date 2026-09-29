import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuestionnaire, STEP_LABELS } from '../contexts/QuestionnaireContext'
import { questionnaireQuestions } from '../data/questions'
import { QUESTIONNAIRE_CATEGORIES, type QuestionnaireCategory } from '../types'
import ProgressIndicator from '../components/questionnaire/ProgressIndicator'
import QuestionCard from '../components/questionnaire/QuestionCard'
import ReviewStep from '../components/questionnaire/ReviewStep'

export default function Questionnaire() {
  const {
    answers,
    currentStep,
    currentCategory,
    totalSteps,
    progress,
    getStepState,
    getQuestions,
    getCategoryLimit,
    getCategorySelectionCount,
    getUnanswered,
    isOptionDisabled,
    isQuestionAnswered,
    canProceed,
    toggleOption,
    goToStep,
    nextStep,
    previousStep,
    submitQuestionnaire,
    resetQuestionnaire,
  } = useQuestionnaire()

  const navigate = useNavigate()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isReviewStep = currentStep === totalSteps - 1
  const categoryQuestions = getQuestions(currentCategory)
  const categoryLimit = getCategoryLimit(currentCategory)
  const categorySelected = getCategorySelectionCount(currentCategory)
  const unanswered = getUnanswered(currentCategory)

  useEffect(() => {
    headingRef.current?.focus()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentStep])

  const handleContinue = () => {
    if (isReviewStep) {
      submitQuestionnaire()
      navigate('/results')
      return
    }
    if (canProceed) nextStep()
  }

  const stepRequirement = categoryLimit
    ? `Across this step choose ${categoryLimit.min}-${categoryLimit.max} ${categoryLimit.label} in total.`
    : undefined

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}>
        Career Interest Questionnaire
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Answer these questions to get personalized recommendations
      </p>

      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
        labels={STEP_LABELS}
        getStepState={getStepState}
        onStepClick={goToStep}
      />

      {isReviewStep ? (
        <ReviewStep
          answers={answers}
          questions={questionnaireQuestions}
          categories={QUESTIONNAIRE_CATEGORIES}
          canSubmit={canProceed}
          onEditCategory={category => goToStep(QUESTIONNAIRE_CATEGORIES.indexOf(category as QuestionnaireCategory))}
          onBack={previousStep}
          onSubmit={handleContinue}
        />
      ) : (
        <div>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {currentCategory}
          </h2>

          {categoryLimit && (
            <p
              aria-live="polite"
              style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}
            >
              Choose {categoryLimit.min}-{categoryLimit.max} {categoryLimit.label} in total. You have
              selected {categorySelected}.
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categoryQuestions.map(question => (
              <QuestionCard
                key={question.id}
                question={question.question}
                options={question.options}
                selectedOptions={answers[question.id] ?? []}
                onToggle={option => toggleOption(question, option)}
                questionType={question.type}
                minSelections={question.minSelections}
                maxSelections={question.maxSelections}
                isOptionDisabled={option => isOptionDisabled(question, option)}
                isAnswered={isQuestionAnswered(question.id)}
                stepRequirement={stepRequirement}
              />
            ))}
          </div>

          <div aria-live="polite" style={{ minHeight: '1.5rem', marginTop: '0.75rem' }}>
            {unanswered.length > 0 && (
              <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', fontWeight: 600 }}>
                {unanswered.length === 1
                  ? 'Answer the remaining question to continue: '
                  : `Answer the remaining ${unanswered.length} questions to continue: `}
                {unanswered.map(item => item.question.question).join(' · ')}
              </p>
            )}
            {unanswered.length === 0 && categoryLimit && (
              <p style={{ color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 600 }}>
                ✓ Step complete. You selected {categorySelected} {categoryLimit.label}.
              </p>
            )}
            {unanswered.length === 0 && !categoryLimit && (
              <p style={{ color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: 600 }}>
                ✓ Step complete.
              </p>
            )}
          </div>

          <div className="flex-between" style={{ marginTop: '1.5rem' }}>
            {currentStep > 0 ? (
              <button type="button" className="btn btn-outline" onClick={previousStep}>
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!canProceed}
            >
              Continue
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={resetQuestionnaire}>
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
