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
  const [containerWidth, setContainerWidth] = React.useState(0)

  const containerRef = React.useRef(null)

  // Responsive tile count: mobile 1, tablet 2, desktop 3
  const tilesPerView = React.useMemo(() => {
    if (containerWidth < 600) return 1
    if (containerWidth < 900) return 2
    return 3
  }, [containerWidth])

  const gap = 16 // matches the gap used between tiles

  const maxIndex = React.useMemo(() => Math.max(0, TRAIL_ITEMS.length - tilesPerView), [TRAIL_ITEMS.length, tilesPerView])

  // Clamp activeIndex whenever tile count changes
  React.useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex)
    }
  }, [activeIndex, maxIndex])

  // ResizeObserver to measure actual viewport width
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width || entry.borderBoxSize?.[0]?.inlineSize || 0)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate every 2 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 2000)
    return () => clearInterval(timer)
  }, [maxIndex])

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? maxIndex : i - 1))
  }

  const next = () => {
    setActiveIndex((i) => (i >= maxIndex ? 0 : i + 1))
  }

  const goTo = (index) => {
    setActiveIndex(index)
  }

  // Tile width computed from actual measured viewport width
  const tileWidth = containerWidth > 0 ? (containerWidth - gap * (tilesPerView - 1)) / tilesPerView : 0

  // Horizontal offset based on active index
  const offset = activeIndex > 0 ? -(activeIndex * (tileWidth + gap)) : 0

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto' }}>
      {/* Viewport: clipping boundary, overflow hidden */}
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          overflowX: 'hidden',
          minWidth: 0,
          pb: 2,
          position: 'relative',
        }}
      >
        {/* Track: single horizontal row, moves with translateX */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: gap,
            alignItems: 'center',
            transform: `translateX(${offset}px)`,
            transition: 'transform 450ms ease',
            minWidth: 'max-content',
          }}
        >
          {TRAIL_ITEMS.map((item, i) => (
            <Box
              key={item.id}
              sx={{
                flexShrink: 0,
                width: tileWidth,
                minWidth: tileWidth,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: i === activeIndex ? 1 : 0.55,
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                transform: i === activeIndex ? 'scale(1.06)' : 'scale(1)',
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
      </Box>
      {/* Navigation: arrows + numbered pagination */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1.5 }}>
        <IconButton
          size="small"
          onClick={prev}
          disabled={activeIndex === 0}
          sx={{
            color: activeIndex === 0 ? 'text.secondary' : '#2F5D50',
            bgcolor: activeIndex === 0 ? 'rgba(47,93,80,0.08)' : 'rgba(47,93,80,0.1)',
            borderRadius: 2,
            p: 1,
          }}
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
                onClick={() => goTo(dotIndex)}
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
          disabled={activeIndex >= maxIndex}
          sx={{
            color: activeIndex >= maxIndex ? 'text.secondary' : '#2F5D50',
            bgcolor: activeIndex >= maxIndex ? 'rgba(47,93,80,0.08)' : 'rgba(47,93,80,0.1)',
            borderRadius: 2,
            p: 1,
          }}
        >
          <ArrowRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
