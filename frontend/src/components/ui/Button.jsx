import React from 'react';

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button className={`ui-btn ui-btn--${variant} ui-btn--${size} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
export default Button;
