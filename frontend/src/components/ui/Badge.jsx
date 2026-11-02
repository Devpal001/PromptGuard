import React from 'react';

export function Badge({ variant = 'default', className = '', children, ...props }) {
  return <span className={`ui-badge ui-badge--${variant} ${className}`.trim()} {...props}>{children}</span>;
}
export default Badge;
