import React from 'react'
import { Box, Typography, Link, Grid, Divider } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#2F5D50', color: '#FFFFFF', pt: 4, pb: 3 }}>
      <Box component="footer" sx={{ mx: 'auto', maxWidth: 1200, px: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom variant="h6" sx={{ fontFamily: 'Freda, serif' }}>
              TreasureTrail
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Snap-together silicone tiles and level cards that turn mealtime into an hour of sniffing,
              digging, and problem-solving for your dog.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
              Help
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component="a" href="/how-it-works" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
                FAQ
              </Link>
              <Link component="a" href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
                Shipping
              </Link>
              <Link component="a" href="#" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
                Returns
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3}>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
              Contact
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              hello@treasuretrail.example
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Made for dogs who love to hunt.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <a href="#" color="inherit" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Instagram
              </a>
              <a href="#" color="inherit" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Facebook
              </a>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', pt: 3 }}>
          <Typography variant="caption" color="textSecondary">
            &copy; 2026 treasureTrail (demo store)
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
