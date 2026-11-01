import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, FileSearch, LockKeyhole, ScanLine, ShieldCheck } from 'lucide-react'

const Results = () => (
  <div className="tool-page results-page">
    <header className="tool-page-heading">
      <div>
        <span className="eyebrow muted">TEST HISTORY</span>
        <h1>Results</h1>
        <p>Review scanner findings and chatbot behavior as separate checks.</p>
      </div>
      <span className="context-pill"><LockKeyhole size={15} /> Session only</span>
    </header>

    <section className="results-empty surface-card">
      <span className="empty-icon"><BarChart3 size={25} /></span>
      <span className="eyebrow muted">NO SESSION RESULTS</span>
      <h2>Your next test will appear here</h2>
      <p>Results stay in the current session. Start a scan to review the input verdict, evidence, and any chatbot response.</p>
      <div className="empty-actions">
        <Link to="/text" className="btn btn-primary"><ScanLine size={17} /> Start a text test <ArrowRight size={16} className="btn-arrow" /></Link>
        <Link to="/document" className="btn btn-secondary"><FileSearch size={17} /> Scan a document</Link>
      </div>
    </section>

    <section className="section results-explainer">
      <div className="section-header">
        <div><span className="eyebrow muted">READING A RESULT</span><h2 className="section-title">Two signals, kept distinct</h2></div>
      </div>
      <div className="results-guide-grid">
        <article className="surface-card result-guide-card">
          <span className="guide-number">01</span>
          <span className="panel-icon panel-icon-red"><ScanLine size={19} /></span>
          <h3>Input screening</h3>
          <p>Shows which patterns the scanner found in the text or extracted document content.</p>
        </article>
        <article className="surface-card result-guide-card">
          <span className="guide-number">02</span>
          <span className="panel-icon"><ShieldCheck size={19} /></span>
          <h3>Chatbot evaluation</h3>
          <p>Describes whether the demo chatbot maintained its role and protected hidden information.</p>
        </article>
      </div>
    </section>
  </div>
)

export default Results
