import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { QuestionnaireProvider } from '../src/contexts/QuestionnaireContext'
import Questionnaire from '../src/pages/Questionnaire'
import Results from '../src/pages/Results'
import ProgressIndicator from '../src/components/questionnaire/ProgressIndicator'
import QuestionCard from '../src/components/questionnaire/QuestionCard'
import ReviewStep from '../src/components/questionnaire/ReviewStep'
import RequirementBanner from '../src/components/questionnaire/RequirementBanner'
import StepActionBar from '../src/components/questionnaire/StepActionBar'
import { QUESTIONNAIRE_CATEGORIES, type QuestionnaireAnswers } from '../src/types'
import { questionnaireQuestions } from '../src/data/questions'
import { calculateRecommendations } from '../src/services/recommendationEngine'

let failures = 0
let checks = 0

function check(name: string, condition: boolean, detail = '') {
  checks++
  if (condition) {
    console.log(`  ok    ${name}`)
  } else {
    failures++
    console.log(`  FAIL  ${name}${detail ? ` -- ${detail}` : ''}`)
  }
}

function render(node: React.ReactElement, route = '/'): string {
  return renderToStaticMarkup(
    <QuestionnaireProvider>
      <MemoryRouter initialEntries={[route]}>{node}</MemoryRouter>
    </QuestionnaireProvider>
  )
}

const answers: QuestionnaireAnswers = {
  'interest-1': ['Mathematics', 'Computer Science'],
  'interest-2': ['Working with technology'],
  'interest-3': ['Science and nature'],
  'strength-1': ['Problem solving', 'Technical thinking'],
  'strength-2': ['Analyze the problem systematically'],
  'subject-1': ['Mathematics', 'Computer Science', 'Physics'],
  'subject-2': ['Mathematics', 'Computer Science', 'Physics'],
  'subject-3': ['Computer Science', 'Mathematics', 'Physics'],
  'work-1': ['Technology'],
  'work-2': ['Practical/Hands-on'],
  'work-3': ['Team-based'],
  'work-4': ['Indoor'],
  'work-5': ['Yes, very much'],
  'work-6': ['Yes, very much'],
  'goal-1': ['Technology', 'Science/Research'],
  'goal-2': ['Technology'],
  'goal-3': ['After university'],
  'goal-4': ['Yes, definitely'],
  'goal-5': ['Maybe'],
  'goal-6': ['Yes, definitely'],
  'goal-7': ['No, I prefer working for others'],
}

console.log('\n== page and component rendering ==')

let markup = render(<Questionnaire />)
check('questionnaire renders', markup.includes('Career Interest Questionnaire'))
check('first step is Interest', markup.includes('Step 1 of 6'))
check('all six step labels render', QUESTIONNAIRE_CATEGORIES.every(c => markup.includes(c)) && markup.includes('Review'))
check('locked future steps are disabled buttons', (markup.match(/disabled/g) ?? []).length >= 5)
check('interest counter is shown', markup.includes('Choose 3-5 interests in total'))
check('questions state their selection requirement', markup.includes('Select 1 or more'))
check('questions use fieldsets for grouping', markup.includes('<fieldset'))
check('inputs are focusable rather than display:none', !markup.includes('display:none'))
check('progress bar exposes value', markup.includes('role="progressbar"'))

console.log('\n== one independent screen per step ==')
check('step eyebrow names the current step', markup.includes('Step 1 of 6 · Interest'))
check('requirement banner renders', markup.includes('class="step-banner"'))
check('requirement banner states the step requirement', markup.includes('This step needs: Choose 3-5 interests in total'))
check('sticky action bar renders', markup.includes('class="step-action-bar"'))
check('continue is disabled on a fresh step', /class="btn btn-primary btn-sm"[^>]*disabled/.test(markup))
check('step status asks for the remaining answers', markup.includes('Select 3 more to continue'))
check(
  'only the current screen is mounted',
  questionnaireQuestions.filter(q => q.category === 'Interest').every(q => markup.includes(q.question))
    && !questionnaireQuestions.filter(q => q.category !== 'Interest').some(q => markup.includes(q.question)),
)
check('questions inside a screen are numbered', markup.includes('class="question-index"'))

console.log('\n== requirement banner states ==')
markup = render(<RequirementBanner text="Answer all 6 questions." met={false} />)
check('unmet banner announces what is needed', markup.includes('This step needs: Answer all 6 questions.'))
check('unmet banner is a polite live region', markup.includes('aria-live="polite"'))
check('unmet banner is marked', markup.includes('data-met="false"'))

markup = render(<RequirementBanner text="Answer all 6 questions." met />)
check('met banner confirms the requirement', markup.includes('Requirement met. Answer all 6 questions.'))
check('met banner is marked', markup.includes('data-met="true"'))

