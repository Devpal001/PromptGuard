import React from 'react'
import { HelpCircle } from 'lucide-react'

const privacyItems = [
  { title: 'Credentials stay on the backend', detail: 'API credentials are never exposed in the browser.' },
  { title: 'No persistent result history', detail: 'Scan results remain in the current session only.' },
  { title: 'Uploads are not retained', detail: 'Documents are processed for scanning and then discarded.' },
  { title: 'No telemetry', detail: 'The app does not collect analytics or send usage data.' },
]

const Settings = () => (
  <div className="tool-page settings-page">
    <header className="tool-page-heading">
      <div>
        <h1>Settings</h1>
        <p>Understand the active test mode and how this workspace handles data.</p>
      </div>
    </header>

    <section className="surface-card settings-mode-card">
      <div>
        <h2>Demo mode</h2>
        <p>Ready to use without API credentials. Chatbot responses are simulated for educational testing.</p>
      </div>
      <span className="mode-status"><span className="status-dot" /> Active</span>
      <div className="settings-mode-footer"><HelpCircle size={16} /><span>All chatbot tests run locally in the demo simulator. No API credentials are required.</span></div>
    </section>

    <section className="section privacy-section">
      <div className="section-header">
        <div><h2 className="section-title">Privacy and security</h2><p className="section-subtitle">The workspace is designed to keep testing data temporary.</p></div>
      </div>
      <ul className="privacy-list">
        {privacyItems.map(({ title, detail }) => (
          <li key={title}><strong>{title}</strong><p>{detail}</p></li>
        ))}
      </ul>
      <p className="settings-note">Screening aid only. A "Safe" scanner result does not prove content is safe.</p>
    </section>
  </div>
)

export default Settings

