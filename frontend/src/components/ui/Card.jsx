import React from 'react';

export function Card({ className = '', children, ...props }) {
  return <div className={`ui-card ${className}`.trim()} {...props}>{children}</div>;
}
export function CardHeader({ className = '', children, ...props }) {
  return <div className={`ui-card__header ${className}`.trim()} {...props}>{children}</div>;
}
export function CardTitle({ className = '', children, ...props }) {
  return <h3 className={`ui-card__title ${className}`.trim()} {...props}>{children}</h3>;
}
export function CardContent({ className = '', children, ...props }) {
  return <div className={`ui-card__content ${className}`.trim()} {...props}>{children}</div>;
}
export default Card;
