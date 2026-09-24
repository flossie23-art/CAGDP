import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { institutions } from '../data/institutions'
import { useAuth } from '../contexts/AuthContext'

export default function InstitutionDetail() {
  const { id } = useParams<{ id: string }>()
  const { saveItem, isSaved } = useAuth()
  const institution = institutions.find(i => i.id === id)

  if (!institution) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Institution Not Found</h1>
        <Link to="/institutions" className="btn btn-primary">Back to Institutions</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <Link to="/institutions" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Institutions
      </Link>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{institution.name}</h1>
            <span className="badge" style={{ background: 'var(--color-primary)', color: 'white' }}>
              {institution.type}
            </span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => saveItem('institution', institution.id)}>
            {isSaved('institution', institution.id) ? 'Saved ✓' : 'Save'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>📍 Location</h4>
            <p style={{ color: 'var(--color-muted)' }}>{institution.location}</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>🌐 Website</h4>
            <a href={institution.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
              {institution.website}
            </a>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Courses Offered</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {institution.courses.map(c => (
              <span key={c} className="badge" style={{ background: 'var(--color-border)', color: 'var(--color-text)' }}>{c}</span>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Admission Information</h4>
          <p style={{ color: 'var(--color-muted)' }}>{institution.admissionInformation}</p>
        </div>

        <div className="card" style={{ padding: '1rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Accreditation</h4>
          <p style={{ color: 'var(--color-muted)' }}>{institution.accreditationInformation}</p>
        </div>
      </div>
    </div>
  )
}
