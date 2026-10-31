import React from 'react'

const Settings = () => {
  return (
    <div>
      <header className="page-header">
        <h1>Settings</h1>
        <p>Configure target mode and API settings</p>
      </header>

      <div className="card">
        <h2>Target Mode</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '1rem'}}>
          Current mode: <strong style={{color: 'var(--accent-primary)'}}>DEMO MODE</strong>
        </p>
        <p>Demo mode works without credentials. Connected mode requires API configuration on the backend.</p>
      </div>

      <div className="card">
        <h2>Privacy & Security</h2>
        <ul style={{marginLeft: '1.5rem', color: 'var(--text-secondary)'}}>
          <li>Credentials are kept on backend only</li>
          <li>No persistent storage - session only</li>
          <li>Uploaded files are not retained</li>
          <li>No telemetry or external data collection</li>
          <li>CORS restricted to local origins</li>
        </ul>
      </div>
    </div>
  )
}

export default Settings
