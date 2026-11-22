import React from 'react'
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material'
import SectionTitle from '../components/SectionTitle'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <SectionTitle>Page not found</SectionTitle>
          <Typography variant="h5">404</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}>
            Sorry, we couldn&#39;t find that page. Let&#39;s get you back on the trail.
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
