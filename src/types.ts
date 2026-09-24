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

export interface QuestionnaireQuestion {
  id: string
  category: string
  question: string
  options: string[]
  type: 'single' | 'multiple'
  minSelections?: number
  maxSelections?: number
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
