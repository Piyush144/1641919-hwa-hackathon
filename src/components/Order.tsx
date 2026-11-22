import { useState } from 'react'

type Supply = { id: string; name: string; price: number }

const SUPPLIES: Supply[] = [
  { id: 'canteen', name: 'Trail Canteen', price: 12 },
  { id: 'compass', name: 'Brass Compass', price: 18 },
  { id: 'map', name: 'Trail Map Set', price: 8 },
  { id: 'boot-laces', name: 'Waxed Boot Laces', price: 6 },
  { id: 'rations', name: 'Energy Rations', price: 10 },
]

export default function Order() {
  const [supplies, setSupplies] = useState<Record<string, number>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'bad' | null>(null)

  const total = Object.entries(supplies).reduce(
    (sum, [id, qty]) => sum + qty * (SUPPLIES.find((s) => s.id === id)?.price || 0),
    0,
  )

  const handleChange = (id: string, value: string) => {
    const qty = Math.max(0, parseInt(value, 10) || 0)
    setSupplies((p) => {
      const next = { ...p }
      if (qty === 0) {
        delete next[id]
      } else {
        next[id] = qty
      }
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    const order = { name, email, supplies, total, createdAt: new Date().toISOString() }

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (res.ok) {
        setStatus('ok')
        setName('')
        setEmail('')
        setSupplies({})
      } else {
        setStatus('bad')
      }
    } catch {
      setStatus('bad')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="order">
      <div className="order-card">
        <h2>Order Trail Supplies</h2>
        <p className="lead">Gear up before you head out. We will confirm your order by email.</p>

        <div className="supply-list">
          {SUPPLIES.map((item) => {
            const qty = supplies[item.id] || 0
            return (
              <div key={item.id} className="supply-item">
                <div>
                  <strong>{item.name}</strong>
                  <span className="supply-price">${item.price} each</span>
                </div>
                <div className="supply-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleChange(item.id, String(Math.max(0, qty - 1)))}
                    disabled={qty === 0}
                  >
                    −
                  </button>
                  <input
                    className="qty-input"
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                  />
                  <button
                    className="qty-btn"
                    onClick={() => handleChange(item.id, String(qty + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="order-total">Total: ${total.toFixed(2)}</div>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Your name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Trail"
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
            />
          </div>
          <button className="button button-primary" type="submit" disabled={submitting || total === 0}>
            {submitting ? 'Placing order…' : 'Place order'}
          </button>
        </form>

        {status === 'ok' && (
          <div className="flash flash-ok">Order placed! Confirmation sent to {email || 'your email'}.</div>
        )}
        {status === 'bad' && (
          <div className="flash flash-bad">Could not place order. Please try again.</div>
        )}
      </div>
    </section>
  )
}
