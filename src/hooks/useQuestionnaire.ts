import { useState, useCallback } from 'react'
import { QuestionnaireAnswers, QuestionnaireQuestion } from '../types'
import { calculateRecommendations } from '../services/recommendationEngine'
import { RecommendationResult } from '../types'
import { questionnaireQuestions } from '../data/questions'

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

  const canProceed = useCallback(() => {
    const questions = questionnaireQuestions.filter(q => q.category === currentCategory)
    for (const question of questions) {
      if (question.minSelections && question.type === 'multiple') {
        const selected = answers[question.id] || []
        if (selected.length < question.minSelections) return false
      }
    }
    return true
  }, [answers, currentCategory])

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
    canProceed,
  }
}
