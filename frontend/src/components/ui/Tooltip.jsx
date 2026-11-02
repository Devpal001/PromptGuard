import React from 'react';

export function Tooltip({ label, children }) {
  return (
    <span className="ui-tooltip" title={label}>{children}</span>
  );
}
export default Tooltip;