console.log('\n== step action bar states ==')
markup = render(
  <StepActionBar
    showBack
    canContinue={false}
    statusText="Select 2 more to continue"
    statusMet={false}
    onBack={() => {}}
    onContinue={() => {}}
  />,
)
check('bar keeps Back enabled', /Back<\/button>/.test(markup))
check('bar disables Continue while invalid', /class="btn btn-primary btn-sm"[^>]*disabled/.test(markup))
check('bar reports the outstanding count', markup.includes('Select 2 more to continue'))

markup = render(
  <StepActionBar
    showBack={false}
    canContinue
    statusText="✓ Step complete"
    statusMet
    onBack={() => {}}
    onContinue={() => {}}
  />,
)
check('bar enables Continue once valid', !/class="btn btn-primary btn-sm"[^>]*disabled/.test(markup))
check('bar confirms completion', markup.includes('✓ Step complete'))
check('bar hides Back on the first step', !/Back<\/button>/.test(markup))

markup = render(<Results />, '/results')
check('results page shows empty state when nothing submitted', markup.includes('No Results Yet'))
check('results page links back into the questionnaire', markup.includes('/questionnaire'))

console.log('\n== review step ==')
markup = render(
  <ReviewStep
    answers={{ ...answers, 'goal-5': [] }}
    questions={questionnaireQuestions}
    categories={QUESTIONNAIRE_CATEGORIES}
    canSubmit={false}
    onEditCategory={() => {}}
  />,
)
check('review lists every category', QUESTIONNAIRE_CATEGORIES.every(c => markup.includes(c)))
check('review shows every question', questionnaireQuestions.every(q => markup.includes(q.question)))
check('review flags unanswered questions', markup.includes('Not answered'))
check('review offers per-category edit', markup.includes('Edit'))
check('review blocks submit while incomplete', markup.includes('Some required questions are still unanswered'))
check('review leaves the action bar to the page', !/Submit/.test(markup))

markup = render(
  <ReviewStep
    answers={answers}
    questions={questionnaireQuestions}
    categories={QUESTIONNAIRE_CATEGORIES}
    canSubmit
    onEditCategory={() => {}}
  />,
)
check('review has no unanswered markers when complete', !markup.includes('Not answered'))
check('review has no blocking warning when complete', !markup.includes('Some required questions are still unanswered'))

console.log('\n== question card states ==')
markup = render(
  <QuestionCard
    question="Which subjects do you enjoy the most?"
    options={['Mathematics', 'Physics']}
    selectedOptions={['Mathematics']}
    onToggle={() => {}}
    questionType="multiple"
    minSelections={1}
    isOptionDisabled={() => true}
  />,
)
check('count is reported', markup.includes('1 selected.'))
check('max-reached hint appears when every option is blocked', markup.includes('You have reached the maximum') || markup.includes('data-disabled'))

markup = render(
  <QuestionCard
    question="Do you prefer indoor or outdoor work?"
    options={['Indoor', 'Outdoor']}
    selectedOptions={['Indoor']}
    onToggle={() => {}}
    questionType="single"
  />,
)
check('single questions report answered', markup.includes('Answered.'))
check('single questions use radio inputs', markup.includes('type="radio"'))
check('single questions are labelled Required', markup.includes('Required'))

markup = render(
  <QuestionCard
    index={3}
    question="Which subjects do you perform well in?"
    options={['Mathematics', 'English']}
    selectedOptions={[]}
    onToggle={() => {}}
    questionType="multiple"
    minSelections={3}
  />,
)
check('cards can carry a numbered marker', /class="question-index"[^>]*>3</.test(markup))
check('cards keep the per-question minimum in the header', markup.includes('Select 3 or more'))
check('cards no longer repeat the step requirement', !markup.includes('in total'))

console.log('\n== progress indicator states ==')
markup = render(
  <ProgressIndicator
    currentStep={2}
    totalSteps={6}
    progress={50}
    labels={['Interest', 'Strengths', 'Subjects', 'Work Preferences', 'Career Goals', 'Review']}
    getStepState={step => (step < 2 ? 'complete' : step === 2 ? 'available' : 'locked')}
    onStepClick={() => {}}
  />,
)
check('current step is marked for assistive tech', markup.includes('aria-current="step"'))
check('completed steps show a check mark', markup.includes('✓'))
check('locked steps are disabled', markup.includes('disabled'))

console.log('\n== recommendations render ==')
const results = calculateRecommendations(answers)
check('recommendations exist for the verification profile', results.length > 0)
check('every recommendation has a name', results.every(r => !!r.career.name))
check('every recommendation has a match level label', results.every(r => !!r.matchLevel))
check('top recommendation is a strong match', results[0].matchLevel === 'Strong Match')

console.log(`\n${checks - failures}/${checks} checks passed`)
if (failures > 0) {
  console.log(`${failures} FAILURES`)
  throw new Error(`${failures} render checks failed`)
}
