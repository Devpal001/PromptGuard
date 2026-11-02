import React, { useState } from 'react';

export function Tabs({ tabs, defaultTab, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value);
  const current = tabs.find(t => t.value === active);
  return (
    <div className={`ui-tabs ${className}`.trim()}>
      <div className="ui-tabs__list">
        {tabs.map(t => (
          <button key={t.value} className={`ui-tabs__trigger ${active === t.value ? 'is-active' : ''}`} onClick={() => setActive(t.value)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="ui-tabs__content">{current?.content}</div>
    </div>
  );
}
export default Tabs;
