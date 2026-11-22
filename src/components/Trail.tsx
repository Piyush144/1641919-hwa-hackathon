import { useState, useEffect, useCallback } from 'react'
import { STATIONS, type Station } from '../data/trail'

const STORAGE_KEY = 'treasure-trail-progress'

type Progress = {
  completed: Record<string, boolean>
  treasures: string[]
}

const EMPTY_PROGRESS: Progress = { completed: {}, treasures: [] }

export default function Trail() {
  const [stations] = useState<Station[]>(STATIONS)
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ id: string; text: string; kind: 'ok' | 'bad' } | null>(null)
  const [showHint, setShowHint] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch {
        // ignore corrupt storage
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const completedCount = Object.values(progress.completed).filter(Boolean).length

  const handleSubmit = useCallback(
    (e: React.FormEvent, station: Station) => {
      e.preventDefault()
      const guess = (answers[station.id] || '').trim().toLowerCase()
      if (guess === station.answer.toLowerCase()) {
        setProgress((p) => {
          const already = !!p.completed[station.id]
          const next = { ...p, completed: { ...p.completed, [station.id]: true } }
          if (!already) {
            next.treasures = [...p.treasures, station.treasure]
          }
          return next
        })
        setMessage({ id: station.id, text: 'Correct! You found: ' + station.treasure, kind: 'ok' })
        setTimeout(() => setMessage(null), 2500)
      } else {
        setMessage({ id: station.id, text: "Not quite. Try the hint.", kind: 'bad' })
        setTimeout(() => setMessage(null), 2500)
      }
    },
    [answers],
  )

  const allDone = completedCount === stations.length

  return (
    <section className="trail">
      <div className="trail-header">
        <h2>The Trail</h2>
        <div className="progress">
          <span className="progress-text">{completedCount} of {stations.length} solved</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / stations.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {message && (
        <div className={`flash flash-${message.kind}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="stations">
        {stations.map((station) => {
          const done = !!progress.completed[station.id]
          return (
            <article key={station.id} className={`station ${done ? 'done' : ''}`}>
              <div className="station-head">
                <span className={`station-badge ${done ? 'done' : ''}`}>{done ? '✓' : '?'}</span>
                <h3>{station.name}</h3>
              </div>
              <p className="clue">{station.clue}</p>

              {done ? (
                <div className="station-complete">
                  <span className="treasure">🎁 {station.treasure}</span>
                </div>
              ) : (
                <form className="answer-form" onSubmit={(e) => handleSubmit(e, station)}>
                  <div className="input-row">
                    <input
                      className="answer-input"
                      type="text"
                      placeholder="Your answer"
                      value={answers[station.id] || ''}
                      onChange={(e) => setAnswers({ ...answers, [station.id]: e.target.value })}
                      autoComplete="off"
                    />
                    <button className="button button-primary" type="submit">
                      Check
                    </button>
                  </div>
                  <button
                    className="hint-toggle"
                    type="button"
                    onClick={() => setShowHint({ ...showHint, [station.id]: !showHint[station.id] })}
                  >
                    {showHint[station.id] ? 'Hide hint' : 'Show hint'}
                  </button>
                  <p className="hint" hidden={!showHint[station.id]}>
                    {station.hint}
                  </p>
                </form>
              )}
            </article>
          )
        })}
      </div>

      {allDone && (
        <div className="finish">
          <h2>Trail complete!</h2>
          <p>You have uncovered every treasure. Well done, trailblazer.</p>
          <div className="treasures">
            <h3>Your treasures:</h3>
            <ul>
              {progress.treasures.map((t, i) => (
                <li key={i}>🎁 {t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
