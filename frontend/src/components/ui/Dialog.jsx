import React, { useState } from 'react';

export function Dialog({ trigger, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)} style={{ display: 'inline-block' }}>{trigger}</span>
      {open && (
        <div className="ui-dialog__overlay" onClick={() => setOpen(false)}>
          <div className="ui-dialog__content" onClick={e => e.stopPropagation()}>
            {title && <h3 className="ui-dialog__title">{title}</h3>}
            {children}
            <button className="ui-dialog__close" onClick={() => setOpen(false)}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
export default Dialog;
