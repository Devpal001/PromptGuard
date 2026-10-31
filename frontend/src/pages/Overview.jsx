import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ShieldCheck, ScanLine, FileSearch, LockKeyhole, CheckCircle2, AlertCircle, FlaskConical, Activity } from 'lucide-react'

const Overview = () => <div className="overview-page">
  <section className="hero-panel">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-copy">
      <div className="eyebrow"><span className="eyebrow-pulse" /> AI SECURITY WORKSPACE</div>
      <h1>Test the boundaries.<br /><span>Strengthen the response.</span></h1>
      <p>Explore how a chatbot handles prompt injection, then inspect suspicious text and documents before they reach it.</p>
      <div className="hero-actions"><Link to="/text" className="button button-primary"><ScanLine size={17} /> Start a text test <ArrowRight size={16} /></Link><Link to="/document" className="button button-secondary"><FileSearch size={17} /> Scan a document</Link></div>
    </div>
    <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="shield-core"><ShieldCheck size={43} /></div><span className="orbit-node node-a"><LockKeyhole size={15} /></span><span className="orbit-node node-b"><ScanLine size={15} /></span><span className="orbit-node node-c"><CheckCircle2 size={15} /></span></div>
    <div className="hero-foot"><span><span className="live-dot" /> Demo target ready</span><span>Local session <b>·</b> no data retained</span></div>
  </section>

  <div className="section-heading"><div><div className="eyebrow muted">YOUR WORKSPACE</div><h2>Choose a testing path</h2><p>Scan content first, then decide whether to test it against the chatbot.</p></div><Link to="/results" className="text-link">View results <ArrowUpRight size={15} /></Link></div>
  <section className="action-grid">
    <Link to="/text" className="action-card text-card"><div className="card-topline"><span className="feature-icon cyan-icon"><ScanLine size={20} /></span><span className="card-index">01 / DIRECT INPUT</span></div><h3>Live text playground</h3><p>Scan a prompt for suspicious instructions, then test the chatbot’s response with a clear confirmation step.</p><div className="card-bottom"><span>Text scanner <i /> Chatbot evaluation</span><span className="round-arrow"><ArrowRight size={17} /></span></div></Link>
    <Link to="/document" className="action-card doc-card"><div className="card-topline"><span className="feature-icon violet-icon"><FileSearch size={20} /></span><span className="card-index">02 / INDIRECT INPUT</span></div><h3>Document scanner</h3><p>Inspect PDF and TXT content for embedded instructions and test how the chatbot treats that context.</p><div className="card-bottom"><span>PDF <i /> TXT <i /> No file retention</span><span className="round-arrow"><ArrowRight size={17} /></span></div></Link>
  </section>

  <div className="section-heading compact-heading"><div><div className="eyebrow muted">HOW IT WORKS</div><h2>Two checks. One clear result.</h2></div></div>
  <section className="workflow-grid">
    <article className="workflow-card"><span className="step-number">01</span><span className="workflow-icon"><ScanLine size={18} /></span><h3>Inspect the input</h3><p>Rule-based screening highlights patterns that may signal an injection attempt.</p><span className="mini-status status-risk">Scanner · Risky</span></article>
    <article className="workflow-card"><span className="step-number">02</span><span className="workflow-icon"><AlertCircle size={18} /></span><h3>Review and confirm</h3><p>Risky content requires your confirmation before it is sent to the chatbot.</p><span className="mini-status status-review">You stay in control</span></article>
    <article className="workflow-card"><span className="step-number">03</span><span className="workflow-icon"><FlaskConical size={18} /></span><h3>Evaluate the response</h3><p>Review the target response, expected behavior, verdict, and supporting evidence.</p><span className="mini-status status-ready">Test · Evidence-led</span></article>
  </section>

  <section className="disclaimer-strip"><span className="disclaimer-icon"><Activity size={17} /></span><p><strong>Interpret results carefully.</strong> “Safe” means no supported pattern matched; it does not prove that content is safe. This educational tool is not a complete security defense.</p><Link to="/settings">Read limitations <ArrowRight size={14} /></Link></section>
</div>

export default Overview
