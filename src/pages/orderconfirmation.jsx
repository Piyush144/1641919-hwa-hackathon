import React from 'react'
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material'
import { formatINR } from '../utils/format'
import SectionTitle from '../components/SectionTitle'
import { useParams, Link as RouterLink } from 'react-router-dom'

export default function OrderConfirmation() {
  const { orderId } = useParams()

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Freda, serif', color: '#2F5D50', mb: 2 }}>
            Order confirmed 🐾
          </Typography>
          <Typography variant="h6">Thank you for your order.</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Order ID: <strong>{orderId}</strong>
          </Typography>
          <Box sx={{ mt: 3, p: 3, border: '1px solid #E5DDCE', borderRadius: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6">Your order is being prepared</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              We&#39;ll send a confirmation email shortly. Your trail kit is on its way!
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 6, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', '&:hover': { borderColor: '#274d42', color: '#274d42' } }}
          >
            Continue shopping
          </Button>
          <Button
            component={RouterLink}
            to="/how-it-works"
            variant="contained"
            sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
          >
            How to set up the trail
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
