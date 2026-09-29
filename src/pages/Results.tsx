import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuestionnaire } from '../contexts/QuestionnaireContext'
import { useAuth } from '../contexts/AuthContext'
import CareerCard from '../components/career/CareerCard'

export default function Results() {
  const { results, hasSubmitted, resetQuestionnaire } = useQuestionnaire()
  const { saveItem, isSaved } = useAuth()
  const navigate = useNavigate()

  if (!hasSubmitted || !results || results.length === 0) {
    return (
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>No Results Yet</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Complete the questionnaire to see your personalized recommendations.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/questionnaire" className="btn btn-primary">
            Take the Questionnaire
          </Link>
          <Link to="/careers" className="btn btn-outline">
            Browse all careers
          </Link>
        </div>
      </div>
    )
  }

  const topMatch = results[0]
  const supportingMatches = results.slice(1, 6)

  const handleRetake = () => {
    resetQuestionnaire()
    navigate('/questionnaire')
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
            onExplore={career => navigate(`/careers/${career.id}`)}
            onSave={id => saveItem('career', id)}
            isSaved={isSaved('career', result.career.id)}
          />
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem', background: 'var(--color-surface)' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Related Courses</h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
          Courses that lead toward your strongest match, {topMatch.career.name}.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {topMatch.career.relatedCourses.map(course => (
            <span
              key={course}
              className="badge"
              style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem 1rem' }}
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem', background: 'var(--color-surface)' }}>
        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Skills to Learn</h2>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
          Skills to focus on for {topMatch.career.name}.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {topMatch.career.requiredSkills.map(skill => (
            <span
              key={skill}
              className="badge"
              style={{ background: 'var(--color-secondary)', color: 'white', padding: '0.5rem 1rem' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {supportingMatches.length > 0 && (
        <div className="card" style={{ marginTop: '1rem', background: 'var(--color-surface)' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Also worth exploring</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {supportingMatches.map(result => (
              <span
                key={result.career.id}
                className="badge"
                style={{ background: 'var(--color-border)', color: 'var(--color-text)', padding: '0.5rem 1rem' }}
              >
                {result.career.name} · {result.matchLevel}
              </span>
            ))}
          </div>
        </div>
      )}

      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '2rem', textAlign: 'center' }}>
        These results are guidance, not guarantees. Explore each career to learn more before deciding.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-outline" onClick={handleRetake}>
          Retake the questionnaire
        </button>
        <Link to="/courses" className="btn btn-outline">
          Explore courses
        </Link>
        <Link to="/institutions" className="btn btn-primary">
          Find institutions
        </Link>
      </div>
    </div>
  )
}
