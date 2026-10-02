import React from 'react'

interface StepActionBarProps {
  showBack: boolean
  canContinue: boolean
  statusText: string
  statusMet: boolean
  continueLabel?: string
  onBack: () => void
  onContinue: () => void
}

export default function StepActionBar({
  showBack,
  canContinue,
  statusText,
  statusMet,
  continueLabel = 'Continue',
  onBack,
  onContinue,
}: StepActionBarProps) {
  return (
    <div className="step-action-bar">
      {showBack ? (
        <button type="button" className="btn btn-outline btn-sm" onClick={onBack}>
          Back
        </button>
      ) : (
        <span aria-hidden="true" style={{ width: '1px' }} />
      )}

      <p className="step-action-status" data-met={statusMet ? 'true' : 'false'} aria-live="polite">
        {statusText}
      </p>

      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={onContinue}
        disabled={!canContinue}
      >
        {continueLabel}
      </button>
    </div>
  )
}
