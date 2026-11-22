import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #E5DDCE', bgcolor: 'background.paper' }}>
      <CardMedia component="img" sx={{ height: 220, objectFit: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description || product.contents.join(', ')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label={product.sizeLabel || ''} size="small" />
        </Box>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{product.price}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="contained" sx={{ textTransform: 'none', borderRadius: '999px', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}>
          Add to cart
        </Button>
      </Box>
    </Card>
  )
}
