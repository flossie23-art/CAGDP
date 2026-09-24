import React from 'react'

export default function Loading() {
  return (
    <div className="flex-center" style={{ minHeight: '50vh' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="progress-bar" style={{ width: '100px', margin: '0 auto 1rem' }}>
          <div className="progress-bar-fill" style={{ width: '30%', animation: 'pulse 1.5s infinite' }} />
        </div>
        <p style={{ color: 'var(--color-muted)' }}>Loading...</p>
      </div>
    </div>
  )
}
