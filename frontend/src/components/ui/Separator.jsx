import React from 'react';

export function Separator({ className = '' }) {
  return <hr className={`ui-separator ${className}`.trim()} />;
}
export default Separator;
