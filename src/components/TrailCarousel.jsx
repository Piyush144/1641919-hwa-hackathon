import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {
  Box,
  Typography,
  IconButton,
  Button,
} from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const TRAIL_ITEMS = [
  { id: 'sniff-maze', name: 'Sniff Maze' },
  { id: 'flap-pocket', name: 'Flap Pocket' },
  { id: 'dig-pit', name: 'Dig Pit' },
  { id: 'roll-channel', name: 'Roll Channel' },
  { id: 'fringe-forest', name: 'Fringe Forest' },
  { id: 'lift-lid-cup', name: 'Lift-Lip Cup' },
]

function TrailSlide({ item }) {
  return (
    <div key={item.id}>
      <img
        src={`/${item.id}.svg`}
        alt={item.name}
        style={{
          width: '100%',
          height: '280px',
          objectFit: 'contain',
          borderRadius: 2,
          margin: '0 auto',
          display: 'block',
          padding: 16,
        }}
      />
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2B2B2B' }}>
          {item.name}
        </Typography>
      </Box>
    </div>
  )
}

export default function TrailCarousel() {
  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Carousel
        height="280px"
        width="100%"
        navButtonsDisplay="onHover"
        indicatorsPosition="none"
        slideInterval={2000}
        disableKeyboardHandling
      >
        {TRAIL_ITEMS.map((item) => (
          <TrailSlide key={item.id} item={item} />
        ))}
      </Carousel>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
        <IconButton size="small" sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}>
          <ArrowLeftIcon fontSize="small" />
        </IconButton>
        <Button size="small" variant="text" sx={{ borderRadius: '999px', px: 1, fontWeight: 600, color: '#2F5D50', '&:hover': { bgcolor: 'rgba(47,93,80,0.1)' } }}>
          Browse trail
        </Button>
        <IconButton size="small" sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}>
          <ArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
