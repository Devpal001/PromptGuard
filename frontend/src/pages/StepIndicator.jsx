import React from 'react'

const labels = ['Scan', 'Review', 'Test']

export default function StepIndicator({ current = 0 }) {
  return (
    <ol className="step-indicator" aria-label="Testing steps">
      {labels.map((label, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'future'
        return (
          <li key={label} className={`step-indicator__item step-indicator__item--${state}`} aria-current={index === current ? 'step' : undefined}>
            <span className="step-indicator__number" aria-hidden="true">{index < current ? '✓' : String(index + 1).padStart(2, '0')}</span>{label}
          </li>
        )
      })}
    </ol>
  )
}
