import React from 'react'
import { Career, RecommendationResult } from '../../types'

interface CareerCardProps {
  result: RecommendationResult
  onExplore: (career: Career) => void
  onSave: (id: string) => void
  isSaved: boolean
}

export default function CareerCard({ result, onExplore, onSave, isSaved }: CareerCardProps) {
  const { career, matchLevel, reasons } = result

  const badgeClass = matchLevel === 'Strong Match' ? 'badge-strong' :
    matchLevel === 'Good Match' ? 'badge-good' :
      matchLevel === 'Possible Match' ? 'badge-possible' : 'badge-explore'

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.25rem' }}>{career.name}</h3>
        <span className={`badge ${badgeClass}`}>{matchLevel}</span>
      </div>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
        {career.industry}
      </p>
      <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
        {career.description.substring(0, 120)}...
      </p>
      {reasons.length > 0 && (
        <div style={{ marginBottom: '0.75rem', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
          <strong>Why?</strong> {reasons.slice(0, 2).join('; ')}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
        {career.relatedCourses.slice(0, 3).map(course => (
          <span key={course} className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
            {course}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={() => onExplore(career)}>
          Explore Career
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => onSave(career.id)}>
          {isSaved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  )
}
