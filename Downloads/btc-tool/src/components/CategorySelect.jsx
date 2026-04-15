import s from './CategorySelect.module.css'

export default function CategorySelect({ categories, selected, onSelect }) {
  return (
    <div className={s.wrap}>
      <div className={s.sectionLabel}>Select an obligation category to begin</div>
      <div className={s.grid}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${s.card} ${selected === cat.id ? s.active : ''}`}
            style={{ '--cardColor': cat.color }}
            onClick={() => onSelect(cat.id)}
          >
            <div className={s.cardTop}>
              <div className={s.cardLabel} style={{ color: selected === cat.id ? cat.color : 'var(--text-primary)' }}>
                {cat.label}
              </div>
              <div className={s.cardIcon} style={{ color: cat.color }}>{cat.icon}</div>
            </div>
            <div className={s.cardDesc}>{cat.desc}</div>
            <div className={s.cardArrow}>
              Run assessment →
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
