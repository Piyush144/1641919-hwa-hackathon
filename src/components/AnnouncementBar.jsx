import { Box, Typography } from '@mui/material'

export default function AnnouncementBar() {
  return (
    <Box sx={{ bgcolor: '#2F5D50', color: '#FFFFFF', px: 2, py: 1, textAlign: 'center' }}>
      <Typography variant="body2" fontWeight="600">
        Free standard shipping on orders ₹1,999 and up &bull; Treat your dog to a new trail
      </Typography>
    </Box>
  )
}
