import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShieldCheck, LayoutDashboard, ScanLine, FileSearch, BarChart3, Settings2, HelpCircle, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useWorkspace } from '../WorkspaceContext'

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
  const { theme, chooseTheme } = useWorkspace()
  const title = pageNames[location.pathname] || 'Workspace'
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  return (
    <div className="app-shell" data-theme={theme}>
      <div className="cyber-atmosphere" aria-hidden="true"><span className="cyber-scanline" /></div>
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="PromptGuard home">
          <span className="brand-mark"><ShieldCheck size={16} strokeWidth={2.2} /></span>
          <span className="brand-copy"><strong>PromptGuard</strong><small>Prompt injection security lab</small></span>
        </Link>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} title={label} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} aria-hidden="true" /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-status"><span className="status-dot" /> Local demo · session only</span>
          <Link className="help-link" to="/settings"><HelpCircle size={16} /> Help & guidance <ArrowUpRight size={14} /></Link>
          <p className="sidebar-quiet">Results stay in this browser session.</p>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div className="crumb"><span>Workspace</span><b>/</b><strong>{title}</strong></div>
          <div className="topbar-right">
            <span className="topbar-caption"><span className="status-dot" /> DEMO / LOCAL</span>
            <button className="theme-toggle" type="button" onClick={() => chooseTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>
        <main className="page-content"><div key={location.pathname} className="page-transition">{children}</div></main>
      </div>
      <nav className="mobile-nav" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} aria-label={label}>
            <Icon size={18} aria-hidden="true" /><span>{label === 'Text playground' ? 'Text' : label === 'Document scanner' ? 'Files' : label === 'Test results' ? 'Results' : label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
