import { careers } from '../data/careers'
import type { Career, MatchLevel, QuestionnaireAnswers, RecommendationResult } from '../types'
import { buildAnswerProfile, type AnswerProfile } from './answerProfile'

const WEIGHTS = {
  subject: 25,
  interest: 20,
  strength: 15,
} as const

export function calculateRecommendations(answers: QuestionnaireAnswers): RecommendationResult[] {
  const profile = buildAnswerProfile(answers)

  if (profile.subjects.size === 0 && profile.interests.size === 0 && profile.strengths.size === 0) {
    return []
  }

  const scored = careers.map(career => {
    const score = scoreCareer(career, profile)
    return {
      career,
      score,
      matchLevel: getMatchLevel(career, profile),
      reasons: buildReasons(career, profile),
    }
  })

  return scored
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.career.name.localeCompare(b.career.name))
}

function scoreCareer(career: Career, profile: AnswerProfile): number {
  let score = 0

  career.recommendedSubjects.forEach(subject => {
    if (profile.subjects.has(subject)) score += WEIGHTS.subject
  })
  career.recommendedInterests.forEach(interest => {
    if (profile.interests.has(interest)) score += WEIGHTS.interest
  })
  career.recommendedStrengths.forEach(strength => {
    if (profile.strengths.has(strength)) score += WEIGHTS.strength
  })

  return score
}

function buildReasons(
  career: Career,
  profile: AnswerProfile,
): string[] {
  const reasons: string[] = []

  const matchedSubjects = career.recommendedSubjects.filter(subject => profile.subjects.has(subject))
  if (matchedSubjects.length > 0) {
    reasons.push(`You selected ${listItems(matchedSubjects)} as subjects of interest`)
  }

  const matchedInterests = career.recommendedInterests.filter(interest => profile.interests.has(interest))
  if (matchedInterests.length > 0) {
    const evidence = collectEvidence(profile, 'interest', matchedInterests)
    reasons.push(`You showed interest in ${listItems(matchedInterests)}${evidence}`)
  }

  const matchedStrengths = career.recommendedStrengths.filter(strength => profile.strengths.has(strength))
  if (matchedStrengths.length > 0) {
    const evidence = collectEvidence(profile, 'strength', matchedStrengths)
    reasons.push(`You identified ${listItems(matchedStrengths)} as strengths${evidence}`)
  }

  return reasons
}

function collectEvidence(
  profile: AnswerProfile,
  kind: 'interest' | 'strength',
  tags: string[],
): string {
  const options: string[] = []
  tags.forEach(tag => {
    profile.sources.get(`${kind}:${tag}`)?.forEach(option => {
      if (!options.includes(option)) options.push(option)
    })
  })
  if (options.length === 0) return ''
  return ` through ${listItems(options.slice(0, 4))}`
}

function listItems(items: string[]): string {
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/**
 * A match level is the average of how much of each dimension the answers
 * covered, rather than a score relative to the top result. This keeps the
 * levels descriptive: a career cannot reach "Strong Match" on one dimension
 * alone, and a broadly compatible career is not inflated because the user's
 * other answers happened to score low.
 */
function getMatchLevel(career: Career, profile: AnswerProfile): MatchLevel {
  const coverage = (expected: string[], matched: Set<string>) => {
    if (expected.length === 0) return 1
    const hits = expected.filter(item => matched.has(item)).length
    return hits / expected.length
  }

  const subjectCoverage = coverage(career.recommendedSubjects, profile.subjects)
  const interestCoverage = coverage(career.recommendedInterests, profile.interests)
  const strengthCoverage = coverage(career.recommendedStrengths, profile.strengths)
  const overall = (subjectCoverage + interestCoverage + strengthCoverage) / 3

  if (overall >= 0.8) return 'Strong Match'
  if (overall >= 0.6) return 'Good Match'
  if (overall >= 0.35) return 'Possible Match'
  return 'Explore Further'
}
