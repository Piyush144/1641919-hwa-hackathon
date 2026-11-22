import { Typography, Box } from '@mui/material'

export default function SectionTitle({ children, subtitle }) {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'Freda, serif', letterSpacing: '-0.5px', color: '#2B2B2B' }}>
        {children}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
