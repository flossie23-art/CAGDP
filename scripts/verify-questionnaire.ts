import { readFileSync } from 'node:fs'
import { getQuestionsByCategory, questionnaireQuestions, totalSteps } from '../src/data/questions'
import { QUESTIONNAIRE_CATEGORIES, REVIEW_CATEGORY, type QuestionnaireAnswers, type QuestionnaireQuestion } from '../src/types'
import {
  getCategorySelectionCount,
  getFirstIncompleteStep,
  getRemainingSelections,
  getStepRequirement,
  getUnansweredQuestions,
  isCategoryComplete,
  isOptionDisabled,
  isQuestionnaireComplete,
  toggleAnswer,
} from '../src/services/questionnaireValidation'
import { calculateRecommendations } from '../src/services/recommendationEngine'

let failures = 0
let checks = 0

function check(name: string, condition: boolean, detail = '') {
  checks++
  if (!condition) {
    failures++
    console.log(`  FAIL  ${name}${detail ? ` -- ${detail}` : ''}`)
  } else {
    console.log(`  ok    ${name}`)
  }
}

function find(questionId: string): QuestionnaireQuestion {
  const question = questionnaireQuestions.find(item => item.id === questionId)
  if (!question) throw new Error(`missing question ${questionId}`)
  return question
}

function pick(answers: QuestionnaireAnswers, questionId: string, options: string[]): QuestionnaireAnswers {
  return toggleAnswer(answers, find(questionId), options[0])
}

console.log('\n== data integrity ==')
check('every question has options', questionnaireQuestions.every(q => q.options.length > 0))
check('question ids are unique', new Set(questionnaireQuestions.map(q => q.id)).size === questionnaireQuestions.length)
check('categories match the step list',
  questionnaireQuestions.every(q => (QUESTIONNAIRE_CATEGORIES as string[]).includes(q.category)))
check('total steps is categories + review', totalSteps === QUESTIONNAIRE_CATEGORIES.length + 1)
check('every step except Interest has no shared selection budget',
  QUESTIONNAIRE_CATEGORIES.filter(c => c !== 'Interest').every(c => {
    const questions = getQuestionsByCategory(c)
    return questions.every(q => q.maxSelections === undefined)
  }))

console.log('\n== step 1 Interest: 3-5 total across three questions ==')
let answers: QuestionnaireAnswers = {}
check('empty Interest step is incomplete', !isCategoryComplete('Interest', answers))
check('only 2 selections is still incomplete', !isCategoryComplete('Interest', pick(pick(answers, 'interest-1', ['Mathematics']), 'interest-2', ['Working with technology'])))
check('3 selections across 2 questions is complete', isCategoryComplete('Interest', pick(pick(pick(answers, 'interest-1', ['Mathematics']), 'interest-2', ['Working with technology']), 'interest-3', ['Science and nature'])))
check('each interest question is required', getUnansweredQuestions('Interest', answers).length === 3)

answers = { 'interest-1': ['Mathematics'], 'interest-2': ['Working with technology'], 'interest-3': ['Science and nature'] }
check('starting total is 3', getCategorySelectionCount('Interest', answers) === 3)
check('a 4th interest is allowed', !isOptionDisabled(find('interest-1'), 'Physics', answers))
answers = toggleAnswer(answers, find('interest-1'), 'Physics')
check('still 4 after adding a 4th', getCategorySelectionCount('Interest', answers) === 4)
answers = toggleAnswer(answers, find('interest-2'), 'Helping others')
check('5 total is complete', isCategoryComplete('Interest', answers) && getCategorySelectionCount('Interest', answers) === 5)
check('6th is blocked at the cap', isOptionDisabled(find('interest-3'), 'Arts and culture', answers))
answers = toggleAnswer(answers, find('interest-3'), 'Arts and culture')
check('cap prevents a 6th selection', getCategorySelectionCount('Interest', answers) === 5)
check('deselecting is always allowed', (() => {
  const deselected = toggleAnswer(answers, find('interest-1'), 'Mathematics')
  return !isOptionDisabled(find('interest-1'), 'Physics', deselected)
})())

