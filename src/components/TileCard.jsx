import { Card, CardContent, Typography, Box, Chip } from '@mui/material'

export default function TileCard({ tile }) {
  return (
    <Card sx={{ height: '100%', border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {tile.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {tile.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={tile.food} size="small" />
          <Chip label={tile.icon} size="small" color="secondary" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
          <b>Tip:</b> {tile.hidingTip}
        </Typography>
      </CardContent>
    </Card>
  )
}
