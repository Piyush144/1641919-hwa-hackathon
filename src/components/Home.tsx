import { useState } from 'react'

export default function Home({ setPage }: { setPage: (page: 'home' | 'trail' | 'order') => void }) {
  const [started, setStarted] = useState(false)

  return (
    <section className="home">
      <div className="home-card">
        {!started ? (
          <>
            <div className="badge">A self-guided scavenger hunt</div>
            <h1>Treasure Trail</h1>
            <p className="lead">
              Follow the clues, solve the riddles, and collect the treasures hidden
              along the path. Each station guards a secret&#8212;speak the right word
              and claim your prize.
            </p>
            <div className="cta-group">
              <button className="button button-primary" onClick={() => setStarted(true)}>
                Begin the hunt
              </button>
              <button className="button button-outline" onClick={() => setPage('order')}>
                Order trail supplies
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="badge">Your adventure awaits</div>
            <h1>Ready to begin?</h1>
            <p className="lead">
              Five stations lie ahead. Solve every clue to complete the trail and
              uncover the final cache.
            </p>
            <div className="cta-group">
              <button className="button button-primary" onClick={() => setPage('trail')}>
                Enter the trail
              </button>
              <button className="button button-outline" onClick={() => setStarted(false)}>
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
