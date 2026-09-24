import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '2rem 0',
      marginTop: '3rem',
    }}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>CAEGDP</h3>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
              Graduate Career Guidance & Opportunity Platform. Helping Nigerian graduates find their path.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <Link to="/questionnaire" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Career Questionnaire</Link>
              <Link to="/careers" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Explore Careers</Link>
              <Link to="/courses" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Explore Courses</Link>
              <Link to="/scholarships" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>Scholarships</Link>
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>JAMB</a>
              <a href="https://www.waeconline.org.ng" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>WAEC</a>
              <a href="https://www.neco.gov.ng" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>NECO</a>
              <a href="https://www.nuc.edu.ng" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>NUC</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
            © 2025 CAEGDP. All rights reserved. This platform provides guidance only, not guaranteed outcomes.
          </p>
        </div>
      </div>
    </footer>
  )
}
