import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ShieldCheck, ScanLine, FileSearch, LockKeyhole, FlaskConical, Activity } from 'lucide-react'

const Overview = () => (
  <div className="overview-page">
    <section className="hero-panel">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          AI SECURITY LAB
        </div>
        <h1 className="hero-title">
          Test the boundaries.<br />
          <span className="hero-title-accent">Strengthen the response.</span>
        </h1>
        <p className="hero-subtitle">
          Scan text and documents for prompt injection patterns, then test approved content against a chatbot with clear, evidence-led results.
        </p>
        <div className="hero-actions">
          <Link to="/text" className="btn btn-primary">
            <ScanLine size={18} />
            Start a text test
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
          <Link to="/document" className="btn btn-secondary">
            <FileSearch size={18} />
            Scan a document
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-shield">
          <ShieldCheck size={48} strokeWidth={2} />
        </div>
        <div className="hero-glow" />
      </div>
    </section>

    <section className="section">
      <div className="section-header">
        <div>
          <div className="eyebrow muted">WORKSPACE</div>
          <h2 className="section-title">Choose a testing path</h2>
          <p className="section-subtitle">Scan content first, then decide whether to test it against the chatbot.</p>
        </div>
        <Link to="/results" className="link-arrow">
          View results
          <ArrowUpRight size={16} />
        </Link>
      </div>
      
      <div className="card-grid">
        <Link to="/text" className="card card-hover">
          <div className="card-header">
            <div className="card-icon card-icon-cyan">
              <ScanLine size={22} />
            </div>
          </div>
          <h3 className="card-title">Text playground</h3>
          <p className="card-description">
            Scan a prompt for suspicious instructions, then test the chatbot's response with a clear confirmation step.
          </p>
          <div className="card-footer">
            <span className="card-meta">Text scanner · Chatbot evaluation</span>
            <ArrowRight size={18} className="card-arrow" />
          </div>
        </Link>
        
        <Link to="/document" className="card card-hover">
          <div className="card-header">
            <div className="card-icon card-icon-red">
              <FileSearch size={22} />
            </div>
          </div>
          <h3 className="card-title">Document scanner</h3>
          <p className="card-description">
            Inspect PDF and TXT content for embedded instructions and test how the chatbot treats that context.
          </p>
          <div className="card-footer">
            <span className="card-meta">PDF · TXT · No file retention</span>
            <ArrowRight size={18} className="card-arrow" />
          </div>
        </Link>
      </div>
    </section>

    <section className="section">
      <div className="section-header">
        <div>
          <div className="eyebrow muted">WORKFLOW</div>
          <h2 className="section-title">Two checks. One clear result.</h2>
        </div>
      </div>
      
      <div className="workflow-grid">
        <div className="workflow-card">
          <div className="workflow-number">01</div>
          <div className="workflow-icon">
            <ScanLine size={20} />
          </div>
          <h3 className="workflow-title">Inspect the input</h3>
          <p className="workflow-description">Rule-based screening highlights patterns that may signal an injection attempt.</p>
        </div>
        
        <div className="workflow-card">
          <div className="workflow-number">02</div>
          <div className="workflow-icon">
            <LockKeyhole size={20} />
          </div>
          <h3 className="workflow-title">Review and confirm</h3>
          <p className="workflow-description">Risky content requires your confirmation before it is sent to the chatbot.</p>
        </div>
        
        <div className="workflow-card">
          <div className="workflow-number">03</div>
          <div className="workflow-icon">
            <FlaskConical size={20} />
          </div>
          <h3 className="workflow-title">Evaluate the response</h3>
          <p className="workflow-description">Review the target response, expected behavior, verdict, and supporting evidence.</p>
        </div>
      </div>
    </section>

    <div className="disclaimer">
      <Activity size={18} />
      <p>
        <strong>Interpret results carefully.</strong> "Safe" means no supported pattern matched; it does not prove that content is safe. This educational tool is not a complete security defense.
      </p>
    </div>
  </div>
)

export default Overview

