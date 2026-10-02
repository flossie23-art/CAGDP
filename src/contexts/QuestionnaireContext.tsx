import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { calculateRecommendations } from '../services/recommendationEngine'
import {
  getCategorySelectionCount,
  getFirstIncompleteStep,
  isCategoryComplete,
  isOptionDisabled,
  isQuestionAnswered,
  isQuestionnaireComplete,
  toggleAnswer,
} from '../services/questionnaireValidation'
import { getCategoryLimit, getQuestionsByCategory, totalSteps } from '../data/questions'
import {
  QUESTIONNAIRE_CATEGORIES,
  REVIEW_CATEGORY,
  type CategorySelectionLimit,
  type QuestionnaireAnswers,
  type QuestionnaireQuestion,
  type RecommendationResult,
} from '../types'

export const STEP_LABELS = [...QUESTIONNAIRE_CATEGORIES, REVIEW_CATEGORY]

export type StepState = 'complete' | 'available' | 'locked'

interface QuestionnaireContextValue {
  answers: QuestionnaireAnswers
  currentStep: number
  currentCategory: string
  totalSteps: number
  progress: number
  results: RecommendationResult[] | null
  hasSubmitted: boolean
  isReviewStep: boolean
  canProceed: boolean
  getStepState: (step: number) => StepState
  getQuestions: (category: string) => QuestionnaireQuestion[]
  getCategoryLimit: (category: string) => CategorySelectionLimit | undefined
  getCategorySelectionCount: (category: string) => number
  isOptionDisabled: (question: QuestionnaireQuestion, option: string) => boolean
  isQuestionAnswered: (questionId: string) => boolean
  toggleOption: (question: QuestionnaireQuestion, option: string) => void
  goToStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  submitQuestionnaire: () => RecommendationResult[]
  resetQuestionnaire: () => void
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null)

/**
 * Questionnaire state is held in memory only. Nothing is written to
 * sessionStorage, localStorage or cookies, and no answers are sent anywhere, so
 * a reload discards them by design.
 */
export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<RecommendationResult[] | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const firstIncompleteStep = useMemo(() => getFirstIncompleteStep(answers), [answers])

  const getStepState = useCallback((step: number): StepState => {
    if (step === currentStep) return 'available'
    if (step < firstIncompleteStep) return 'complete'
    if (step === firstIncompleteStep) return 'available'
    return 'locked'
  }, [currentStep, firstIncompleteStep])

  const isReviewStep = currentStep === totalSteps - 1
  const currentCategory = isReviewStep ? REVIEW_CATEGORY : QUESTIONNAIRE_CATEGORIES[currentStep]

  const toggleOption = useCallback((question: QuestionnaireQuestion, option: string) => {
    setAnswers(previous => toggleAnswer(previous, question, option))
    setResults(null)
    setHasSubmitted(false)
  }, [])

  const goToStep = useCallback((step: number) => {
    if (step < 0 || step >= totalSteps) return
    if (step > firstIncompleteStep) return
    setCurrentStep(step)
  }, [firstIncompleteStep])

  const nextStep = useCallback(() => {
    setCurrentStep(previous => {
      const next = Math.min(previous + 1, totalSteps - 1)
      return next > firstIncompleteStep ? previous : next
    })
  }, [firstIncompleteStep])

  const previousStep = useCallback(() => {
    setCurrentStep(previous => Math.max(previous - 1, 0))
  }, [])

  const submitQuestionnaire = useCallback(() => {
    if (!isQuestionnaireComplete(answers)) return []
    const computed = calculateRecommendations(answers)
    setResults(computed)
    setHasSubmitted(true)
    return computed
  }, [answers])

  const resetQuestionnaire = useCallback(() => {
    setAnswers({})
    setCurrentStep(0)
    setResults(null)
    setHasSubmitted(false)
  }, [])

  const value = useMemo<QuestionnaireContextValue>(() => ({
    answers,
    currentStep,
    currentCategory,
    totalSteps,
    progress: ((currentStep + 1) / totalSteps) * 100,
    results,
    hasSubmitted,
    isReviewStep,
    canProceed: isReviewStep
      ? isQuestionnaireComplete(answers)
      : isCategoryComplete(currentCategory, answers),
    getStepState,
    getQuestions: getQuestionsByCategory,
    getCategoryLimit,
    getCategorySelectionCount: (category: string) => getCategorySelectionCount(category, answers),
    isOptionDisabled: (question: QuestionnaireQuestion, option: string) => isOptionDisabled(question, option, answers),
    isQuestionAnswered: (questionId: string) => {
      const question = getQuestionsByCategory(currentCategory).find(item => item.id === questionId)
      return question ? isQuestionAnswered(question, answers) : true
    },
    toggleOption,
    goToStep,
    nextStep,
    previousStep,
    submitQuestionnaire,
    resetQuestionnaire,
  }), [
    answers,
    currentStep,
    currentCategory,
    results,
    hasSubmitted,
    isReviewStep,
    getStepState,
    toggleOption,
    goToStep,
    nextStep,
    previousStep,
    submitQuestionnaire,
    resetQuestionnaire,
  ])

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  )
}

export function useQuestionnaire(): QuestionnaireContextValue {
  const context = useContext(QuestionnaireContext)
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider')
  }
  return context
}
