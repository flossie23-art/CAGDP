import { useState, useCallback } from 'react'
import { QuestionnaireAnswers } from '../types'
import { calculateRecommendations } from '../services/recommendationEngine'
import { RecommendationResult } from '../types'

const QUESTIONNAIRE_CATEGORIES = ['Interest', 'Strengths', 'Subjects', 'Work Preferences', 'Career Goals']

export function useQuestionnaire() {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<RecommendationResult[] | null>(null)

  const totalSteps = QUESTIONNAIRE_CATEGORIES.length + 1

  const updateAnswers = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions,
    }))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }, [])

  const submitQuestionnaire = useCallback(() => {
    const recommendationResults = calculateRecommendations(answers)
    setResults(recommendationResults)
    return recommendationResults
  }, [answers])

  const resetQuestionnaire = useCallback(() => {
    setAnswers({})
    setCurrentStep(0)
    setResults(null)
  }, [])

  const currentCategory = currentStep < QUESTIONNAIRE_CATEGORIES.length
    ? QUESTIONNAIRE_CATEGORIES[currentStep]
    : 'Review'

  const progress = ((currentStep + 1) / totalSteps) * 100

  return {
    answers,
    currentStep,
    currentCategory,
    totalSteps,
    progress,
    results,
    updateAnswers,
    goToStep,
    nextStep,
    prevStep,
    submitQuestionnaire,
    resetQuestionnaire,
  }
}
