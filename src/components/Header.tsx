import { useState } from 'react'

type Page = 'home' | 'trail' | 'order'

interface HeaderProps {
  page: Page
  setPage: (page: Page) => void
}

const NAV: { key: Page; label: string }[] = [
  { key: 'home', label: 'Start' },
  { key: 'trail', label: 'The Trail' },
  { key: 'order', label: 'Order Supplies' },
]

export default function Header({ page, setPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" onClick={() => setPage('home')}>
          <span className="brand-mark">🗺️</span>
          <span className="brand-name">Treasure Trail</span>
        </div>
        <nav className={menuOpen ? 'nav-open' : 'nav'}>
          <button
            className="nav-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            hidden={!menuOpen}
          >
            ✕
          </button>
          {NAV.map((item) => (
            <button
              key={item.key}
              className={`nav-link ${page === item.key ? 'active' : ''}`}
              onClick={() => {
                setPage(item.key)
                setMenuOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </header>
  )
}
