import React, { useRef, useState } from 'react'
import axios from 'axios'
import { ArrowRight, FileSearch, FileText, FileUp, LockKeyhole, ShieldAlert } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Alert } from '../components/ui/Alert'

export default function DocumentScanner() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const chooseFile = next => {
    if (!next) return
    setError('')
    setResult(null)
    if (next.size > 4 * 1024 * 1024) { setError('This file is larger than the 4 MB limit. Choose a smaller file.'); return }
    if (!/\.(pdf|txt)$/i.test(next.name)) { setError('Choose a PDF or TXT file.'); return }
    setFile(next)
  }

  const scanFile = async () => {
    if (!file) return
    setLoading(true); setError('')
    try {
      const form = new FormData()
      form.append('file', file)
      const { data } = await axios.post('/api/scan-file', form)
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not scan this file. Check that the backend is running.')
    } finally { setLoading(false) }
  }

  const verdictClass = value => ({ Safe: 'result-safe', Risky: 'result-risky', Blocked: 'result-blocked' }[value] || 'result-error')

  return (
    <div className="tool-page">
      <header className="tool-page-heading">
        <div>
          <h1>Inspect a document</h1>
          <p>Extract document text and check for embedded instructions before using it with a chatbot.</p>
        </div>
      </header>

      <ol className="process-steps" aria-label="Document scan steps">
        <li className="process-step current"><span>1</span> Upload file</li>
        <li className="process-step"><span>2</span> Extract text</li>
        <li className="process-step"><span>3</span> Review findings</li>
      </ol>

      <section className="surface-card upload-panel">
        <button
          className={`upload-zone${file ? ' has-file' : ''}`}
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={event => event.preventDefault()}
          onDrop={event => { event.preventDefault(); chooseFile(event.dataTransfer.files?.[0]) }}
        >
          <input ref={inputRef} type="file" accept=".pdf,.txt,application/pdf,text/plain" hidden onChange={event => chooseFile(event.target.files?.[0])} />
          <span className="upload-icon">{file ? <FileText size={23} /> : <FileUp size={23} />}</span>
          <strong>{file ? file.name : 'Drop your document here'}</strong>
          <span>{file ? `${(file.size / 1024).toFixed(0)} KB · click to replace` : 'or click to browse · PDF or TXT'}</span>
        </button>
        <p className="quiet-note">PDF or TXT, up to 4 MB. Processed in this session and not stored. No OCR for scanned PDFs.</p>
        <details className="disclosure">
          <summary>What happens to my file</summary>
          <p>Text is extracted and checked for suspicious instructions. The upload is processed for this scan and is not saved as session history.</p>
        </details>
        <Button variant="primary" onClick={scanFile} disabled={!file || loading}>
          <FileSearch size={17} />{loading ? 'Extracting and scanning…' : 'Scan document'}
        </Button>
      </section>

      {error && <Alert variant="error" role="alert"><ShieldAlert size={17} />{error}</Alert>}

      {result && (
        <section className="surface-card result-panel">
          <div className="result-panel-heading">
            <div><h2>{result.filename || file?.name}</h2></div>
            <span className={`result-badge ${verdictClass(result.scan_result?.verdict)}`}>{result.scan_result?.verdict || 'Needs review'}</span>
          </div>
          <div className={`extraction-panel${result.extraction_status === 'warning' ? ' extraction-warning' : ''}`}>
            <strong>{result.extraction_status === 'warning' ? 'Extraction warning' : 'Text extraction complete'}</strong>
            <p>{result.extraction_message}</p>
          </div>
          {result.extracted_text && <details className="extracted-panel"><summary>Review extracted text</summary><pre>{result.extracted_text.slice(0, 2500)}{result.extracted_text.length > 2500 ? '\n…' : ''}</pre></details>}
          <p className="result-summary">{result.scan_result?.message}</p>
          {result.scan_result?.findings?.length > 0 && <ul className="evidence-list">{result.scan_result.findings.map((finding, index) => <li key={index}><strong>{finding.category}</strong><p>{finding.explanation}</p>{finding.evidence_excerpt && <code>{finding.evidence_excerpt}</code>}</li>)}</ul>}
          {result.scan_result?.verdict === 'Risky' && <div className="confirm-panel"><div><strong>Ready to test chatbot behavior?</strong><p>Continue to the Text Playground to review and confirm the chatbot test.</p></div><a className="btn btn-secondary" href="/text">Open playground <ArrowRight size={16} className="btn-arrow" /></a></div>}
        </section>
      )}
    </div>
  )
}
