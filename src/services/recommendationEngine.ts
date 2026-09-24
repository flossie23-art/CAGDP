import { careers } from '../data/careers'
import { QuestionnaireAnswers } from './types'
import { Career, RecommendationResult } from './types'

export function calculateRecommendations(answers: QuestionnaireAnswers): RecommendationResult[] {
  const scores: Record<string, number> = {}
  const reasons: Record<string, string[]> = {}

  careers.forEach(career => {
    scores[career.id] = 0
    reasons[career.id] = []
  })

  const allSelectedInterests: string[] = []
  const allSelectedStrengths: string[] = []
  const allSelectedSubjects: string[] = []

  Object.entries(answers).forEach(([questionId, selectedOptions]) => {
    selectedOptions.forEach(option => {
      if (['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'English', 'Economics', 'Government', 'Geography', 'Literature', 'Accounting', 'Agricultural Science', 'Technical Drawing', 'Arts'].includes(option)) {
        allSelectedSubjects.push(option)
      }
      if (['Technology', 'Problem Solving', 'Programming', 'Analytical Thinking', 'Creativity', 'Communication', 'Leadership', 'Organization', 'Numerical Reasoning', 'Critical Thinking', 'Teamwork', 'Writing', 'Technical Thinking', 'Practical/Manual Skills', 'Attention to Detail'].includes(option)) {
        allSelectedStrengths.push(option)
      }
      if (['Technology', 'Problem Solving', 'Programming', 'Analytical Thinking', 'Creativity', 'Communication', 'Leadership', 'Organization', 'Numerical Reasoning', 'Critical Thinking', 'Teamwork', 'Writing', 'Technical Thinking', 'Practical/Manual Skills', 'Attention to Detail', 'Healthcare', 'Science', 'Business', 'Arts', 'Education', 'Law', 'Agriculture', 'Media', 'Design', 'Social Sciences', 'Trades'].includes(option)) {
        allSelectedInterests.push(option)
      }
    })
  })

  careers.forEach(career => {
    let score = 0
    const careerReasons: string[] = []

    career.recommendedInterests.forEach(interest => {
      if (allSelectedInterests.includes(interest)) {
        score += 20
        careerReasons.push(`You indicated interest in ${interest}`)
      }
    })

    career.recommendedStrengths.forEach(strength => {
      if (allSelectedStrengths.includes(strength)) {
        score += 15
        careerReasons.push(`You identified ${strength} as a strength`)
      }
    })

    career.recommendedSubjects.forEach(subject => {
      if (allSelectedSubjects.includes(subject)) {
        score += 25
        careerReasons.push(`You selected ${subject} as a subject of interest`)
      }
    })

    scores[career.id] = score
    reasons[career.id] = careerReasons
  })

  const maxScore = Math.max(...Object.values(scores), 1)

  const results: RecommendationResult[] = careers
    .map(career => ({
      career,
      score: scores[career.id],
      matchLevel: getMatchLevel(scores[career.id], maxScore),
      reasons: reasons[career.id] || [],
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)

  return results
}

function getMatchLevel(score: number, maxScore: number): 'Strong Match' | 'Good Match' | 'Possible Match' | 'Explore Further' {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
  if (percentage >= 70) return 'Strong Match'
  if (percentage >= 50) return 'Good Match'
  if (percentage >= 30) return 'Possible Match'
  return 'Explore Further'
}
