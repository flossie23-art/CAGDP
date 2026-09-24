import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Nav() {
  const { isGuest, login } = useAuth()

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid var(--color-border)',
      padding: '0.75rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="container flex-between">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>CAEGDP</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/careers" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Careers</Link>
          <Link to="/courses" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Courses</Link>
          <Link to="/scholarships" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Scholarships</Link>
          {isGuest ? (
            <button className="btn btn-primary btn-sm" onClick={() => login('Guest User', 'guest@example.com')}>Sign In</button>
          ) : (
            <Link to="/profile" className="btn btn-outline btn-sm">Profile</Link>
          )}
        </div>
      </div>
    </nav>
  )
}
