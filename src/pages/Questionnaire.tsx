import React from 'react'
import { useQuestionnaire } from '../hooks/useQuestionnaire'
import { questionnaireQuestions } from '../data/questions'
import ProgressIndicator from '../components/questionnaire/ProgressIndicator'
import QuestionCard from '../components/questionnaire/QuestionCard'
import { useNavigate } from 'react-router-dom'

export default function Questionnaire() {
  const {
    answers,
    currentStep,
    currentCategory,
    totalSteps,
    progress,
    updateAnswers,
    goToStep,
    nextStep,
    prevStep,
    submitQuestionnaire,
    canProceed,
  } = useQuestionnaire()

  const navigate = useNavigate()

  const categoryQuestions = questionnaireQuestions.filter(q => q.category === currentCategory)

  const handleToggle = (option: string) => {
    const current = answers[categoryQuestions[0]?.id || ''] || []
    const question = categoryQuestions[0]
    if (!question) return

    if (question.type === 'single') {
      updateAnswers(question.id, [option])
    } else {
      const updated = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      updateAnswers(question.id, updated)
    }
  }

  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1
  const canProceedNow = canProceed()

  const handleContinue = () => {
    if (isLastStep) {
      const results = submitQuestionnaire()
      navigate('/results')
    } else if (canProceedNow) {
      nextStep()
    }
  }

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
        categories={['Interest', 'Strengths', 'Subjects', 'Work Preferences', 'Career Goals', 'Review']}
        onStepClick={goToStep}
      />

      {isLastStep ? (
        <ReviewStep answers={answers} questionnaireQuestions={questionnaireQuestions} />
      ) : (
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            {currentCategory}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categoryQuestions.map(question => (
              <QuestionCard
                key={question.id}
                question={question.question}
                options={question.options}
                selectedOptions={answers[question.id] || []}
                onToggle={handleToggle}
                questionType={question.type}
                minSelections={question.minSelections}
              />
            ))}
          </div>
          {!canProceedNow && categoryQuestions.some(q => q.minSelections) && (
            <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: 600 }}>
              ⚠️ Please select at least {categoryQuestions.find(q => q.minSelections)?.minSelections} items before continuing
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button
              className="btn btn-outline"
              onClick={prevStep}
              disabled={isFirstStep}
              style={{ visibility: isFirstStep ? 'hidden' : 'visible' }}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleContinue}
              disabled={!canProceedNow && !isLastStep}
              style={{
                opacity: canProceedNow || isLastStep ? 1 : 0.5,
                cursor: canProceedNow || isLastStep ? 'pointer' : 'not-allowed',
              }}
            >
              {isLastStep ? 'Submit & See Results' : 'Continue'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ReviewStep({ answers, questionnaireQuestions }: { answers: Record<string, string[]>; questionnaireQuestions: typeof questionnaireQuestions }) {
  const categories = ['Interest', 'Strengths', 'Subjects', 'Work Preferences', 'Career Goals']

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Review Your Answers</h2>
      {categories.map(category => {
        const questions = questionnaireQuestions.filter(q => q.category === category)
        const allAnswers = questions.flatMap(q => answers[q.id] || [])
        if (allAnswers.length === 0) return null
        return (
          <div key={category} className="card" style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{category}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {allAnswers.map(answer => (
                <span key={answer} className="badge" style={{ background: 'var(--color-primary)', color: 'white' }}>
                  {answer}
                </span>
              ))}
            </div>
          </div>
        )
      })}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button className="btn btn-outline" onClick={() => window.history.back()}>Back</button>
        <button className="btn btn-primary" onClick={() => window.location.href = '/results'}>
          Submit & See Results
        </button>
      </div>
    </div>
  )
}
