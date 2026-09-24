import React, { useState } from 'react'
import { careers } from '../data/careers'
import { useAuth } from '../contexts/AuthContext'
import CareerCard from '../components/career/CareerCard'
import { Career } from '../types'
import { filterCareers } from '../services/searchService'

export default function Careers() {
  const { saveItem, isSaved } = useAuth()
  const [filter, setFilter] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')

  const industries = ['Technology', 'Healthcare', 'Business / Finance', 'Engineering', 'Education', 'Design / Media', 'Law', 'Agriculture']

  const filtered = filter
    ? careers.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.description.toLowerCase().includes(filter.toLowerCase()))
    : industryFilter
      ? filterCareers({ industry: industryFilter })
      : careers

  return (
    <div className="container">
      <h1 className="section-title">Explore Careers</h1>
      <p className="section-subtitle">Discover career paths that match your interests and strengths</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          className="input"
          placeholder="Search careers..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ maxWidth: '300px' }}
          aria-label="Search careers"
        />
        <select
          className="input"
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
          style={{ maxWidth: '200px' }}
          aria-label="Filter by industry"
        >
          <option value="">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      <div className="grid-3">
        {filtered.map(career => (
          <CareerCard
            key={career.id}
            result={{ career, score: 0, matchLevel: 'Explore Further', reasons: [] }}
            onExplore={(c) => window.location.href = `/careers/${c.id}`}
            onSave={(id) => saveItem('career', id)}
            isSaved={isSaved('career', career.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem' }}>No careers found matching your search.</p>
        </div>
      )}
    </div>
  )
}
