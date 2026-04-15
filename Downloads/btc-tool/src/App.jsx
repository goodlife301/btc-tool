import { useState } from 'react'
import CategorySelect from './components/CategorySelect.jsx'
import ScenarioForm from './components/ScenarioForm.jsx'
import ResultDashboard from './components/ResultDashboard.jsx'
import Header from './components/Header.jsx'
import s from './App.module.css'

export const CATEGORIES = [
  {
    id: 'financial',
    label: 'Financial',
    icon: '◈',
    desc: 'Wages, benefits, job security, profit allocation',
    color: '#3fb950',
    obligations: [
      'Fair wages through honest, transparent collective negotiation',
      'Health insurance as a prerequisite for the physical conditions enabling fulfillment',
      'Job security — genuine opportunity to complete meaningful work',
      'Ethical profit allocation — excess tested against collective flourishing',
      'Environmental stability — conditions that do not chronically destabilize employees',
    ],
  },
  {
    id: 'developmental',
    label: 'Developmental',
    icon: '◎',
    desc: 'Training, growth paths, skill transfer',
    color: '#58a6ff',
    obligations: [
      'Active skill development beyond current job scope — forward-looking, not just task-training',
      'Forward-looking preparation for future obstacles the organization will face',
      'Development regardless of whether it leads to retention',
    ],
  },
  {
    id: 'psychological',
    label: 'Psychological',
    icon: '◉',
    desc: 'Autonomy, dignity, safety from harm',
    color: '#bc8cff',
    obligations: [
      'Protection from psychological harm — intent is irrelevant; the obligation is to prevent',
      'Autonomy over method within organizational scope — trust in the expertise hired',
      'Equal inherent dignity across all levels — titles do not confer additional human worth',
    ],
  },
  {
    id: 'communal',
    label: 'Communal',
    icon: '◍',
    desc: 'Belonging, voice, shared purpose',
    color: '#ffa657',
    obligations: [
      'Inherent belonging — not earned through performance; present from organizational commitment',
      'Genuine employee voice as an informational imperative — not performative',
      'Clearly defined and genuinely meaningful shared purpose anchored in human needs',
    ],
  },
]

const ZONES = [
  { name: 'Unobscured', color: '#3fb950', desc: 'Widely recognized and acted on' },
  { name: 'Contested', color: '#e3b341', desc: 'Barriers obscure consistent fulfillment' },
  { name: 'Obscured', color: '#f85149', desc: 'Appears as generosity, not obligation' },
]

const LENSES = [
  { icon: '⚖', name: 'Utilitarian', q: 'Greatest good for greatest number?' },
  { icon: '⬡', name: 'Deontological', q: 'A duty owed regardless of outcome?' },
  { icon: '◎', name: 'Care Ethics', q: 'Honors relationships & vulnerability?' },
  { icon: '◈', name: 'Virtue Ethics', q: 'Reflects genuine organizational integrity?' },
]

export const SYSTEM_PROMPT = `You are the ethical assessment engine for "Beyond the Contract: An Ethical Framework for HR" — a philosophical framework that evaluates employer obligations to employees beyond legal and contractual minimums.

CORE CLAIM: The company and its employees are not separate entities. The company is its people. Therefore, the fulfillment of employees is not a means to organizational success — it is organizational success.

FOUR OBLIGATION CATEGORIES:
1. Financial: Fair wages through honest negotiation; health insurance as prerequisite for fulfillment; job security; ethical profit allocation; environmental stability
2. Developmental: Active skill development beyond current scope; forward-looking preparation; development regardless of retention
3. Psychological: Protection from psychological harm (intent irrelevant); autonomy over method within scope; equal inherent dignity
4. Communal: Inherent belonging (not conditional on performance); genuine employee voice; clearly defined meaningful purpose

THREE PERCEPTUAL ZONES:
- Unobscured: Obligation is widely recognized and acted on
- Contested: Obligation exists but barriers obscure consistent fulfillment
- Obscured: Most organizations don't recognize it as an obligation — it appears as generosity

FOUR ETHICAL LENSES: Utilitarian (outcomes), Deontological (duty), Care Ethics (relationships), Virtue Ethics (character)

Respond with ONLY valid JSON:

{
  "zone": "Unobscured" | "Contested" | "Obscured",
  "zone_reasoning": "2-3 sentences explaining why",
  "summary": "One sentence capturing the core ethical issue",
  "lenses": {
    "utilitarian": { "verdict": "Supports obligation" | "Partially supports" | "Challenges practice", "analysis": "2-3 sentences" },
    "deontological": { "verdict": "Supports obligation" | "Partially supports" | "Challenges practice", "analysis": "2-3 sentences" },
    "care": { "verdict": "Supports obligation" | "Partially supports" | "Challenges practice", "analysis": "2-3 sentences" },
    "virtue": { "verdict": "Supports obligation" | "Partially supports" | "Challenges practice", "analysis": "2-3 sentences" }
  },
  "recommendation": "2-3 sentences on what the framework says the organization owes",
  "case_parallel": "1-2 sentences connecting to Amazon, McDonald's, Apple, or the Military case studies",
  "flag": null | "Brief warning if this practice is obscuring a mandatory obligation"
}`

