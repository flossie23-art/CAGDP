import React, { useState } from 'react'
import { institutions } from '../data/institutions'
import { useAuth } from '../contexts/AuthContext'
import InstitutionCard from '../components/institution/InstitutionCard'
import { Institution } from '../types'

export default function Institutions() {
  const { saveItem, isSaved } = useAuth()
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const types = ['University', 'Polytechnic', 'College', 'Technical Institution', 'Vocational Training Centre']

  const filtered = filter
    ? institutions.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()) || i.location.toLowerCase().includes(filter.toLowerCase()))
    : typeFilter
      ? institutions.filter(i => i.type === typeFilter)
      : institutions

  return (
    <div className="container">
      <h1 className="section-title">Explore Institutions</h1>
      <p className="section-subtitle">Find universities, polytechnics, colleges, and training centres</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          className="input"
          placeholder="Search institutions..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ maxWidth: '300px' }}
          aria-label="Search institutions"
        />
        <select
          className="input"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
          aria-label="Filter by type"
        >
          <option value="">All Types</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid-3">
        {filtered.map(institution => (
          <InstitutionCard
            key={institution.id}
            institution={institution}
            onExplore={(i) => window.location.href = `/institutions/${i.id}`}
            onSave={(id) => saveItem('institution', id)}
            isSaved={isSaved('institution', institution.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem' }}>No institutions found matching your search.</p>
        </div>
      )}
    </div>
  )
}
