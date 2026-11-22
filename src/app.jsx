import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route, useLocation } from 'react-router-dom'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import Quiz from './pages/quiz'
import HowItWorks from './pages/howitworks'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import OrderConfirmation from './pages/orderconfirmation'
import NotFound from './pages/notfound'

const PAGE_TITLES = {
  '/': 'Treasure Trail — Starter Kits',
  '/quiz': "Find your dog's level — Treasure Trail",
  '/how-it-works': 'How it works — Treasure Trail',
  '/cart': 'Your cart — Treasure Trail',
  '/checkout': 'Checkout — Treasure Trail',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => {
    window.scrollTo(0, 0)
    document.title = PAGE_TITLES[pathname] || 'Treasure Trail'
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnnouncementBar />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Box>
  )
}
