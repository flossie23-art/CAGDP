import React from 'react'

interface RequirementBannerProps {
  text: string
  met: boolean
}

export default function RequirementBanner({ text, met }: RequirementBannerProps) {
  return (
    <p className="step-banner" data-met={met ? 'true' : 'false'} aria-live="polite">
      <span aria-hidden="true" style={{ fontWeight: 700 }}>
        {met ? '✓' : '▸'}
      </span>
      <span>
        {met ? 'Requirement met. ' : 'This step needs: '}
        {text}
      </span>
    </p>
  )
}
