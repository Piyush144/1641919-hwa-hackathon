import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material'
import SectionTitle from '../components/SectionTitle'
import { formatINR } from '../utils/format'
import { Link as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const orders = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('orders') || '[]')
    } catch {
      return []
    }
  }, [])
  const order = orders.find((o) => o.id === orderId)

  const days = order?.method === 'express' ? 3 : 5
  const estDate = new Date()
  estDate.setDate(estDate.getDate() + days)

  if (!order) {
    return (
      <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4">😕</Typography>
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
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ bgcolor: '#e9f4ea', color: '#2e7d32', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, fontSize: 32 }}>
            ✓
          </Box>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Order placed! Your dog's adventure is on its way.
          </Typography>
          <Typography variant="h6">Order #{order.id}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Placed on {new Date(order.date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px solid #E5DDCE', borderRadius: 3, bgcolor: 'background.paper' }}>
          <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
            Your items
          </Typography>
          <List dense>
            {order.items.map((item) => (
              <ListItem key={item.key} sx={{ px: 0 }}>
                <ListItemText primary={`${item.qty} × ${item.kitId}`} secondary={`Size: ${item.sizeId}`} />
                <Checkbox sx={{ ml: 1, p: 0 }} checked color="primary" />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ minWidth: 140 }}>
              <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                Delivery address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.address.name}<br />
                {order.address.address1}{order.address.address2 ? ', ' + order.address.address2 : ''}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 140 }}>
              <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                Delivery &amp; payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.method.charAt(0).toUpperCase() + order.method.slice(1)} delivery<br />
                Estimated: {estDate.toLocaleDateString()}<br />
                {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 140 }}>
              <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                Total paid
              </Typography>
              <Typography variant="h6" color="#2F5D50" fontWeight="700">
                {formatINR(order.totals.total)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px solid #E5DDCE', borderRadius: 3, bgcolor: '#f3f7f5' }}>
          <Typography variant="body2" color="text.secondary">
            We&#39;ll email you a tracking link. In the meantime, try our{' '}
            <RouterLink to="/quiz" sx={{ color: '#2F5D50', fontWeight: 600, textDecoration: 'none' }}>
              Find my dog&#39;s level quiz
            </RouterLink>
            .
          </Typography>
        </Box>
        <Box sx={{ mt: 6, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/quiz"
            variant="outlined"
            sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', '&:hover': { borderColor: '#274d42', color: '#274d42' } }}
          >
            Build today&#39;s hunt
          </Button>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
          >
            Continue shopping
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
