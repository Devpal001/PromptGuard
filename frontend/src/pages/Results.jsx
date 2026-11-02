import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, FileSearch, ScanLine } from 'lucide-react'

const Results = () => (
  <div className="tool-page results-page">
    <header className="tool-page-heading">
      <div>
        <h1>Results</h1>
        <p>Review scanner findings and chatbot behavior as separate checks.</p>
      </div>
    </header>
    <p className="quiet-note">Results are kept for this session only.</p>

    <section className="results-empty">
      <h2>Your next test will appear here</h2>
      <p>Results stay in the current session. Start a scan to review the input verdict, evidence, and any chatbot response.</p>
      <div className="empty-actions">
        <Link to="/text" className="btn btn-primary"><ScanLine size={17} /> Start a text test <ArrowRight size={16} className="btn-arrow" /></Link>
        <Link to="/document" className="btn btn-secondary">Scan a document</Link>
      </div>
    </section>

    <details className="disclosure">
      <summary>How results are read</summary>
      <p>Input screening shows which patterns the scanner found. Chatbot evaluation is reviewed separately from the scanner verdict.</p>
    </details>
  </div>
)

export default Results
