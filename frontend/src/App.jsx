import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import TextPlayground from './pages/TextPlayground'
import DocumentScanner from './pages/DocumentScanner'
import Results from './pages/Results'
import Settings from './pages/Settings'
import './styles/App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/text" element={<TextPlayground />} />
          <Route path="/document" element={<DocumentScanner />} />
          <Route path="/results" element={<Results />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
