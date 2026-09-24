import React from 'react'
import { Institution } from '../../types'

interface InstitutionCardProps {
  institution: Institution
  onExplore: (institution: Institution) => void
  onSave: (id: string) => void
  isSaved: boolean
}

export default function InstitutionCard({ institution, onExplore, onSave, isSaved }: InstitutionCardProps) {
  const typeColors: Record<string, string> = {
    University: 'var(--color-primary)',
    Polytechnic: 'var(--color-secondary)',
    College: '#f59e0b',
    'Technical Institution': '#8b5cf6',
    'Vocational Training Centre': '#ec4899',
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontWeight: 700 }}>{institution.name}</h3>
        <span className="badge" style={{ background: typeColors[institution.type] || 'var(--color-border)', color: 'white' }}>
          {institution.type}
        </span>
      </div>
      <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        📍 {institution.location}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
        {institution.courses.slice(0, 3).join(', ')}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={() => onExplore(institution)}>
          Explore
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => onSave(institution.id)}>
          {isSaved ? 'Saved ✓' : 'Save'}
        </button>
      </div>
    </div>
  )
}
