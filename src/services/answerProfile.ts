import type { QuestionnaireAnswers } from '../types'

export interface OptionTags {
  subjects?: string[]
  interests?: string[]
  strengths?: string[]
}

/** Canonical tag names used to match questionnaire answers against careers. */
export const TAGS = {
  interests: {
    technology: 'Technology',
    programming: 'Programming',
    mathematics: 'Mathematics',
    science: 'Science',
    healthcare: 'Healthcare',
    business: 'Business',
    engineering: 'Engineering',
    practicalWork: 'Practical Work',
    education: 'Education',
    communication: 'Communication',
    arts: 'Arts',
    design: 'Design',
    creativity: 'Creativity',
    media: 'Media',
    law: 'Law',
    socialSciences: 'Social Sciences',
    agriculture: 'Agriculture',
    research: 'Research',
    problemSolving: 'Problem Solving',
    analyticalThinking: 'Analytical Thinking',
    criticalThinking: 'Critical Thinking',
    organization: 'Organization',
    leadership: 'Leadership',
    helpingOthers: 'Helping Others',
  },
  strengths: {
    problemSolving: 'Problem Solving',
    analyticalThinking: 'Analytical Thinking',
    logicalThinking: 'Logical Thinking',
    criticalThinking: 'Critical Thinking',
    numericalReasoning: 'Numerical Reasoning',
    technicalThinking: 'Technical Thinking',
    attentionToDetail: 'Attention to Detail',
    communication: 'Communication',
    teamwork: 'Teamwork',
    leadership: 'Leadership',
    organization: 'Organization',
    creativity: 'Creativity',
    writing: 'Writing',
    argumentation: 'Argumentation',
    research: 'Research',
    empathy: 'Empathy',
    patience: 'Patience',
  },
} as const

const SUBJECT_TAGS: Record<string, OptionTags> = {
  Mathematics: {
    subjects: ['Mathematics'],
    interests: [TAGS.interests.mathematics],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking],
  },
  'Computer Science': {
    subjects: ['Computer Science'],
    interests: [TAGS.interests.technology, TAGS.interests.programming],
    strengths: [TAGS.strengths.technicalThinking, TAGS.strengths.analyticalThinking],
  },
  Physics: {
    subjects: ['Physics'],
    interests: [TAGS.interests.science],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.logicalThinking],
  },
  Chemistry: {
    subjects: ['Chemistry'],
    interests: [TAGS.interests.science],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.attentionToDetail],
  },
  Biology: {
    subjects: ['Biology'],
    interests: [TAGS.interests.science, TAGS.interests.healthcare],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.criticalThinking],
  },
  English: {
    subjects: ['English'],
    interests: [TAGS.interests.communication, TAGS.interests.arts],
    strengths: [TAGS.strengths.communication, TAGS.strengths.writing],
  },
  Economics: {
    subjects: ['Economics'],
    interests: [TAGS.interests.business],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking],
  },
  Government: {
    subjects: ['Government'],
    interests: [TAGS.interests.law, TAGS.interests.socialSciences],
    strengths: [TAGS.strengths.argumentation, TAGS.strengths.criticalThinking],
  },
  Geography: {
    subjects: ['Geography'],
    interests: [TAGS.interests.socialSciences],
    strengths: [TAGS.strengths.criticalThinking, TAGS.strengths.research],
  },
  Literature: {
    subjects: ['Literature'],
    interests: [TAGS.interests.arts, TAGS.interests.communication],
    strengths: [TAGS.strengths.writing, TAGS.strengths.criticalThinking],
  },
  Arts: {
    subjects: ['Arts'],
    interests: [TAGS.interests.arts, TAGS.interests.design, TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity],
  },
  'Agricultural Science': {
    subjects: ['Agricultural Science'],
    interests: [TAGS.interests.agriculture],
    strengths: [TAGS.strengths.technicalThinking, TAGS.strengths.research],
  },
  'Technical Drawing': {
    subjects: ['Technical Drawing'],
    interests: [TAGS.interests.engineering, TAGS.interests.practicalWork, TAGS.interests.design],
    strengths: [TAGS.strengths.technicalThinking],
  },
  Accounting: {
    subjects: ['Accounting'],
    interests: [TAGS.interests.business, TAGS.interests.mathematics],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.attentionToDetail, TAGS.strengths.organization],
  },
}

