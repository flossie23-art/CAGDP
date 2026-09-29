import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { calculateRecommendations } from '../services/recommendationEngine'
import {
  getCategorySelectionCount,
  getFirstIncompleteStep,
  getRequiredCount,
  getUnansweredQuestions,
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

const STORAGE_KEY = 'caegdp:questionnaire'

export const STEP_LABELS = [...QUESTIONNAIRE_CATEGORIES, REVIEW_CATEGORY]

export type StepState = 'complete' | 'available' | 'locked'

export interface UnansweredQuestion {
  question: QuestionnaireQuestion
  selectedCount: number
  requiredCount: number
  maxSelections?: number
}

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
  getUnanswered: (category: string) => UnansweredQuestion[]
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

interface PersistedState {
  answers: QuestionnaireAnswers
  currentStep: number
  results: RecommendationResult[] | null
  hasSubmitted: boolean
}

function readPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    if (!parsed || typeof parsed !== 'object' || !parsed.answers || typeof parsed.answers !== 'object') {
      return null
    }
    const answers: QuestionnaireAnswers = {}
    Object.entries(parsed.answers).forEach(([questionId, options]) => {
      if (Array.isArray(options)) answers[questionId] = options.filter(item => typeof item === 'string')
    })
    const currentStep = typeof parsed.currentStep === 'number' ? parsed.currentStep : 0
    return {
      answers,
      currentStep: Math.min(Math.max(currentStep, 0), totalSteps - 1),
      results: Array.isArray(parsed.results) ? parsed.results : null,
      hasSubmitted: parsed.hasSubmitted === true,
    }
  } catch {
    return null
  }
}

export function QuestionnaireProvider({ children }: { children: React.ReactNode }) {
  const initial = useMemo(readPersistedState, [])
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(() => initial?.answers ?? {})
  const [currentStep, setCurrentStep] = useState(() => initial?.currentStep ?? 0)
  const [results, setResults] = useState<RecommendationResult[] | null>(() => initial?.results ?? null)
  const [hasSubmitted, setHasSubmitted] = useState(() => initial?.hasSubmitted ?? false)

  useEffect(() => {
    try {
      const payload: PersistedState = { answers, currentStep, results, hasSubmitted }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // Storage can be unavailable (private mode / quota). The questionnaire still works in memory.
    }
  }, [answers, currentStep, results, hasSubmitted])

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
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage failures; state is already reset in memory.
    }
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
    getUnanswered: (category: string) => getUnansweredQuestions(category, answers)
      .map(question => ({
        question,
        selectedCount: answers[question.id]?.length ?? 0,
        requiredCount: getRequiredCount(question),
        maxSelections: question.maxSelections,
      })),
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
