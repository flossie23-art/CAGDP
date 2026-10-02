import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuestionnaire, STEP_LABELS } from '../contexts/QuestionnaireContext'
import { questionnaireQuestions } from '../data/questions'
import { QUESTIONNAIRE_CATEGORIES, type QuestionnaireCategory } from '../types'
import { getRemainingSelections, getStepRequirement } from '../services/questionnaireValidation'
import ProgressIndicator from '../components/questionnaire/ProgressIndicator'
import QuestionCard from '../components/questionnaire/QuestionCard'
import ReviewStep from '../components/questionnaire/ReviewStep'
import RequirementBanner from '../components/questionnaire/RequirementBanner'
import StepActionBar from '../components/questionnaire/StepActionBar'

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
  const requirement = getStepRequirement(currentCategory, answers)
  const categoryLimit = getCategoryLimit(currentCategory)
  const selectedCount = getCategorySelectionCount(currentCategory)
  const remainingSelections = getRemainingSelections(currentCategory, answers)

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

  const screenTitle = isReviewStep ? 'Review Your Answers' : currentCategory
  const screenPurpose = isReviewStep
    ? 'Check your answers and edit anything you want to change before we work out your recommendations.'
    : 'One screen at a time. The next step unlocks once this one is complete.'

  const statusText = canProceed
    ? '✓ Step complete'
    : remainingSelections > 0
      ? `Select ${remainingSelections} more to continue`
      : categoryLimit
        ? `Choose ${Math.max(1, categoryLimit.min - selectedCount)} more ${categoryLimit.label}`
        : 'Keep going'

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

      <p className="step-eyebrow">
        Step {currentStep + 1} of {totalSteps} · {STEP_LABELS[currentStep]}
      </p>

      <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        {screenTitle}
      </h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1rem' }}>{screenPurpose}</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <RequirementBanner text={requirement.text} met={requirement.met} />
      </div>

      {isReviewStep ? (
        <ReviewStep
          answers={answers}
          questions={questionnaireQuestions}
          categories={QUESTIONNAIRE_CATEGORIES}
          canSubmit={canProceed}
          onEditCategory={category => goToStep(QUESTIONNAIRE_CATEGORIES.indexOf(category as QuestionnaireCategory))}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {categoryQuestions.map((question, position) => (
            <QuestionCard
              key={question.id}
              index={position + 1}
              question={question.question}
              options={question.options}
              selectedOptions={answers[question.id] ?? []}
              onToggle={option => toggleOption(question, option)}
              questionType={question.type}
              minSelections={question.minSelections}
              maxSelections={question.maxSelections}
              isOptionDisabled={option => isOptionDisabled(question, option)}
              isAnswered={isQuestionAnswered(question.id)}
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button type="button" className="btn btn-outline btn-sm" onClick={resetQuestionnaire}>
          Start over
        </button>
      </div>

      <StepActionBar
        showBack={currentStep > 0}
        canContinue={canProceed}
        statusText={statusText}
        statusMet={canProceed}
        continueLabel={isReviewStep ? 'Submit & See Results' : 'Continue'}
        onBack={previousStep}
        onContinue={handleContinue}
      />
    </div>
  )
}