const ACTIVITY_TAGS: Record<string, OptionTags> = {
  'Solving puzzles and problems': {
    interests: [TAGS.interests.problemSolving],
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.analyticalThinking, TAGS.strengths.logicalThinking],
  },
  'Building or creating things': {
    interests: [TAGS.interests.practicalWork, TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity, TAGS.strengths.technicalThinking],
  },
  'Reading and researching': {
    interests: [TAGS.interests.research],
    strengths: [TAGS.strengths.research, TAGS.strengths.criticalThinking],
  },
  'Working with technology': {
    interests: [TAGS.interests.technology, TAGS.interests.programming],
    strengths: [TAGS.strengths.technicalThinking],
  },
  'Helping others': {
    interests: [TAGS.interests.helpingOthers, TAGS.interests.healthcare],
    strengths: [TAGS.strengths.empathy, TAGS.strengths.communication, TAGS.strengths.teamwork],
  },
  'Designing or drawing': {
    interests: [TAGS.interests.design, TAGS.interests.arts],
    strengths: [TAGS.strengths.creativity],
  },
  'Working with numbers': {
    interests: [TAGS.interests.mathematics, TAGS.interests.business],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking],
  },
  'Writing or storytelling': {
    interests: [TAGS.interests.communication, TAGS.interests.arts],
    strengths: [TAGS.strengths.writing, TAGS.strengths.creativity],
  },
  'Leading or organizing': {
    interests: [TAGS.interests.leadership, TAGS.interests.organization],
    strengths: [TAGS.strengths.leadership, TAGS.strengths.organization],
  },
  'Working outdoors': {
    interests: [TAGS.interests.agriculture, TAGS.interests.practicalWork],
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.patience],
  },
}

const TOPIC_TAGS: Record<string, OptionTags> = {
  'Technology and gadgets': {
    interests: [TAGS.interests.technology, TAGS.interests.programming],
    strengths: [TAGS.strengths.technicalThinking],
  },
  'Science and nature': {
    interests: [TAGS.interests.science],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.criticalThinking],
  },
  'Business and finance': {
    interests: [TAGS.interests.business],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking],
  },
  'Arts and culture': {
    interests: [TAGS.interests.arts, TAGS.interests.design],
    strengths: [TAGS.strengths.creativity],
  },
  'Health and medicine': {
    interests: [TAGS.interests.healthcare],
    strengths: [TAGS.strengths.empathy, TAGS.strengths.criticalThinking],
  },
  'Law and politics': {
    interests: [TAGS.interests.law, TAGS.interests.socialSciences],
    strengths: [TAGS.strengths.argumentation, TAGS.strengths.criticalThinking],
  },
  'Mathematics and logic': {
    interests: [TAGS.interests.mathematics],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.logicalThinking],
  },
  'Design and creativity': {
    interests: [TAGS.interests.design, TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity],
  },
  'Sports and fitness': {
    interests: [TAGS.interests.practicalWork],
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.patience],
  },
  'History and society': {
    interests: [TAGS.interests.socialSciences],
    strengths: [TAGS.strengths.research, TAGS.strengths.criticalThinking, TAGS.strengths.writing],
  },
}

