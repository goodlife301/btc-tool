import { useState } from 'react'
import s from './ResultDashboard.module.css'

const ZONES = {
  Unobscured: { bg: 'rgba(63,185,80,0.1)', border: 'rgba(63,185,80,0.3)', text: '#3fb950', desc: 'Widely recognized and acted on' },
  Contested:  { bg: 'rgba(227,179,65,0.1)', border: 'rgba(227,179,65,0.3)', text: '#e3b341', desc: 'Barriers obscure consistent fulfillment' },
  Obscured:   { bg: 'rgba(248,81,73,0.1)', border: 'rgba(248,81,73,0.3)', text: '#f85149', desc: 'Appears as generosity, not obligation' },
}

const VERDICTS = {
  'Supports obligation': { bg: 'rgba(63,185,80,0.15)', text: '#3fb950' },
  'Partially supports':  { bg: 'rgba(227,179,65,0.15)', text: '#e3b341' },
  'Challenges practice': { bg: 'rgba(248,81,73,0.15)', text: '#f85149' },
}

const LENSES = [
  { id: 'utilitarian',   label: 'Utilitarian',   q: 'Greatest good for the greatest number?' },
  { id: 'deontological', label: 'Deontological',  q: 'A duty owed regardless of outcome?' },
  { id: 'care',          label: 'Care Ethics',    q: 'Does it honor relationships and vulnerability?' },
  { id: 'virtue',        label: 'Virtue Ethics',  q: 'Does it reflect genuine organizational integrity?' },
]

export default function ResultDashboard({ result, onNewSame, onReset }) {
  const [expanded, setExpanded] = useState({})
  const zone = ZONES[result.zone] || ZONES.Contested
  const cat = result.category

  return (
    <div className={s.wrap}>

      <div className={s.zoneCard} style={{ background: zone.bg, borderColor: zone.border }}>
        <div className={s.zoneTop}>
          <div className={s.zoneLeft}>
            <div className={s.zoneEyebrow} style={{ color: zone.text }}>Perceptual Zone</div>
            <div className={s.zoneName} style={{ color: zone.text }}>{result.zone}</div>
            <div className={s.zoneDesc} style={{ color: zone.text }}>{zone.desc}</div>
          </div>
          <div className={s.catBadge} style={{ background: cat.color }}>{cat.label}</div>
        </div>
        <div className={s.summary} style={{ color: zone.text }}>{result.summary}</div>
        <div className={s.zoneReasoning} style={{ color: zone.text }}>{result.zone_reasoning}</div>
      </div>

      {result.flag && (
        <div className={s.flag}>⚠ {result.flag}</div>
      )}

      <div className={s.sectionLabel}>Ethical lens analysis — click to expand</div>

      <div className={s.lensGrid}>
        {LENSES.map(lens => {
          const data = result.lenses?.[lens.id] || {}
          const vs = VERDICTS[data.verdict] || VERDICTS['Partially supports']
          const isOpen = expanded[lens.id]
          return (
            <button
              key={lens.id}
              className={s.lensCard}
              onClick={() => setExpanded(p => ({ ...p, [lens.id]: !p[lens.id] }))}
            >
              <div className={s.lensTop}>
                <div className={s.lensName}>{lens.label}</div>
                <span className={s.verdict} style={{ background: vs.bg, color: vs.text }}>{data.verdict || '—'}</span>
              </div>
              <div className={s.lensQ}>{lens.q}</div>
              {isOpen && <div className={s.lensAnalysis}>{data.analysis}</div>}
              <div className={s.lensToggle}>{isOpen ? '▲ collapse' : '▼ expand'}</div>
            </button>
          )
        })}
      </div>

      <div className={s.rec}>
        <div className={s.recLabel}>Framework recommendation</div>
        <div className={s.recText}>{result.recommendation}</div>
      </div>

      {result.case_parallel && (
        <div className={s.caseParallel}>
          <div className={s.caseLabel}>Case study parallel</div>
          <div className={s.caseText}>{result.case_parallel}</div>
        </div>
      )}

      <div className={s.legend}>
        <div className={s.legendTitle}>Zone reference</div>
        {Object.entries(ZONES).map(([name, z]) => (
          <div key={name} className={s.legendRow}>
            <div className={s.legendDot} style={{ background: z.text, boxShadow: `0 0 4px ${z.text}` }} />
            <span className={s.legendName} style={{ color: z.text }}>{name}</span>
            <span className={s.legendDesc}> — {z.desc}</span>
          </div>
        ))}
      </div>

      <div className={s.actions}>
        <button className={s.btnSecondary} onClick={onNewSame}>New scenario, same category</button>
        <button className={s.btnGhost} onClick={onReset}>Start over</button>
      </div>
    </div>
  )
}
