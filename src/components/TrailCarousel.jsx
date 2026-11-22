import React from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
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

export default function TrailCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TRAIL_ITEMS.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setActiveIndex((i) => (i - 1 + TRAIL_ITEMS.length) % TRAIL_ITEMS.length)
  const next = () => setActiveIndex((i) => (i + 1) % TRAIL_ITEMS.length)

  // Number of tiles visible at once based on screen width
  const tilesPerView = React.useMemo(() => {
    if (typeof window === 'undefined') return 3
    const w = window.innerWidth
    if (w < 600) return 1
    if (w < 900) return 2
    return 3
  }, [])

  const maxIndex = Math.max(0, TRAIL_ITEMS.length - tilesPerView)

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto' }}>
      {/* Centered track — slides never spill out of parent */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: 'center',
          minWidth: 'max-content',
          mx: 'auto',
          pb: 2,
          overflowX: 'hidden',
        }}
      >
        {TRAIL_ITEMS.map((item, i) => (
          <Box
            key={item.id}
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: i === activeIndex ? 1 : 0.55,
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              transform: i === activeIndex ? 'scale(1.06)' : 'scale(1)',
              width: 200,
              minWidth: 200,
            }}
          >
            <img
              src={`/${item.id}.svg`}
              alt={item.name}
              sx={{
                width: '100%',
                height: 'auto',
                minHeight: 200,
                maxHeight: 200,
                objectFit: 'contain',
                borderRadius: 2,
                mx: 'auto',
                display: 'block',
                filter: i === activeIndex ? 'drop-shadow(0 6px 16px rgba(47,93,80,0.4))' : 'none',
              }}
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1.5 }}>
        <IconButton
          size="small"
          onClick={prev}
          sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.1)', borderRadius: 2, p: 1 }}
        >
          <ArrowLeftIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 0.6 }}>
          {TRAIL_ITEMS.map((_, dotIndex) => {
            const active = activeIndex === dotIndex
            return (
              <Button
                key={dotIndex}
                size="small"
                variant="text"
                onClick={() => setActiveIndex(dotIndex)}
                sx={{
                  p: 0.5,
                  minWidth: 30,
                  height: 30,
                  borderRadius: '999px',
                  bgcolor: active ? '#2F5D50' : 'rgba(47,93,80,0.12)',
                  color: active ? '#FFFFFF' : '#2F5D50',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 12,
                  '&:hover': { bgcolor: active ? '#274d42' : 'rgba(47,93,80,0.2)' },
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
          sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.1)', borderRadius: 2, p: 1 }}
        >
          <ArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
