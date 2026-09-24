export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  questionnaireResponses?: Record<string, string[]>
  savedCareers: string[]
  savedCourses: string[]
  savedInstitutions: string[]
  savedScholarships: string[]
  savedOpportunities: string[]
}

export interface QuestionnaireAnswers {
  [questionId: string]: string[]
}

export interface RecommendationResult {
  career: Career
  score: number
  matchLevel: 'Strong Match' | 'Good Match' | 'Possible Match' | 'Explore Further'
  reasons: string[]
}

export interface SearchResult {
  type: 'career' | 'course' | 'institution' | 'scholarship' | 'skill' | 'opportunity'
  id: string
  name: string
  description: string
}