export default function App() {
  const [step, setStep] = useState('home')
  const [category, setCategory] = useState(null)
  const [scenario, setScenario] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const selectedCat = CATEGORIES.find(c => c.id === category)

  async function runAssessment() {
    setStep('loading')
    setError(null)
    try {
      const userMsg = `OBLIGATION CATEGORY: ${selectedCat.label}\n\nSCENARIO:\n${scenario}\n\nRelevant obligations:\n${selectedCat.obligations.map(o => '- ' + o).join('\n')}`
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMsg }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setResult({ ...data, category: selectedCat })
      setStep('result')
    } catch (e) {
      setError('Assessment failed — please try again.')
      setStep('describe')
    }
  }

  function startAssessment(catId) {
    setCategory(catId)
    setStep('describe')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function reset() {
    setStep('home')
    setCategory(null)
    setScenario('')
    setResult(null)
    setError(null)
  }

  function backToDescribe() {
    setStep('describe')
    setResult(null)
    setError(null)
  }

  return (
    <div className={s.layout}>
      <Header />

      {(step === 'home' || step === 'describe') && (
        <div className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.eyebrow}>
              <div className={s.eyebrowDot} />
              Business Management Capstone — HR Ethics Framework
            </div>
            <h1 className={s.heroTitle}>
              What do employers<br />
              <span>genuinely owe</span> their people?
            </h1>
            <p className={s.heroSub}>
              This tool applies a four-category ethical framework across four philosophical lenses to assess where your organization's practices fall on the obligation spectrum — from universally recognized duties to obligations obscured by institutional illusion.
            </p>

            <div className={s.coreClaim}>
              <div className={s.coreClaimLabel}>Core Claim</div>
              <div className={s.coreClaimText}>
                "The company and its employees are not separate entities. The company is its people — nothing more, nothing less. Therefore, the fulfillment of employees is not a means to organizational success; it is organizational success."
              </div>
            </div>

            <div className={s.zoneGrid}>
              {ZONES.map(z => (
                <div key={z.name} className={s.zoneCard}>
                  <div className={s.zoneDot} style={{ background: z.color, boxShadow: `0 0 6px ${z.color}` }} />
                  <div className={s.zoneName} style={{ color: z.color }}>{z.name}</div>
                  <div className={s.zoneDesc}>{z.desc}</div>
                </div>
              ))}
            </div>

            <div className={s.lensRow}>
              {LENSES.map(l => (
                <div key={l.name} className={s.lensChip}>
                  <div className={s.lensIcon}>{l.icon}</div>
                  <div className={s.lensName}>{l.name}</div>
                  <div className={s.lensQ}>{l.q}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={s.main}>
        {(step === 'home' || step === 'describe') && (
          <CategorySelect
            categories={CATEGORIES}
            selected={category}
            onSelect={startAssessment}
          />
        )}

        {step === 'describe' && category && (
          <ScenarioForm
            category={selectedCat}
            scenario={scenario}
            onChange={setScenario}
            onSubmit={runAssessment}
            onReset={reset}
            error={error}
          />
        )}

        {step === 'loading' && (
          <div className={s.loading}>
            <div className={s.loadingSpinner} />
            <div className={s.loadingText}>Running ethical assessment...</div>
            <div className={s.loadingSub}>Applying four lenses to your scenario</div>
          </div>
        )}

        {step === 'result' && result && (
          <ResultDashboard
            result={result}
            onNewSame={backToDescribe}
            onReset={reset}
          />
        )}
      </main>

      <footer className={s.footer}>
        Beyond the Contract — An Ethical Framework for HR &nbsp;·&nbsp; Business Management Capstone
      </footer>
    </div>
  )
}
