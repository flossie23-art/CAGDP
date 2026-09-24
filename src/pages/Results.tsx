import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuestionnaire } from '../hooks/useQuestionnaire'
import { useAuth } from '../contexts/AuthContext'
import CareerCard from '../components/career/CareerCard'
import { Career } from '../types'

export default function Results() {
  const { results } = useQuestionnaire()
  const { saveItem, isSaved } = useAuth()
  const navigate = useNavigate()

  if (!results || results.length === 0) {
    return (
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>No Results Yet</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Complete the questionnaire to see your personalized recommendations.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/questionnaire')}>
          Take the Questionnaire
        </button>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.5rem' }}>
        Your Career Recommendations
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Based on your questionnaire answers, here are the careers that match your profile
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {results.map(result => (
          <CareerCard
            key={result.career.id}
            result={result}
            onExplore={(career) => navigate(`/careers/${career.id}`)}
            onSave={(id) => saveItem('career', id)}
            isSaved={isSaved('career', result.career.id)}
          />
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', background: 'var(--color-surface)' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>Related Courses</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {results[0]?.career.relatedCourses.map(course => (
            <span key={course} className="badge" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem' }}>
              {course}
            </span>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: 'var(--color-surface)' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>Skills to Learn</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {results[0]?.career.requiredSkills.map(skill => (
            <span key={skill} className="badge" style={{ background: 'var(--color-secondary)', color: 'white', padding: '0.5rem 1rem' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
