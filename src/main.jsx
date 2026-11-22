import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { createAppTheme } from './theme'
import { CartProvider } from './context/CartContext'
import { DarkModeProvider } from './context/DarkModeContext'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </DarkModeProvider>
  </React.StrictMode>,
)
