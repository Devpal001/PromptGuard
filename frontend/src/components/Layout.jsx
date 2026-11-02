import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ShieldCheck, LayoutDashboard, ScanLine, FileSearch, BarChart3, Settings2, HelpCircle, ArrowUpRight } from 'lucide-react'

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
  const [open, setOpen] = useState(false)
  const title = pageNames[location.pathname] || 'Workspace'
  return (
    <div className="app-shell">
      <button className="sidebar-toggle" onClick={() => setOpen(true)} aria-label="Open navigation">Menu</button>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation">×</button>
        <a className="brand" href="/" aria-label="PromptGuard home">
          <span className="brand-mark"><ShieldCheck size={16} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>PromptGuard</strong></span>
        </a>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} onClick={() => setOpen(false)}>
              <Icon size={16} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-status"><span className="status-dot" /> Local, session only</span>
          <a className="help-link" href="/settings"><HelpCircle size={16} /> Help & guidance <ArrowUpRight size={14} /></a>
          <p className="sidebar-quiet">Use only with systems you own or are authorized to assess.</p>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar"><div className="crumb"><span>Workspace</span><b>/</b><strong>{title}</strong></div><div className="topbar-right"><span className="topbar-caption">Demo mode</span></div></header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
