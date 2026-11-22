import { Box, Typography, Link, Grid, Divider } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgColor: '#2F5D50', color: '#FFFFFF', pt: 4, pb: 3 }}>
      <Box component="footer" sx={{ mx: 'auto', maxWidth: 1200, px: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography gutterBottom variant="h6">Treasure Trail</Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Puzzle feeders and trail kits that keep dogs busy, sniffing, and happy.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
              Shop
            </Typography>
            <Link component="a" href="/" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
              Kits
            </Link>
            <Link component="a" href="/" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
              Expansion packs
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
              Learn
            </Typography>
            <Link component="a" href="/how-it-works" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
              How it works
            </Link>
            <Link component="a" href="/quiz" color="inherit" underline="none" sx={{ display: 'block', mb: 1, color: 'textSecondary' }}>
              Find your level
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography gutterBottom variant="subtitle2" fontWeight="bold">
              Newsletter
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Sign up for trail tips and new releases.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <input type="email" placeholder="you@example.com" sx={{ flexGrow: 1, px: 2, py: 1, borderRadius: 2, border: '1px solid rgba(255,255,255,0.3)', bgcolor: 'transparent', color: 'white' }} />
              <button sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: '#E0A526', color: '#2B2B2B', fontWeight: 600, textTransform: 'none', cursor: 'pointer' }}>
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="textSecondary">
            Treasure Trail. Designed for curious dogs.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