const STRENGTH_TAGS: Record<string, OptionTags> = {
  'Problem solving': {
    interests: [TAGS.interests.problemSolving],
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.analyticalThinking],
  },
  Communication: {
    interests: [TAGS.interests.communication],
    strengths: [TAGS.strengths.communication],
  },
  Creativity: {
    interests: [TAGS.interests.creativity, TAGS.interests.arts, TAGS.interests.design],
    strengths: [TAGS.strengths.creativity],
  },
  Leadership: {
    interests: [TAGS.interests.leadership],
    strengths: [TAGS.strengths.leadership],
  },
  Organization: {
    interests: [TAGS.interests.organization],
    strengths: [TAGS.strengths.organization, TAGS.strengths.attentionToDetail],
  },
  'Numerical reasoning': {
    interests: [TAGS.interests.mathematics, TAGS.interests.business],
    strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking],
  },
  'Critical thinking': {
    interests: [TAGS.interests.analyticalThinking],
    strengths: [TAGS.strengths.criticalThinking, TAGS.strengths.analyticalThinking, TAGS.strengths.logicalThinking],
  },
  Teamwork: {
    interests: [TAGS.interests.helpingOthers],
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.communication],
  },
  Writing: {
    interests: [TAGS.interests.communication],
    strengths: [TAGS.strengths.writing, TAGS.strengths.argumentation],
  },
  'Technical thinking': {
    interests: [TAGS.interests.technology],
    strengths: [TAGS.strengths.technicalThinking],
  },
  'Practical/manual skills': {
    interests: [TAGS.interests.practicalWork],
    strengths: [TAGS.strengths.technicalThinking, TAGS.strengths.patience],
  },
  'Attention to detail': {
    interests: [TAGS.interests.organization],
    strengths: [TAGS.strengths.attentionToDetail, TAGS.strengths.criticalThinking],
  },
}

const APPROACH_TAGS: Record<string, OptionTags> = {
  'Analyze the problem systematically': {
    interests: [TAGS.interests.analyticalThinking],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.logicalThinking, TAGS.strengths.problemSolving],
  },
  'Brainstorm creative solutions': {
    interests: [TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity],
  },
  'Ask others for help': {
    interests: [TAGS.interests.helpingOthers],
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.communication, TAGS.strengths.empathy],
  },
  'Break it down into smaller steps': {
    interests: [TAGS.interests.problemSolving],
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.organization, TAGS.strengths.analyticalThinking],
  },
  'Try different approaches until one works': {
    interests: [TAGS.interests.problemSolving],
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.creativity],
  },
  'Research how others have solved similar problems': {
    interests: [TAGS.interests.research],
    strengths: [TAGS.strengths.research, TAGS.strengths.criticalThinking],
  },
}

const WORK_1_TAGS: Record<string, OptionTags> = {
  People: {
    interests: [TAGS.interests.helpingOthers, TAGS.interests.communication],
    strengths: [TAGS.strengths.communication, TAGS.strengths.teamwork, TAGS.strengths.empathy],
  },
  Technology: {
    interests: [TAGS.interests.technology, TAGS.interests.programming],
    strengths: [TAGS.strengths.technicalThinking],
  },
  'Both equally': {
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.technicalThinking],
  },
  'Neither - I prefer working independently': {
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.analyticalThinking],
  },
}

const WORK_2_TAGS: Record<string, OptionTags> = {
  'Practical/Hands-on': {
    interests: [TAGS.interests.practicalWork, TAGS.interests.engineering],
    strengths: [TAGS.strengths.technicalThinking],
  },
  'Theoretical/Conceptual': {
    interests: [TAGS.interests.research, TAGS.interests.science],
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.research],
  },
  'Both equally': {
    strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.technicalThinking],
  },
  'It depends on the task': {
    strengths: [TAGS.strengths.analyticalThinking],
  },
}

const WORK_3_TAGS: Record<string, OptionTags> = {
  Independent: {
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.analyticalThinking],
  },
  'Team-based': {
    interests: [TAGS.interests.helpingOthers],
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.communication],
  },
  'Both equally': {
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.analyticalThinking],
  },
  'It depends on the project': {
    strengths: [TAGS.strengths.teamwork],
  },
}

