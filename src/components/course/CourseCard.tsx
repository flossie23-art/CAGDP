import React from 'react'
import { Course } from '../../types'

interface CourseCardProps {
  course: Course
  onExplore: (course: Course) => void
  onSave: (id: string) => void
  isSaved: boolean
}

export default function CourseCard({ course, onExplore, onSave, isSaved }: CourseCardProps) {
  return (
    <div className="card">
      <span className="badge" style={{ background: 'var(--color-primary)', color: 'white', marginBottom: '0.5rem' }}>
        {course.field}
      </span>
      <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{course.name}</h3>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
        {course.description.substring(0, 100)}...
      </p>
      <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
        <div>Duration: {course.duration}</div>
        <div>Qualification: {course.qualification}</div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={() => onExplore(course)}>
          Explore Course
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => onSave(course.id)}>
          {isSaved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  )
}
