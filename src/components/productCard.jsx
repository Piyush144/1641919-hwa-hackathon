import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function ProductCard({ product, selected, onSelect }) {
  return (
    <Card
      sx={{
        height: '100%',
        border: `1px solid ${selected ? '#2F5D50' : '#E5DDCE'}`,
        bgcolor: selected ? '#f3f7f5' : 'background.paper',
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(30, 24, 18, 0.12)',
          borderColor: '#2F5D50',
        },
        '&:focus-visible': {
          outline: '2px solid #2F5D50',
          outlineOffset: 2,
        },
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(product)
        }
      }}
      onClick={() => onSelect(product)}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.contents.join(', ')}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{product.price}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: 'none',
            borderRadius: '999px',
            bgcolor: '#2F5D50',
            color: 'white',
            '&:hover': { bgcolor: '#274d42' },
          }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(product)
          }}
        >
          Choose size
        </Button>
      </Box>
    </Card>
  )
}
