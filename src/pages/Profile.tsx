import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { careers } from '../data/careers'
import { courses } from '../data/courses'
import { institutions } from '../data/institutions'
import { scholarships } from '../data/scholarships'
import { onlineCourses } from '../data/onlineCourses'

export default function Profile() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0', maxWidth: '600px' }}>
        <div className="card">
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Welcome to CAEGDP</h1>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
            Sign in to save careers, courses, scholarships, and track your recommendations.
          </p>
        </div>
      </div>
    )
  }

  const savedItems = {
    careers: user.savedCareers.length,
    courses: user.savedCourses.length,
    institutions: user.savedInstitutions.length,
    scholarships: user.savedScholarships.length,
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1 className="section-title">My Profile</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-primary)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 700,
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontWeight: 700 }}>{user.name}</h2>
            <p style={{ color: 'var(--color-muted)' }}>{user.email}</p>
          </div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={logout}>Sign Out</button>
      </div>

      <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>Saved Items</h2>
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {[
          { label: 'Careers', count: savedItems.careers, icon: '🎯', color: 'var(--color-primary)' },
          { label: 'Courses', count: savedItems.courses, icon: '📚', color: 'var(--color-secondary)' },
          { label: 'Institutions', count: savedItems.institutions, icon: '🏫', color: '#f59e0b' },
          { label: 'Scholarships', count: savedItems.scholarships, icon: '💰', color: '#8b5cf6' },
        ].map(item => (
          <div key={item.label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: item.color }}>{item.count}</div>
            <div style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Account Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          <div>Member since: {new Date(user.createdAt).toLocaleDateString()}</div>
          <div>Account type: Registered</div>
        </div>
      </div>
    </div>
  )
}
