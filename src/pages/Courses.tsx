import React, { useState } from 'react'
import { courses } from '../data/courses'
import { useAuth } from '../contexts/AuthContext'
import CourseCard from '../components/course/CourseCard'
import { Course } from '../types'
import { filterCourses } from '../services/searchService'

export default function Courses() {
  const { saveItem, isSaved } = useAuth()
  const [filter, setFilter] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')

  const fields = ['Technology', 'Business / Finance', 'Healthcare', 'Engineering', 'Education', 'Media / Communication', 'Agriculture', 'Law']

  const filtered = filter
    ? courses.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.description.toLowerCase().includes(filter.toLowerCase()))
    : fieldFilter
      ? filterCourses({ field: fieldFilter })
      : courses

  return (
    <div className="container">
      <h1 className="section-title">Explore Courses</h1>
      <p className="section-subtitle">Find university, polytechnic, and college courses that match your interests</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          className="input"
          placeholder="Search courses..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ maxWidth: '300px' }}
          aria-label="Search courses"
        />
        <select
          className="input"
          value={fieldFilter}
          onChange={e => setFieldFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
          aria-label="Filter by field"
        >
          <option value="">All Fields</option>
          {fields.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="grid-3">
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onExplore={(c) => window.location.href = `/courses/${c.id}`}
            onSave={(id) => saveItem('course', id)}
            isSaved={isSaved('course', course.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem' }}>No courses found matching your search.</p>
        </div>
      )}
    </div>
  )
}
