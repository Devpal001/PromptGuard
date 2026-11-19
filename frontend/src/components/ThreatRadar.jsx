import React, { useState } from 'react'
import { FileSearch, ScanLine, ShieldCheck } from 'lucide-react'

const surfaces = [
  {
    id: 'text',
    label: 'TEXT',
    title: 'Untrusted input',
    detail: 'Local pattern checks look for instruction overrides and disclosure requests.',
    icon: ScanLine,
  },
  {
    id: 'file',
    label: 'FILES',
    title: 'Document content',
    detail: 'PDF and TXT uploads are extracted for this scan and then discarded.',
    icon: FileSearch,
  },
  {
    id: 'target',
    label: 'DEMO TARGET',
    title: 'Response behavior',
    detail: 'The local simulator shows whether expected safe behavior was followed.',
    icon: ShieldCheck,
  },
]

export default function ThreatRadar() {
  const [activeSurface, setActiveSurface] = useState(surfaces[0])
  const ActiveIcon = activeSurface.icon

  return (
    <aside className="threat-radar" aria-label="Interactive PromptGuard attack surface monitor">
      <div className="threat-radar-header">
        <span>ATTACK SURFACE / 03</span>
        <span className="radar-mode"><i /> LOCAL DEMO</span>
      </div>

      <div className="radar-instrument">
        <div className="radar-rings" aria-hidden="true">
          <span className="radar-sweep" />
          <span className="radar-axis radar-axis-x" />
          <span className="radar-axis radar-axis-y" />
          <span className="radar-blip radar-blip-one" />
          <span className="radar-blip radar-blip-two" />
        </div>
        <div className="radar-core" aria-hidden="true"><ActiveIcon size={20} strokeWidth={1.7} /></div>
        {surfaces.map(({ id, label }) => (
          <button
            key={id}
            className={`radar-node radar-node-${id}${activeSurface.id === id ? ' is-active' : ''}`}
            type="button"
            aria-pressed={activeSurface.id === id}
            onClick={() => setActiveSurface(surfaces.find(surface => surface.id === id))}
          >
            <span className="radar-node-dot" />{label}
          </button>
        ))}
      </div>

      <div className="radar-readout" aria-live="polite">
        <span className="radar-readout-index">SURFACE / 0{surfaces.findIndex(surface => surface.id === activeSurface.id) + 1}</span>
        <div><strong>{activeSurface.title}</strong><p>{activeSurface.detail}</p></div>
      </div>
    </aside>
  )
}
