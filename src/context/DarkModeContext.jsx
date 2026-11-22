import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext(null)

export function DarkModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem('treasure-trail-theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('treasure-trail-theme', mode)
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  const toggle = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <DarkModeContext.Provider value={{ mode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider')
  return ctx
}
