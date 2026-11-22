import React from 'react'
import { Box, Container, Typography, Button, Card, CardContent, TextField, Stepper, Step, StepLabel, Link } from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import SectionTitle from '../components/SectionTitle'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, itemCount, subtotal, discount, coupon, shipping, total, clearCart } = useCart()
  const shipStandard = shipping('standard')
  const navigate = useNavigate()

  const [form, setForm] = React.useState({ name: '', email: '', address: '', city: '', pincode: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderId = 'TT-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    clearCart()
    navigate(`/order-confirmation/${orderId}`)
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <SectionTitle>Checkout</SectionTitle>
        <Stepper activeStep={0}>
          <Step>
            <StepLabel>Your details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review &amp; pay</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Delivery details</Typography>
                <form onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                    fullWidth
                    size="small"
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      required
                      size="small"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      label="Pincode"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      required
                      size="small"
                      sx={{ flex: 1 }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', mt: 1, '&:hover': { bgcolor: '#274d42' } }}
                  >
                    Place order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ minWidth: 280 }}>
            <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', position: 'sticky', top: 4 }}>
              <CardContent>
                <Typography variant="h6">Order summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>{formatINR(subtotal)}</Typography>
                </Box>
                {coupon && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: '#2F5D50', fontWeight: 600 }}>
                    <Typography>Discount ({coupon})</Typography>
                    <Typography>- {formatINR(discount)}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 600 }}>
                  <Typography>Shipping</Typography>
                  <Typography>{shipStandard === 0 ? 'Free' : formatINR(shipStandard)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">{formatINR(total('standard'))}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  By placing your order you agree to our terms.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Items in cart: {itemCount}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
