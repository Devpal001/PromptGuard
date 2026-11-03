import React from 'react'
import { ScanLine } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Textarea } from '../components/ui/Textarea'

export default function InputCard({
  text, setText, loading,
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
        <Button variant="primary" onClick={scanText} disabled={loading || !text.trim()}>
          <ScanLine size={17} />{loading ? 'Scanning…' : 'Scan input'}
        </Button>
      </div>
    </section>
  )
}
