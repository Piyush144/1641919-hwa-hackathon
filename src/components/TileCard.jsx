import { Card, CardContent, Typography, Box, Chip } from '@mui/material'

const TILE_IMAGES = {
  'flap-pocket': '/flap-pocket.svg',
  'sniff-maze': '/sniff-maze.svg',
  'dig-pit': '/dig-pit.svg',
  'roll-channel': '/roll-channel.svg',
  'lift-lip-cup': '/lift-lid-cup.svg',
  'fringe-forest': '/fringe-forest.svg',
}

export default function TileCard({ tile }) {
  return (
    <Card sx={{ height: '100%', border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <img
          src={TILE_IMAGES[tile.id] || ''}
          alt={tile.name}
          sx={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          {tile.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, flexGrow: 1, textAlign: 'center' }}>
          {tile.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip label={tile.food} size="small" />
          <Chip label={tile.icon} size="small" color="secondary" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', textAlign: 'center' }}>
          <b>Tip:</b> {tile.hidingTip}
        </Typography>
      </CardContent>
    </Card>
  )
}
