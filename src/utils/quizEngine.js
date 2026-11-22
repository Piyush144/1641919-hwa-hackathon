import { TILES } from '../data/tiles'

function shuffle(array) {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateHunt({ size, experience, food, duration }) {
  let level
  let title
  if (experience === 'first-time') {
    level = Math.floor(Math.random() * 2) + 1 // 1 or 2
    title = 'Beginner Trail'
  } else if (experience === 'gets-the-hang') {
    level = 3
    title = 'Rising Sniffer'
  } else {
    level = Math.floor(Math.random() * 2) + 4 // 4 or 5
    title = 'Master Tracker'
  }

  // Food preference
  let preferred = []
  if (food === 'kibble') {
    preferred = ['roll-channel', 'fringe-forest']
  } else if (food === 'treat') {
    preferred = ['lift-lip-cup', 'flap-pocket']
  }

  let ordered = []
  if (preferred.length) {
    const prefTiles = TILES.filter((t) => preferred.includes(t.id))
    const otherTiles = TILES.filter((t) => !preferred.includes(t.id))
    ordered = [...shuffle(prefTiles), ...shuffle(otherTiles)]
  } else {
    ordered = shuffle(TILES)
  }

  // Pick a subset based on level (higher level = more tiles)
  const tileCount = Math.min(level + 2, ordered.length)
  ordered = ordered.slice(0, tileCount)

  const hidingSteps = ordered.map((t) => t.hidingTip)

  let estimatedMinutes
  if (level <= 2) estimatedMinutes = 15
  else if (level === 3) estimatedMinutes = 25
  else estimatedMinutes = 40

  return {
    level,
    title,
    tiles: ordered,
    hidingSteps,
    estimatedMinutes,
  }
}
