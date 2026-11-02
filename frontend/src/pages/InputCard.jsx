import React from 'react'
import { ArrowRight, LockKeyhole, ScanLine } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Textarea } from '../components/ui/Textarea'
import { Alert } from '../components/ui/Alert'

export default function InputCard({
  text, setText, loading, mode, setMode, providerStatus, providerInfo, testingProvider, testProvider,
  scanText, resetSample, error,
}) {
  return (
    <section className="surface-card input-panel">
      <label className="field-label" htmlFor="prompt-text">Prompt or suspicious content</label>
      <Textarea
        id="prompt-text"
        maxLength={20000}
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder={'Paste text to inspect…'}
      />
      <div className="input-toolbar">
        <span className="quiet-note">{text.length.toLocaleString()} / 20,000 characters</span>
        <button className="text-action" type="button" onClick={resetSample}>Load sample attack</button>
      </div>
      <div className="form-actions">
        <div className="segmented">
          <button className={mode === 'demo' ? 'is-active' : ''} onClick={() => setMode('demo')}>Demo</button>
          <button className={mode === 'connected' ? 'is-active' : ''} onClick={() => setMode('connected')}>Connected</button>
        </div>
        <Button variant="primary" onClick={scanText} disabled={loading || !text.trim()}>
          <ScanLine size={17} />{loading ? 'Scanning…' : 'Scan input'}
        </Button>
      </div>
      {mode === 'connected' && (
        <div>
          <p className="privacy-hint">Provider: Gemini · Model: gemini-flash-latest</p>
          <Button variant="secondary" onClick={testProvider} disabled={testingProvider}>{testingProvider ? 'Testing…' : 'Test connection'}</Button>
          {providerStatus && <Alert variant="info"><p>{providerStatus}</p></Alert>}
          {providerInfo?.ok && <Alert variant="info"><p>Connected to {providerInfo.model}</p></Alert>}
        </div>
      )}
    </section>
  )
}
