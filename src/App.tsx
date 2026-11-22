import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Trail from './components/Trail'
import Order from './components/Order'

type Page = 'home' | 'trail' | 'order'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="app">
      <Header page={page} setPage={setPage} />
      <main className="page">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'trail' && <Trail />}
        {page === 'order' && <Order />}
      </main>
    </div>
  )
}
