import React from 'react'

const Results = () => {
  return (
    <div>
      <header className="page-header">
        <h1>Results</h1>
        <p>View scanner and chatbot test results separately</p>
      </header>

      <div className="card">
        <h2>Session Results</h2>
        <p style={{color: 'var(--text-secondary)'}}>
          Results are stored in the current session only. No persistent storage.
        </p>
        <p style={{marginTop: '1rem', color: 'var(--text-secondary)'}}>
          Run tests from Text Playground or Document Scanner to see results here.
        </p>
      </div>
    </div>
  )
}

export default Results
