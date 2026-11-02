import React from 'react';

export function Progress({ value = 0, className = '' }) {
  return (
    <div className={`ui-progress ${className}`.trim()}>
      <div className="ui-progress__bar" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export default Progress;
