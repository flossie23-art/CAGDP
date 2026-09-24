import { careers } from '../data/careers'
import { courses } from '../data/courses'
import { institutions } from '../data/institutions'
import { scholarships } from '../data/scholarships'
import { onlineCourses } from '../data/onlineCourses'
import { SearchResult } from '../types'

export function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const results: SearchResult[] = []

  careers.forEach(career => {
    if (career.name.toLowerCase().includes(q) || career.description.toLowerCase().includes(q)) {
      results.push({ type: 'career', id: career.id, name: career.name, description: career.description })
    }
  })

  courses.forEach(course => {
    if (course.name.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
      results.push({ type: 'course', id: course.id, name: course.name, description: course.description })
    }
  })

  institutions.forEach(institution => {
    if (institution.name.toLowerCase().includes(q) || institution.location.toLowerCase().includes(q)) {
      results.push({ type: 'institution', id: institution.id, name: institution.name, description: `${institution.type} in ${institution.location}` })
    }
  })

  scholarships.forEach(scholarship => {
    if (scholarship.name.toLowerCase().includes(q) || scholarship.provider.toLowerCase().includes(q)) {
      results.push({ type: 'scholarship', id: scholarship.id, name: scholarship.name, description: scholarship.description })
    }
  })

  return results
}

export function filterCareers(filters: { industry?: string; interest?: string }): typeof careers {
  return careers.filter(career => {
    if (filters.industry && career.industry !== filters.industry) return false
    if (filters.interest && !career.recommendedInterests.includes(filters.interest)) return false
    return true
  })
}

export function filterCourses(filters: { field?: string; careerPath?: string }): typeof courses {
  return courses.filter(course => {
    if (filters.field && course.field !== filters.field) return false
    if (filters.careerPath && !course.careerPaths.includes(filters.careerPath)) return false
    return true
  })
}

export function filterScholarships(filters: { studyLevel?: string; field?: string }): typeof scholarships {
  return scholarships.filter(scholarship => {
    if (filters.studyLevel && scholarship.studyLevel !== filters.studyLevel) return false
    if (filters.field && scholarship.field !== filters.field) return false
    return true
  })
}
