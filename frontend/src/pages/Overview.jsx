import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, ArrowUpRight, FileSearch, LockKeyhole, ScanLine, ShieldCheck, Sparkles } from 'lucide-react'
import { useWorkspace } from '../WorkspaceContext'
import ThreatRadar from '../components/ThreatRadar'

const Overview = () => {
  const { sessionResults } = useWorkspace()
  const riskyCount = sessionResults.filter(item => ['Risky', 'Blocked'].includes(item.scannerVerdict)).length

  return (
    <div className="overview-page">
      <section className="overview-intro">
        <div className="overview-intro-copy">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> PROMPT INJECTION SECURITY LAB</span>
            <h1>Test how your AI handles hostile instructions.</h1>
            <p>Scan text and documents for suspicious instructions, then check how the demo target responds.</p>
          </div>
          <div className="overview-actions">
            <Link to="/text" className="btn btn-primary"><ScanLine size={17} /> New text test <ArrowRight size={16} /></Link>
            <Link to="/document" className="btn btn-secondary"><FileSearch size={17} /> Inspect a document</Link>
          </div>
        </div>
        <ThreatRadar />
      </section>

      <section className="overview-status-grid" aria-label="Workspace status">
        <article className="status-card"><span className="status-card-icon status-icon-green"><ShieldCheck size={18} /></span><div><span className="status-label">Screening</span><strong>Rule-based checks active</strong><small>Demo engine ready</small></div><span className="status-indicator">Active</span></article>
        <article className="status-card"><span className="status-card-icon"><Activity size={18} /></span><div><span className="status-label">Session scans</span><strong>{sessionResults.length} {sessionResults.length === 1 ? 'result' : 'results'}</strong><small>{riskyCount} need review</small></div></article>
        <article className="status-card"><span className="status-card-icon"><LockKeyhole size={18} /></span><div><span className="status-label">Data handling</span><strong>Session only</strong><small>Nothing saved as history</small></div></article>
      </section>

      <section className="section overview-workspace-section">
        <div className="section-header"><div><span className="eyebrow muted">TEST SURFACE</span><h2 className="section-title">Choose an input</h2><p className="section-subtitle">Review the evidence before deciding what to test next.</p></div><Link to="/results" className="link-arrow">View session results <ArrowUpRight size={16} /></Link></div>
        <div className="card-grid overview-tool-grid">
          <Link to="/text" className="card card-hover tool-choice-card"><div className="card-icon card-icon-cyan"><ScanLine size={21} /></div><div><span className="tool-card-kicker">01 / TEXT INPUT</span><h3 className="card-title">Test an input</h3><p className="card-description">Find suspicious instruction patterns, inspect the evidence, and try the demo target when appropriate.</p></div><ArrowRight className="card-arrow" size={18} /></Link>
          <Link to="/document" className="card card-hover tool-choice-card"><div className="card-icon card-icon-cyan"><FileSearch size={21} /></div><div><span className="tool-card-kicker">02 / DOCUMENT INPUT</span><h3 className="card-title">Inspect a document</h3><p className="card-description">Extract text from a PDF or TXT file and check it for embedded instructions.</p></div><ArrowRight className="card-arrow" size={18} /></Link>
        </div>
      </section>

      <section className="overview-lower-grid">
        <article className="surface-card overview-learning-card"><div className="panel-heading"><span className="panel-icon"><Sparkles size={18} /></span><div><span className="eyebrow muted">WORKFLOW</span><h2>From signal to response</h2></div></div><ol className="overview-steps"><li><span>01</span><div><strong>Scan untrusted input</strong><p>Check for patterns commonly used in prompt injection.</p></div></li><li><span>02</span><div><strong>Inspect the evidence</strong><p>Review the matched text and context before continuing.</p></div></li><li><span>03</span><div><strong>Test the demo response</strong><p>See whether the simulated target follows the expected safe behavior.</p></div></li></ol><details className="disclosure"><summary>How to read a finding</summary><p><strong>No pattern matched</strong> is not proof of safety. <strong>Evidence</strong> shows what influenced a finding. Scanner screening and chatbot evaluation are separate checks.</p></details></article>
        <article className="surface-card recent-session-card"><div className="section-header"><div><span className="eyebrow muted">RECENT ACTIVITY</span><h2 className="section-title">This session</h2></div><Link to="/results" className="icon-link" aria-label="Open results"><ArrowUpRight size={18} /></Link></div>{sessionResults.length ? <ul className="recent-result-list">{sessionResults.slice(0, 3).map(item => <li key={item.id}><span className={`result-dot ${item.scannerVerdict.toLowerCase().replace(/\s+/g, '-')}`} /><div><strong>{item.title || item.source}</strong><small>{item.source} · {new Date(item.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</small></div><span className={`result-badge ${item.scannerVerdict === 'Safe' ? 'result-safe' : item.scannerVerdict === 'Risky' ? 'result-risky' : 'result-blocked'}`}>{item.scannerVerdict}</span></li>)}</ul> : <div className="session-empty"><span className="empty-icon"><Activity size={20} /></span><strong>No scans in this session yet</strong><p>Run a text or document scan to see findings and response checks here.</p><Link to="/results" className="link-arrow">Explore sample results <ArrowRight size={15} /></Link></div>}</article>
      </section>

      <p className="overview-disclaimer"><ShieldCheck size={16} /><span><strong>Screening aid only.</strong> PromptGuard is an educational demo, not a complete security defense.</span></p>
    </div>
  )
}

export default Overview
