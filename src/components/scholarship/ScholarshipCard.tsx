import React from 'react'
import { Scholarship } from '../../types'

interface ScholarshipCardProps {
  scholarship: Scholarship
  onSave: (id: string) => void
  isSaved: boolean
}

export default function ScholarshipCard({ scholarship, onSave, isSaved }: ScholarshipCardProps) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontWeight: 700 }}>{scholarship.name}</h3>
        <span className={`badge ${scholarship.status === 'verified' ? 'badge-strong' : 'badge-explore'}`}>
          {scholarship.status === 'verified' ? '✓ Verified' : 'Unverified'}
        </span>
      </div>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        {scholarship.provider}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
        <span className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
          {scholarship.studyLevel}
        </span>
        <span className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
          {scholarship.field}
        </span>
        <span className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>
          📅 {scholarship.deadline}
        </span>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
        {scholarship.eligibility}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <a href={scholarship.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
          Apply Now
        </a>
        <button className="btn btn-outline btn-sm" onClick={() => onSave(scholarship.id)}>
          {isSaved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  )
}