console.log('\n== single-answer questions require an answer ==')
check('unanswered Work Preferences is incomplete', !isCategoryComplete('Work Preferences', answers))
answers = { ...answers, 'work-1': ['Technology'] }
check('partially answered Work Preferences is incomplete', !isCategoryComplete('Work Preferences', answers))
answers = { ...answers, 'work-2': ['Practical/Hands-on'], 'work-3': ['Team-based'], 'work-4': ['Indoor'], 'work-5': ['Yes, very much'], 'work-6': ['Yes, very much'] }
check('fully answered Work Preferences is complete', isCategoryComplete('Work Preferences', answers))

console.log('\n== step gating ==')
check('locked at step 0 before anything is answered', getFirstIncompleteStep({}) === 0)
check('unlocks step 1 after Interest is complete', getFirstIncompleteStep(answers) === 1)

console.log('\n== full valid submission ==')
const full: QuestionnaireAnswers = {
  ...answers,
  'strength-1': ['Problem solving', 'Technical thinking'],
  'strength-2': ['Analyze the problem systematically'],
  'subject-1': ['Mathematics', 'Computer Science', 'Physics'],
  'subject-2': ['Mathematics', 'Computer Science', 'Physics'],
  'subject-3': ['Computer Science', 'Mathematics', 'Physics'],
  'goal-1': ['Technology', 'Science/Research'],
  'goal-2': ['Technology'],
  'goal-3': ['After university'],
  'goal-4': ['Yes, definitely'],
  'goal-5': ['Maybe'],
  'goal-6': ['Yes, definitely'],
  'goal-7': ['No, I prefer working for others'],
}
check('questionnaire is complete', isQuestionnaireComplete(full))
check('all steps reachable, review unlocked', getFirstIncompleteStep(full) === QUESTIONNAIRE_CATEGORIES.length)
check('subjects need at least 3', !isCategoryComplete('Subjects', { ...full, 'subject-1': ['Mathematics'] }))

console.log('\n== per-screen requirement text is derived from the data ==')
const expectedRequirementText: Record<string, string> = {
  Interest: 'Choose 3-5 interests in total across all 3 questions.',
  Strengths: 'Choose at least 1 in each of the 2 questions.',
  Subjects: 'Choose at least 3 in each of the 3 questions.',
  'Work Preferences': 'Answer all 6 questions.',
  'Career Goals': 'Choose at least 1 in each of the first 2, then answer the remaining 5.',
}
for (const category of QUESTIONNAIRE_CATEGORIES) {
  const { text } = getStepRequirement(category, full)
  check(`${category} requirement text`, text === expectedRequirementText[category], `got "${text}"`)
}
check('every screen has a non-empty requirement', QUESTIONNAIRE_CATEGORIES.every(c => getStepRequirement(c, full).text.length > 0))
check('Review requirement text', getStepRequirement(REVIEW_CATEGORY, full).text === 'Check your answers, then submit.')
check('requirement text is independent of answers', QUESTIONNAIRE_CATEGORIES.every(c => getStepRequirement(c, {}).text === getStepRequirement(c, full).text))
check('an unmet step reports unmet', QUESTIONNAIRE_CATEGORIES.every(c => !getStepRequirement(c, {}).met))
check('the requirement flips to met exactly when the step is complete', QUESTIONNAIRE_CATEGORIES.every(c => getStepRequirement(c, full).met === isCategoryComplete(c, full)))

console.log('\n== sticky-bar status counts selections, not questions ==')
check('a fresh step asks for every selection it needs', getRemainingSelections('Subjects', {}) === 9)
check('a fresh Interest step asks for one per question', getRemainingSelections('Interest', {}) === 3)
check('Work Preferences needs one per question', getRemainingSelections('Work Preferences', {}) === 6)
check('partly answered Subjects still needs both remaining in one question', getRemainingSelections('Subjects', { 'subject-1': ['Mathematics', 'Computer Science', 'Physics'], 'subject-2': ['Mathematics', 'Computer Science', 'Physics'], 'subject-3': ['Mathematics'] }) === 2)
check('a fully answered step needs nothing more', getRemainingSelections('Subjects', full) === 0)
check('the count never drops below zero', getRemainingSelections('Interest', { 'interest-1': ['Mathematics', 'Physics'], 'interest-2': ['Working with technology'], 'interest-3': ['Science and nature', 'Arts and culture', 'Law and politics'] }) === 0)

