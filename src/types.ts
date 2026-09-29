export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  questionnaireResponses?: QuestionnaireAnswers
  savedCareers: string[]
  savedCourses: string[]
  savedInstitutions: string[]
  savedScholarships: string[]
  savedOpportunities: string[]
}

export interface Career {
  id: string
  name: string
  slug: string
  description: string
  industry: string
  requiredSkills: string[]
  recommendedSubjects: string[]
  recommendedInterests: string[]
  recommendedStrengths: string[]
  relatedCourses: string[]
  educationRequirements: string
  entryPaths: string[]
  workEnvironment: string
  salaryInformation: string
  growthInformation: string
  resources: string[]
}

export interface Course {
  id: string
  name: string
  slug: string
  description: string
  field: string
  subjects: string[]
  careerPaths: string[]
  institutions: string[]
  entryRequirements: string
  duration: string
  qualification: string
}

export type InstitutionType =
  | 'University'
  | 'Polytechnic'
  | 'College'
  | 'Technical Institution'
  | 'Vocational Training Centre'

export interface Institution {
  id: string
  name: string
  slug: string
  type: InstitutionType
  location: string
  website: string
  courses: string[]
  admissionInformation: string
  accreditationInformation: string
}

export interface Scholarship {
  id: string
  name: string
  provider: string
  description: string
  eligibility: string
  deadline: string
  location: string
  studyLevel: string
  field: string
  applicationUrl: string
  source: string
  status: 'verified' | 'unverified'
}

export interface OnlineCourse {
  id: string
  title: string
  provider: string
  description: string
  skillArea: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: string
  url: string
}

export type QuestionnaireCategory =
  | 'Interest'
  | 'Strengths'
  | 'Subjects'
  | 'Work Preferences'
  | 'Career Goals'

export const QUESTIONNAIRE_CATEGORIES: QuestionnaireCategory[] = [
  'Interest',
  'Strengths',
  'Subjects',
  'Work Preferences',
  'Career Goals',
]

export const REVIEW_CATEGORY = 'Review'

export interface QuestionnaireQuestion {
  id: string
  category: QuestionnaireCategory
  question: string
  options: string[]
  type: 'single' | 'multiple'
  minSelections?: number
  maxSelections?: number
}

export type QuestionnaireAnswers = Record<string, string[]>

/**
 * A selection budget shared by every question in a category.
 * The Interest step requires 3-5 selections in total rather than 3-5 per question.
 */
export interface CategorySelectionLimit {
  min: number
  max: number
  label: string
}

export type MatchLevel = 'Strong Match' | 'Good Match' | 'Possible Match' | 'Explore Further'

export interface RecommendationResult {
  career: Career
  score: number
  matchLevel: MatchLevel
  reasons: string[]
}

export interface SearchResult {
  type: 'career' | 'course' | 'institution' | 'scholarship' | 'skill' | 'opportunity'
  id: string
  name: string
  description: string
}
