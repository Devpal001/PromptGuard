import React from 'react';

export function Alert({ variant = 'info', className = '', children, ...props }) {
  return <div className={`ui-alert ui-alert--${variant} ${className}`.trim()} {...props}>{children}</div>;
}
export default Alert;
