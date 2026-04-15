import s from './Header.module.css'

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.dot} />
          <span className={s.title}>Beyond the Contract</span>
          <span className={s.sub}>/ HR Obligation Assessment</span>
        </div>
        <div className={s.badge}>Framework v1.0</div>
      </div>
    </header>
  )
}
