import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { institutions } from '../data/institutions'
import { useAuth } from '../contexts/AuthContext'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const { saveItem, isSaved } = useAuth()
  const course = courses.find(c => c.id === id)

  if (!course) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Course Not Found</h1>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    )
  }

  const relatedInstitutions = institutions.filter(i => i.courses.includes(course.name))

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <Link to="/courses" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Courses
      </Link>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="badge" style={{ background: 'var(--color-primary)', color: 'white', marginBottom: '0.5rem' }}>
              {course.field}
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{course.name}</h1>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => saveItem('course', course.id)}>
            {isSaved('course', course.id) ? 'Saved ✓' : 'Save'}
          </button>
        </div>

        <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>{course.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ padding: '1rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Duration</h4>
            <p style={{ color: 'var(--color-muted)' }}>{course.duration}</p>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Qualification</h4>
            <p style={{ color: 'var(--color-muted)' }}>{course.qualification}</p>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Entry Requirements</h4>
            <p style={{ color: 'var(--color-muted)' }}>{course.entryRequirements}</p>
          </div>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Related Career Paths</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {course.careerPaths.map(path => (
              <span key={path} className="badge" style={{ background: 'var(--color-secondary)', color: 'white', padding: '0.5rem 1rem' }}>{path}</span>
            ))}
          </div>
        </div>
      </div>

      {relatedInstitutions.length > 0 && (
        <div className="card">
          <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>🏫 Institutions Offering This Course</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {relatedInstitutions.map(inst => (
              <Link key={inst.id} to={`/institutions/${inst.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 style={{ fontWeight: 600 }}>{inst.name}</h4>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{inst.type} • {inst.location}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
