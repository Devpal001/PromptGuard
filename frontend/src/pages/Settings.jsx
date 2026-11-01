import React from 'react'
import { Check, HelpCircle, Database, KeyRound, LockKeyhole, ShieldCheck, SlidersHorizontal } from 'lucide-react'

const privacyItems = [
  { icon: KeyRound, title: 'Credentials stay on the backend', detail: 'API credentials are never exposed in the browser.' },
  { icon: Database, title: 'No persistent result history', detail: 'Scan results remain in the current session only.' },
  { icon: LockKeyhole, title: 'Uploads are not retained', detail: 'Documents are processed for scanning and then discarded.' },
  { icon: ShieldCheck, title: 'No telemetry', detail: 'The app does not collect analytics or send usage data.' },
]

const Settings = () => (
  <div className="tool-page settings-page">
    <header className="tool-page-heading">
      <div>
        <span className="eyebrow muted">WORKSPACE PREFERENCES</span>
        <h1>Settings</h1>
        <p>Understand the active test mode and how this workspace handles data.</p>
      </div>
      <span className="context-pill"><SlidersHorizontal size={15} /> Workspace</span>
    </header>

    <section className="surface-card settings-mode-card">
      <div className="settings-mode-copy">
        <span className="panel-icon panel-icon-red"><ShieldCheck size={19} /></span>
        <div><span className="eyebrow muted">TARGET MODE</span><h2>Demo mode</h2><p>Ready to use without API credentials. Chatbot responses are simulated for educational testing.</p></div>
      </div>
      <span className="mode-status"><span /> Active</span>
        <div className="settings-mode-footer"><HelpCircle size={16} /><span>Connected mode requires API configuration on the backend.</span></div>
    </section>

    <section className="section privacy-section">
      <div className="section-header">
        <div><span className="eyebrow muted">DATA & SAFETY</span><h2 className="section-title">Privacy and security</h2><p className="section-subtitle">The workspace is designed to keep testing data temporary.</p></div>
      </div>
      <div className="privacy-list surface-card">
        {privacyItems.map(({ icon: Icon, title, detail }) => (
          <article className="privacy-item" key={title}>
            <span className="privacy-icon"><Icon size={18} /></span>
            <div><h3>{title}</h3><p>{detail}</p></div>
            <Check className="privacy-check" size={17} aria-label="Enabled" />
          </article>
        ))}
      </div>
      <div className="settings-note"><LockKeyhole size={16} /><p><strong>Screening aid only.</strong> A “Safe” scanner result does not prove content is safe. Review the evidence and target response before drawing conclusions.</p></div>
    </section>
  </div>
)

export default Settings
