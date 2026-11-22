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

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
          minWidth: 'max-content',
          mx: 'auto',
          pb: 2,
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
              opacity: i === activeIndex ? 1 : 0.5,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: i === activeIndex ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <img
              src={`/${item.id}.svg`}
              alt={item.name}
              // sx={{
              //   width: 250,
              //   height: 250,
              //   minWidth: 250,
              //   minHeight: 250,
              //   borderRadius: 2,
              //   filter: i === activeIndex ? 'drop-shadow(0 4px 8px rgba(47,93,80,0.35))' : 'none',
              // }}
            />
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
          sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}
        >
          <ArrowLeftIcon fontSize="small" />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
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
          sx={{ color: '#2F5D50', bgcolor: 'rgba(47,93,80,0.08)', borderRadius: 2 }}
        >
          <ArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
