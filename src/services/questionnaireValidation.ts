import { getCategoryLimit, getQuestionsByCategory, CATEGORY_SELECTION_LIMITS } from '../data/questions'
import {
  QUESTIONNAIRE_CATEGORIES,
  REVIEW_CATEGORY,
  type QuestionnaireAnswers,
  type QuestionnaireQuestion,
} from '../types'

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

/**
 * How many further selections the step still needs. This counts selections
 * rather than questions, so a step like Subjects — three selections per
 * question — never tells the user it needs "1 more" when it needs two more
 * inside a single question.
 */
export function getRemainingSelections(category: string, answers: QuestionnaireAnswers): number {
  return getUnansweredQuestions(category, answers)
    .reduce((total, question) => total + Math.max(0, getRequiredCount(question) - (answers[question.id]?.length ?? 0)), 0)
}

/** Highest step index the user is allowed to open. Everything before it is complete. */
export function getFirstIncompleteStep(answers: QuestionnaireAnswers): number {
  const index = QUESTIONNAIRE_CATEGORIES.findIndex(category => !isCategoryComplete(category, answers))
  return index === -1 ? QUESTIONNAIRE_CATEGORIES.length : index
}

export interface StepRequirement {
  text: string
  met: boolean
}

function describeQuestionRequirement(questions: QuestionnaireQuestion[]): string {
  const selectable = questions.filter(question => question.type === 'multiple')
  const single = questions.length - selectable.length

  if (selectable.length > 0 && single > 0) {
    return `Choose at least 1 in each of the first ${selectable.length}, then answer the remaining ${single}.`
  }
  if (single === questions.length) return `Answer all ${questions.length} questions.`

  const minimum = Math.min(...selectable.map(getRequiredCount))
  return `Choose at least ${minimum} in each of the ${questions.length} questions.`
}

/**
 * Plain-language requirement for a whole screen, derived from the question data
 * rather than hardcoded per step, plus whether the current answers satisfy it.
 */
export function getStepRequirement(category: string, answers: QuestionnaireAnswers): StepRequirement {
  if (category === REVIEW_CATEGORY) {
    return { text: 'Check your answers, then submit.', met: isQuestionnaireComplete(answers) }
  }

  const questions = getQuestionsByCategory(category)
  if (questions.length === 0) return { text: 'This step has no questions.', met: true }

  const limit = getCategoryLimit(category)
  const text = limit
    ? `Choose ${limit.min}-${limit.max} ${limit.label} in total across all ${questions.length} questions.`
    : describeQuestionRequirement(questions)

  return { text, met: isCategoryComplete(category, answers) }
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