const WORK_4_TAGS: Record<string, OptionTags> = {
  Indoor: {
    interests: [TAGS.interests.technology, TAGS.interests.design],
    strengths: [TAGS.strengths.attentionToDetail],
  },
  Outdoor: {
    interests: [TAGS.interests.practicalWork, TAGS.interests.agriculture],
    strengths: [TAGS.strengths.patience, TAGS.strengths.teamwork],
  },
  'Both equally': {
    strengths: [TAGS.strengths.teamwork, TAGS.strengths.attentionToDetail],
  },
  'It depends on the task': {
    strengths: [TAGS.strengths.attentionToDetail],
  },
}

const WORK_5_TAGS: Record<string, OptionTags> = {
  'Yes, very much': {
    interests: [TAGS.interests.problemSolving],
    strengths: [TAGS.strengths.problemSolving, TAGS.strengths.analyticalThinking],
  },
  Sometimes: {
    strengths: [TAGS.strengths.analyticalThinking],
  },
  'Not really': {
    strengths: [TAGS.strengths.communication, TAGS.strengths.teamwork],
  },
  'I prefer open-ended challenges': {
    interests: [TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity],
  },
}

const WORK_6_TAGS: Record<string, OptionTags> = {
  'Yes, very much': {
    interests: [TAGS.interests.creativity, TAGS.interests.design],
    strengths: [TAGS.strengths.creativity],
  },
  Sometimes: {
    interests: [TAGS.interests.creativity],
    strengths: [TAGS.strengths.creativity],
  },
  'Not really': {
    strengths: [TAGS.strengths.attentionToDetail, TAGS.strengths.organization],
  },
  'I prefer working with existing systems': {
    interests: [TAGS.interests.technology],
    strengths: [TAGS.strengths.attentionToDetail, TAGS.strengths.organization],
  },
}

const GOAL_1_TAGS: Record<string, OptionTags> = {
  Technology: { interests: [TAGS.interests.technology, TAGS.interests.programming], strengths: [TAGS.strengths.technicalThinking] },
  Healthcare: { interests: [TAGS.interests.healthcare], strengths: [TAGS.strengths.empathy, TAGS.strengths.criticalThinking] },
  'Business/Finance': { interests: [TAGS.interests.business, TAGS.interests.mathematics], strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.analyticalThinking] },
  Engineering: { interests: [TAGS.interests.engineering, TAGS.interests.practicalWork], strengths: [TAGS.strengths.analyticalThinking, TAGS.strengths.technicalThinking] },
  Education: { interests: [TAGS.interests.education, TAGS.interests.communication], strengths: [TAGS.strengths.communication, TAGS.strengths.leadership] },
  'Arts/Design': { interests: [TAGS.interests.arts, TAGS.interests.design, TAGS.interests.creativity], strengths: [TAGS.strengths.creativity] },
  Law: { interests: [TAGS.interests.law], strengths: [TAGS.strengths.argumentation, TAGS.strengths.criticalThinking] },
  Agriculture: { interests: [TAGS.interests.agriculture], strengths: [TAGS.strengths.research, TAGS.strengths.patience] },
  'Science/Research': { interests: [TAGS.interests.science, TAGS.interests.research], strengths: [TAGS.strengths.research, TAGS.strengths.analyticalThinking] },
  'Media/Communication': { interests: [TAGS.interests.media, TAGS.interests.communication], strengths: [TAGS.strengths.communication, TAGS.strengths.writing] },
}

