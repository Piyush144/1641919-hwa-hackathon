import { Box, Container, Grid, Typography, Button } from '@mui/material'
import { KITS, SIZES } from '../data/products'
import ProductCard from '../components/productCard'
import SectionTitle from '../components/SectionTitle'

export default function Home() {
  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh' }}>
      <SectionTitle>Choose your kit</SectionTitle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {KITS.map((kit) => (
            <Grid item xs={12} sm={6} md={4} key={kit.id}>
              <ProductCard product={{ ...kit, sizeLabel: 'All sizes' }} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="outlined" sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', '&:hover': { borderColor: '#274d42', color: '#274d42' } }}>
            View all sizes
          </Button>
        </Box>
      </Container>
      <SectionTitle>Trail tiles</SectionTitle>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: 600, mx: 'auto' }}>
          Mix and match tiles to build a custom trail for your dog&#39;s nose and brain.
        </Typography>
      </Container>
    </Box>
  )
}
