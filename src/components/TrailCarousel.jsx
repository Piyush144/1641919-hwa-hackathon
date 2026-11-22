import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const TRAIL_ITEMS = [
  { id: 'sniff-maze', name: 'Sniff Maze' },
  { id: 'flap-pocket', name: 'Flap Pocket' },
  { id: 'dig-pit', name: 'Dig Pit' },
  { id: 'roll-channel', name: 'Roll Channel' },
  { id: 'fringe-forest', name: 'Fringe Forest' },
  { id: 'lift-lip-cup', name: 'Lift-Lip Cup' },
]

export default function TrailCarousel() {
  const [index, setIndex] = React.useState(0)
  const perView = 3
  const maxIndex = Math.max(0, TRAIL_ITEMS.length - perView)
  const pageCount = maxIndex + 1

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))
  const goTo = (i) => setIndex(i)

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto' }}>
      <Box
        sx={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 2,
          minWidth: 'max-content',
        }}
      >
        {TRAIL_ITEMS.map((item, i) => (
          <Box
            key={item.id}
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              opacity: i >= index && i < index + perView ? 1 : 0.45,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={`/${item.id}.svg`} alt={item.name} sx={{ width: 64, height: 64, objectFit: 'contain' }} />
            {i < TRAIL_ITEMS.length - 1 && (
              <Box sx={{ width: 10, height: 1, bgColor: '#2F5D50' }} />
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
        <IconButton
          size="small"
          onClick={prev}
          disabled={index === 0}
          sx={{ color: index === 0 ? 'text.secondary' : '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}
        >
          <ArrowLeftIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[...Array(pageCount)].map((_, dotIndex) => {
            const active = index === dotIndex
            return (
              <Button
                key={dotIndex}
                size="small"
                variant="text"
                onClick={() => goTo(dotIndex)}
                sx={{
                  p: 0.5,
                  minWidth: 28,
                  height: 28,
                  borderRadius: '999px',
                  bgcolor: active ? '#2F5D50' : 'rgba(47,93,80,0.15)',
                  color: active ? 'white' : '#2F5D50',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { bgcolor: active ? '#274d42' : 'rgba(47,93,80,0.25)' },
                }}
              >
                {dotIndex + 1}
              </Button>
            )
          })}
        </Box>
        <IconButton
          size="small"
          onClick={next}
          disabled={index === maxIndex}
          sx={{ color: index === maxIndex ? 'text.secondary' : '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}
        >
          <ArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
