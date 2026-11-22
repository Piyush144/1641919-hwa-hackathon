import { Typography, Box } from '@mui/material'

export default function SectionTitle({ children, subtitle, id }) {
  return (
    <Box sx={{ mb: 4, textAlign: 'center', position: 'relative' }}>
      {id && <span id={id} style={{ position: 'absolute', top: -70, left: 0 }} />}
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
