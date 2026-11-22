import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'

const STATUS_STEPS = ['Placed', 'Packed', 'Shipped', 'Delivered']

export default function Track() {
  const [orderId, setOrderId] = React.useState('')
  const [order, setOrder] = React.useState(null)
  const [notFound, setNotFound] = React.useState(false)

  const orders = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('orders') || '[]')
    } catch {
      return []
    }
  }, [])

  const handleLookup = (e) => {
    e.preventDefault()
    const found = orders.find((o) => o.id === orderId.trim().toUpperCase())
    if (found) {
      setOrder(found)
      setNotFound(false)
    } else {
      setOrder(null)
      setNotFound(true)
    }
  }

  const statusIndex = order ? STATUS_STEPS.indexOf(order.method ? 'Shipped' : 'Placed') : 0
  // Map delivery method to a rough progress
  const progress = order ? (order.method === 'express' ? 3 : order.method === 'standard' ? 2 : 1) : 0

  if (notFound) {
    return (
      <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4">🔍</Typography>
            <Typography variant="h6">Order not found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              We couldn&#39;t find an order with that number.
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
              >
                Go home
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {!order ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <SectionTitle>Track your order</SectionTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 400, mx: 'auto' }}>
              Enter your order id (e.g. TT-10482) to see where your dog&#39;s trail kit is.
            </Typography>
            <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, mx: 'auto', maxWidth: 400, mt: 4 }}>
              <CardContent>
                <form onSubmit={handleLookup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Order id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="TT-10482"
                    required
                    fullWidth
                    size="small"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
                  >
                    Track order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <>
            <SectionTitle>Order #{order.id}</SectionTitle>
            <Stepper activeStep={progress}>
              {STATUS_STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4, p: 3, border: '1px solid #E5DDCE', borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6">Order details</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Status</Typography>
                  <Typography fontWeight="600" color="#2F5D50">
                    {STATUS_STEPS[Math.min(progress, STATUS_STEPS.length - 1)]}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Items</Typography>
                  <Typography>{order.items.length} item(s)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Total paid</Typography>
                  <Typography fontWeight="600">{order.totals.total ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totals.total) : '—'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Placed on</Typography>
                  <Typography>{new Date(order.date).toLocaleDateString()}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="outlined"
                sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', '&:hover': { borderColor: '#274d42', color: '#274d42' } }}
              >
                Continue shopping
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}
