import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
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
          <Link to="/questionnaire" className="btn btn-primary btn-sm">Find My Career Path</Link>
          <Link to="/careers" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Careers</Link>
          <Link to="/courses" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Courses</Link>
          <Link to="/institutions" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Institutions</Link>
          <Link to="/scholarships" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>Scholarships</Link>
        </div>
      </div>
    </nav>
  )
}
