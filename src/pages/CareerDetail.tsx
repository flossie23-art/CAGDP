import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { careers } from '../data/careers'
import { courses } from '../data/courses'
import { useAuth } from '../contexts/AuthContext'

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>()
  const { saveItem, isSaved } = useAuth()
  const career = careers.find(c => c.id === id)

  if (!career) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Career Not Found</h1>
        <Link to="/careers" className="btn btn-primary">Back to Careers</Link>
      </div>
    )
  }

  const relatedCourses = courses.filter(c => career.relatedCourses.includes(c.name))

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <Link to="/careers" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Careers
      </Link>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{career.name}</h1>
            <span className="badge" style={{ background: 'var(--color-primary)', color: 'white', fontSize: '0.875rem', padding: '0.375rem 1rem' }}>
              {career.industry}
            </span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => saveItem('career', career.id)}>
            {isSaved('career', career.id) ? 'Saved ✓' : 'Save'}
          </button>
        </div>

        <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>{career.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>📚 Recommended Subjects</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {career.recommendedSubjects.map(s => (
                <span key={s} className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>💪 Recommended Strengths</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {career.recommendedStrengths.map(s => (
                <span key={s} className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🎯 Key Interests</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {career.recommendedInterests.map(s => (
                <span key={s} className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>💼 Related Courses</h2>
        {relatedCourses.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {relatedCourses.map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 style={{ fontWeight: 600 }}>{course.name}</h4>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{course.field} • {course.duration}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-muted)' }}>No related courses found.</p>
        )}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>📖 Education Requirements</h2>
        <p style={{ color: 'var(--color-muted)' }}>{career.educationRequirements}</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>🚀 Entry Paths</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {career.entryPaths.map(path => (
            <span key={path} className="badge" style={{ background: 'var(--color-secondary)', color: 'white', padding: '0.5rem 1rem' }}>{path}</span>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>💰 Salary Information</h2>
        <p style={{ color: 'var(--color-muted)' }}>{career.salaryInformation}</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>📈 Growth Information</h2>
        <p style={{ color: 'var(--color-muted)' }}>{career.growthInformation}</p>
      </div>

      <div className="card">
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>🏢 Work Environment</h2>
        <p style={{ color: 'var(--color-muted)' }}>{career.workEnvironment}</p>
      </div>
    </div>
  )
}
