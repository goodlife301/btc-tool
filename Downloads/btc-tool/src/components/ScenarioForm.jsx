import s from './ScenarioForm.module.css'

export default function ScenarioForm({ category, scenario, onChange, onSubmit, onReset, error }) {
  const ready = scenario.trim().length >= 30

  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.catLabel}>
          <div className={s.catDot} style={{ background: category.color, boxShadow: `0 0 6px ${category.color}` }} />
          <span style={{ color: category.color }}>{category.label}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>— Describe the scenario</span>
        </div>
        <button className={s.backBtn} onClick={onReset}>← Back</button>
      </div>

      <div className={s.reference}>
        <div className={s.refTitle} style={{ color: category.color }}>
          Obligations being evaluated
        </div>
        <ul className={s.refList}>
          {category.obligations.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      <div className={s.textareaWrap}>
        <textarea
          className={s.textarea}
          value={scenario}
          onChange={e => onChange(e.target.value)}
          placeholder={`Describe what your organization is doing or considering in the ${category.label.toLowerCase()} category. Be specific — include what the practice is, who it affects, and how decisions are made.`}
          rows={7}
        />
        <div className={s.charCount}>{scenario.length} chars</div>
      </div>

      {error && <div className={s.error}>{error}</div>}

      <div className={s.actions}>
        <button
          className={s.submit}
          disabled={!ready}
          onClick={onSubmit}
        >
          Run assessment →
        </button>
        <button className={s.resetBtn} onClick={onReset}>
          Start over
        </button>
      </div>

      <div className={s.hint}>
        The assessment applies your framework's four ethical lenses — utilitarian, deontological, care ethics, and virtue ethics — and places the practice on the perceptual zone spectrum.
      </div>
    </div>
  )
}
