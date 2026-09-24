import React, { useState } from 'react'
import { scholarships } from '../data/scholarships'
import { useAuth } from '../contexts/AuthContext'
import ScholarshipCard from '../components/scholarship/ScholarshipCard'
import { Scholarship } from '../types'
import { filterScholarships } from '../services/searchService'

export default function Scholarships() {
  const { saveItem, isSaved } = useAuth()
  const [filter, setFilter] = useState('')
  const [levelFilter, setLevelFilter] = useState('')

  const levels = ['Undergraduate', 'Postgraduate', 'Professional']

  const filtered = filter
    ? scholarships.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.provider.toLowerCase().includes(filter.toLowerCase()))
    : levelFilter
      ? filterScholarships({ studyLevel: levelFilter })
      : scholarships

  return (
    <div className="container">
      <h1 className="section-title">Scholarships</h1>
      <p className="section-subtitle">Find financial support to fund your education</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          className="input"
          placeholder="Search scholarships..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ maxWidth: '300px' }}
          aria-label="Search scholarships"
        />
        <select
          className="input"
          value={levelFilter}
          onChange={e => setLevelFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
          aria-label="Filter by study level"
        >
          <option value="">All Levels</option>
          {levels.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="grid-2">
        {filtered.map(scholarship => (
          <ScholarshipCard
            key={scholarship.id}
            scholarship={scholarship}
            onSave={(id) => saveItem('scholarship', id)}
            isSaved={isSaved('scholarship', scholarship.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem' }}>No scholarships found matching your search.</p>
        </div>
      )}
    </div>
  )
}
