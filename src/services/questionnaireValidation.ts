import { getCategoryLimit, getQuestionsByCategory, CATEGORY_SELECTION_LIMITS } from '../data/questions'
import { QUESTIONNAIRE_CATEGORIES, type QuestionnaireAnswers, type QuestionnaireQuestion } from '../types'

export function getRequiredCount(question: QuestionnaireQuestion): number {
  if (question.type === 'single') return 1
  return question.minSelections ?? 1
}

export function isQuestionAnswered(question: QuestionnaireQuestion, answers: QuestionnaireAnswers): boolean {
  return (answers[question.id] ?? []).length >= getRequiredCount(question)
}

export function getCategorySelectionCount(category: string, answers: QuestionnaireAnswers): number {
  return getQuestionsByCategory(category)
    .reduce((total, question) => total + (answers[question.id]?.length ?? 0), 0)
}

export function isCategoryComplete(category: string, answers: QuestionnaireAnswers): boolean {
  const questions = getQuestionsByCategory(category)
  if (questions.length === 0) return true
  if (!questions.every(question => isQuestionAnswered(question, answers))) return false

  const limit = getCategoryLimit(category)
  if (!limit) return true

  const total = getCategorySelectionCount(category, answers)
  return total >= limit.min && total <= limit.max
}

export function getUnansweredQuestions(category: string, answers: QuestionnaireAnswers): QuestionnaireQuestion[] {
  return getQuestionsByCategory(category)
    .filter(question => !isQuestionAnswered(question, answers))
}

/** Highest step index the user is allowed to open. Everything before it is complete. */
export function getFirstIncompleteStep(answers: QuestionnaireAnswers): number {
  const index = QUESTIONNAIRE_CATEGORIES.findIndex(category => !isCategoryComplete(category, answers))
  return index === -1 ? QUESTIONNAIRE_CATEGORIES.length : index
}

export function isQuestionnaireComplete(answers: QuestionnaireAnswers): boolean {
  return QUESTIONNAIRE_CATEGORIES.every(category => isCategoryComplete(category, answers))
}

/**
 * A checkbox cannot be added when either the question's own maximum is reached or
 * the step-wide selection budget (for example 5 interests) is already used up.
 */
export function isOptionDisabled(question: QuestionnaireQuestion, option: string, answers: QuestionnaireAnswers): boolean {
  if (question.type === 'single') return false
  const selected = answers[question.id] ?? []
  if (selected.includes(option)) return false
  if (question.maxSelections && selected.length >= question.maxSelections) return true

  const categoryLimit = CATEGORY_SELECTION_LIMITS[question.category]
  if (categoryLimit && getCategorySelectionCount(question.category, answers) >= categoryLimit.max) {
    return true
  }
  return false
}

export function toggleAnswer(answers: QuestionnaireAnswers, question: QuestionnaireQuestion, option: string): QuestionnaireAnswers {
  if (question.type === 'single') {
    return { ...answers, [question.id]: [option] }
  }

  const current = answers[question.id] ?? []
  if (current.includes(option)) {
    return { ...answers, [question.id]: current.filter(item => item !== option) }
  }
  if (isOptionDisabled(question, option, answers)) return answers
  return { ...answers, [question.id]: [...current, option] }
}
