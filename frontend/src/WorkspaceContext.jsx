import { createContext, useContext, useMemo, useState } from 'react'

const WorkspaceContext = createContext(null)

export function WorkspaceProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('promptguard-theme') || 'dark')
  const [experience, setExperience] = useState(() => localStorage.getItem('promptguard-experience') || '')
  const [sessionResults, setSessionResults] = useState([])

  const chooseTheme = value => {
    localStorage.setItem('promptguard-theme', value)
    setTheme(value)
  }

  const chooseExperience = value => {
    localStorage.setItem('promptguard-experience', value)
    setExperience(value)
  }

  const addResult = result => {
    const record = { ...result, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: new Date().toISOString() }
    setSessionResults(current => [record, ...current])
    return record.id
  }

  const updateResult = (id, updates) => setSessionResults(current => current.map(item => item.id === id ? { ...item, ...updates } : item))
  const clearResults = () => setSessionResults([])
  const value = useMemo(() => ({ theme, chooseTheme, experience, chooseExperience, sessionResults, addResult, updateResult, clearResults }), [theme, experience, sessionResults])

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext)
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return context
}
