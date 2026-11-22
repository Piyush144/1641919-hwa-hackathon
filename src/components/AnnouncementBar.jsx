import { Box, Typography } from '@mui/material'

export default function AnnouncementBar() {
  return (
    <Box
      sx={{
        bgcolor: '#2F5D50',
        color: '#FFFFFF',
        px: 2,
        py: 1,
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: 600,
      }}
    >
      <Typography variant="body2" component="span">
        Free delivery above ₹1,999. &bull; 30-day happy-dog guarantee
      </Typography>
    </Box>
  )
}
