import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ShieldCheck, LayoutDashboard, ScanLine, FileSearch, BarChart3, Settings2, HelpCircle, ArrowUpRight, Sparkles } from 'lucide-react'

const links = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/text', label: 'Text playground', icon: ScanLine },
  { to: '/document', label: 'Document scanner', icon: FileSearch },
  { to: '/results', label: 'Test results', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings2 },
]
const pageNames = { '/': 'Overview', '/text': 'Text playground', '/document': 'Document scanner', '/results': 'Test results', '/settings': 'Settings' }

export default function Layout({ children }) {
  const location = useLocation()
  const title = pageNames[location.pathname] || 'Workspace'
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="PromptGuard home">
          <span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>PromptGuard</strong><small>AI security lab</small></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon size={18} /><span>{label}</span>{label === 'Test results' && <span className="nav-count">Live</span>}</NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><span className="note-icon"><Sparkles size={15} /></span><div><strong>Built for safe testing</strong><p>Use only with systems you own or are authorized to assess.</p></div></div>
          <a className="help-link" href="/settings"><HelpCircle size={16} /> Help & guidance <ArrowUpRight size={14} /></a>
          <div className="profile-row"><div className="avatar">AI</div><div><strong>Local workspace</strong><span>Session-only data</span></div><span className="online-dot" /></div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar"><div className="crumb"><span>Workspace</span><b>/</b><strong>{title}</strong></div><div className="topbar-right"><span className="environment-pill"><i /> Demo environment</span><span className="topbar-divider" /><span className="topbar-caption">Educational use</span></div></header>
        <main className="page-content">{children}</main>
        <footer className="app-footer"><span>PromptGuard <span className="footer-dot">·</span> AI Prompt Injection Defense Tester</span><span>Screening aid only — no result guarantees safety</span></footer>
      </div>
    </div>
  )
}