console.log('\n== disabled Continue is styled, not just inert ==')
const css = readFileSync('src/index.css', 'utf8')
check('.btn:disabled rule exists', /\.btn:disabled/.test(css))
check('.btn[disabled] attribute rule exists', /\.btn\[disabled\]/.test(css))
check('disabled buttons use the not-allowed cursor', /\.btn:disabled\s*,\s*\.btn\[disabled\]\s*\{[\s\S]{0,200}not-allowed/.test(css))
check('disabled buttons drop their hover fill', /\.btn:disabled:hover[\s\S]{0,200}var\(--color-border\)/.test(css))

console.log('\n== incomplete submission is rejected ==')
const incomplete = { ...full }
delete incomplete['goal-5']
check('missing goal blocks completion', !isQuestionnaireComplete(incomplete))
check('review is met only once everything is answered', getStepRequirement(REVIEW_CATEGORY, full).met && !getStepRequirement(REVIEW_CATEGORY, incomplete).met)

console.log('\n== recommendations ==')
const results = calculateRecommendations(full)
check('recommendations are produced', results.length > 0, `got ${results.length}`)
check('Software Engineer ranks first for a tech profile', results[0]?.career.id === 'software-engineer', `got ${results[0]?.career.id}`)
check('every result has a match level', results.every(r => !!r.matchLevel))
check('every result explains itself', results.every(r => r.reasons.length > 0))
check('every result has no zero-score entry', results.every(r => r.score > 0))
check('results are sorted by score', results.every((r, i) => i === 0 || results[i - 1].score >= r.score))
check('the top 3 for a tech profile are tech careers',
  ['software-engineer', 'data-scientist', 'cybersecurity-analyst'].includes(results[0].career.id)
  && ['software-engineer', 'data-scientist', 'cybersecurity-analyst'].includes(results[1].career.id)
  && ['software-engineer', 'data-scientist', 'cybersecurity-analyst'].includes(results[2].career.id),
  results.slice(0, 3).map(r => r.career.id).join(', '))
check('match levels get weaker as scores drop', (() => {
  const rank = { 'Strong Match': 4, 'Good Match': 3, 'Possible Match': 2, 'Explore Further': 1 }
  return results.every((r, i) => i === 0 || rank[results[i - 1].matchLevel] >= rank[r.matchLevel])
})())
console.log('  top 5:', results.slice(0, 5).map(r => `${r.career.name} (${r.score}, ${r.matchLevel})`).join(' | '))
console.log('  sample reasons:', results[0].reasons.slice(0, 2).join(' || '))

console.log('\n== a different profile produces different results ==')
const healthAnswers: QuestionnaireAnswers = {
  'interest-1': ['Biology'],
  'interest-2': ['Helping others'],
  'interest-3': ['Health and medicine'],
  'strength-1': ['Communication', 'Critical thinking'],
  'strength-2': ['Ask others for help'],
  'subject-1': ['Biology', 'Chemistry', 'English'],
  'subject-2': ['Biology', 'Chemistry', 'English'],
  'subject-3': ['Biology', 'Chemistry', 'English'],
  'work-1': ['People'],
  'work-2': ['Practical/Hands-on'],
  'work-3': ['Team-based'],
  'work-4': ['Indoor'],
  'work-5': ['Yes, very much'],
  'work-6': ['Sometimes'],
  'goal-1': ['Healthcare'],
  'goal-2': ['Healthcare'],
  'goal-3': ['After university'],
  'goal-4': ['Yes, definitely'],
  'goal-5': ['Not sure'],
  'goal-6': ['It depends on the job'],
  'goal-7': ['Maybe'],
}
const healthResults = calculateRecommendations(healthAnswers)
check('healthcare profile ranks Medical Doctor first', healthResults[0]?.career.id === 'medical-doctor', `got ${healthResults[0]?.career.id}`)
check('healthcare profile returns different results', healthResults[0]?.career.id !== results[0]?.career.id)
console.log('  top 5:', healthResults.slice(0, 5).map(r => `${r.career.name} (${r.score}, ${r.matchLevel})`).join(' | '))

console.log('\n== empty answers ==')
check('no answers yields no recommendations', calculateRecommendations({}).length === 0)

console.log(`\n${checks - failures}/${checks} checks passed`)
if (failures > 0) {
  console.log(`${failures} FAILURES`)
  throw new Error(`${failures} questionnaire checks failed`)
}