const GOAL_2_TAGS: Record<string, OptionTags> = {
  Technology: { interests: [TAGS.interests.technology], strengths: [TAGS.strengths.technicalThinking] },
  Healthcare: { interests: [TAGS.interests.healthcare], strengths: [TAGS.strengths.empathy] },
  Finance: { interests: [TAGS.interests.business, TAGS.interests.mathematics], strengths: [TAGS.strengths.numericalReasoning, TAGS.strengths.attentionToDetail] },
  Education: { interests: [TAGS.interests.education], strengths: [TAGS.strengths.communication, TAGS.strengths.patience] },
  Government: { interests: [TAGS.interests.law, TAGS.interests.socialSciences], strengths: [TAGS.strengths.argumentation, TAGS.strengths.criticalThinking] },
  Agriculture: { interests: [TAGS.interests.agriculture], strengths: [TAGS.strengths.research] },
  Manufacturing: { interests: [TAGS.interests.engineering, TAGS.interests.practicalWork], strengths: [TAGS.strengths.technicalThinking, TAGS.strengths.problemSolving] },
  Media: { interests: [TAGS.interests.media, TAGS.interests.communication], strengths: [TAGS.strengths.creativity, TAGS.strengths.communication] },
  Consulting: { interests: [TAGS.interests.business, TAGS.interests.communication], strengths: [TAGS.strengths.communication, TAGS.strengths.criticalThinking] },
  'Non-profit': { interests: [TAGS.interests.helpingOthers, TAGS.interests.socialSciences], strengths: [TAGS.strengths.empathy, TAGS.strengths.communication] },
}

const QUESTION_TAGS: Record<string, Record<string, OptionTags>> = {
  'interest-1': SUBJECT_TAGS,
  'interest-2': ACTIVITY_TAGS,
  'interest-3': TOPIC_TAGS,
  'strength-1': STRENGTH_TAGS,
  'strength-2': APPROACH_TAGS,
  'subject-1': SUBJECT_TAGS,
  'subject-2': SUBJECT_TAGS,
  'subject-3': SUBJECT_TAGS,
  'work-1': WORK_1_TAGS,
  'work-2': WORK_2_TAGS,
  'work-3': WORK_3_TAGS,
  'work-4': WORK_4_TAGS,
  'work-5': WORK_5_TAGS,
  'work-6': WORK_6_TAGS,
  'goal-1': GOAL_1_TAGS,
  'goal-2': GOAL_2_TAGS,
}

/** Subject questions contribute only their subject, so subjects are not double counted as interests. */
const SUBJECT_ONLY_QUESTIONS = new Set(['subject-1', 'subject-2', 'subject-3'])

export interface AnswerProfile {
  subjects: Set<string>
  interests: Set<string>
  strengths: Set<string>
  sources: Map<string, string[]>
}

export function getOptionTags(questionId: string, option: string): OptionTags | undefined {
  return QUESTION_TAGS[questionId]?.[option]
}

export function buildAnswerProfile(answers: QuestionnaireAnswers): AnswerProfile {
  const subjects = new Set<string>()
  const interests = new Set<string>()
  const strengths = new Set<string>()
  const sources = new Map<string, string[]>()

  const addSource = (tag: string, option: string) => {
    const existing = sources.get(tag)
    if (existing) {
      if (!existing.includes(option)) existing.push(option)
    } else {
      sources.set(tag, [option])
    }
  }

  Object.entries(answers).forEach(([questionId, selectedOptions]) => {
    selectedOptions.forEach(option => {
      const tags = getOptionTags(questionId, option)
      if (!tags) return

      const subjectTags = SUBJECT_ONLY_QUESTIONS.has(questionId)
        ? [option]
        : (tags.subjects ?? [])

      subjectTags.forEach(subject => {
        subjects.add(subject)
        addSource(`subject:${subject}`, option)
      })

      if (!SUBJECT_ONLY_QUESTIONS.has(questionId)) {
        tags.interests?.forEach(interest => {
          interests.add(interest)
          addSource(`interest:${interest}`, option)
        })
      }

      tags.strengths?.forEach(strength => {
        strengths.add(strength)
        addSource(`strength:${strength}`, option)
      })
    })
  })

  return { subjects, interests, strengths, sources }
}
