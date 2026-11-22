import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import { KITS, SIZES, SHIPPING } from '../data/products'
import { TILES } from '../data/tiles'
import SectionTitle from '../components/SectionTitle'
import ProductCard from '../components/productCard'
import TileCard from '../components/TileCard'
import TrailCarousel from '../components/TrailCarousel'
import QuantityStepper from '../components/QuantityStepper'

const DottedLine = () => (
  <svg width="100%" height="4" style={{ display: 'block' }}>
    <line x1="0" y1="2" x2="100%" y2="2" stroke="#2F5D50" strokeWidth="1" strokeDasharray="6,4" />
  </svg>
)

const PROBLEM_CARDS = [
  {
    title: 'Boring in a week',
    text: 'The same bowl, every meal. Dogs lose interest fast when there&#39;s nothing to figure out.',
  },
  {
    title: 'Over before you leave',
    text: 'Gulped down in 60 seconds&#8212;no sniffing, no thinking, just empty calories.',
  },
  {
    title: 'Hard to clean',
    text: 'Complicated puzzles with tiny parts are a chore to wash and dry.',
  },
]

const HOW_IT_WORKS_STEPS = [
  { title: 'Build', text: 'Snap the silicone tiles together into any trail shape you like.' },
  { title: 'Hide', text: 'Tuck kibble or treats into each tile&#39;s pocket, maze, or cup.' },
  { title: 'Hunt', text: 'Let your dog sniff, nudge, and solve to earn every treat.' },
]

const FEATURE_ITEMS = [
  { icon: '👃', label: 'Sniffing', text: 'Engages the nose, the dog&#39;s strongest sense.' },
  { icon: '🧠', label: 'Problem-solving', text: 'Tiles require nudging, lifting, and rolling.' },
  { icon: '🍽️', label: 'Slower eating', text: 'Turns gulping into a calm, rewarding hunt.' },
  { icon: '🧼', label: 'Easy clean', text: 'Wipe with a damp cloth; bag is machine washable.' },
]

const REVIEWS = [
  { name: 'Sam, Golden Retriever', stars: 5, text: 'Finally something that keeps him busy after breakfast.' },
  { name: 'Maya, Beagle', stars: 5, text: 'She nosed every tile and was tired out in 20 minutes.' },
  { name: 'Leo, Poodle', stars: 4, text: 'Easy to wash and the tiles snap together nicely.' },
]

const WHATS_IN_THE_BOX = ['6 silicone trail tiles', '30 level cards', '1 cotton carry bag', 'Care guide']

const SPECS = [
  { q: 'What are the tiles made of?', a: 'Food-grade, BPA-free injection-moulded silicone.' },
  { q: 'Are they dishwasher safe?', a: 'Hand-wash recommended. The bag is machine washable.' },
  { q: 'Which dog sizes is this for?', a: 'All sizes&#8212;choose Small, Medium, or Larger at checkout.' },
  { q: 'Can I use wet food?', a: 'Yes&#8212;the Lift-Lip Cup works well with wet food, treats, or kibble.' },
]

export default function Home() {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = React.useState('medium')
  const [selectedKit, setSelectedKit] = React.useState(KITS[0])
  const [qty, setQty] = React.useState(1)
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [snackMessage, setSnackMessage] = React.useState('')

  const kitPrice = selectedKit.price * qty

  const handleAddToCart = () => {
    addItem(selectedKit.id, selectedSize, qty)
    setSnackMessage(`Added ${qty} × ${selectedKit.name} to cart`)
    setSnackOpen(true)
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh' }}>
      {/* 1. Hero */}
      <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
        <SectionTitle>
          Your dog&#39;s daily treasure hunt. Never the same twice.
        </SectionTitle>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4, fontSize: '1.1rem' }}>
          Snap-together silicone tiles and 30 level cards turn mealtime into an hour of sniffing,
          digging, and problem-solving.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component="a"
            href="#buy"
            variant="contained"
            sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
          >
            Shop the starter kit
          </Button>
          <Button component={RouterLink} to="/quiz" variant="outlined" sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', '&:hover': { borderColor: '#274d42', color: '#274d42' } }}>
            Find my dog&#39;s level
          </Button>
        </Box>
        <Box sx={{ mt: 6, p: 3, borderRadius: 3, bgcolor: 'rgba(47,93,80,0.08)', border: '1px dashed #2F5D50' }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Your dog's trail</Typography>
          <TrailCarousel />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
            Snap-together silicone tiles wind into a trail&#8212;hide treats, let your dog sniff, dig, and hunt.
          </Typography>
        </Box>
      </Box>
      <DottedLine />

      {/* 2. Problem */}
      <Box sx={{ py: 4, px: 2, bgColor: '#FFFFFF' }}>
        <SectionTitle>The problem with ordinary bowls</SectionTitle>
        <Grid container spacing={3}>
          {PROBLEM_CARDS.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.title}>
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6">{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{c.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DottedLine />

      {/* 3. How it works */}
      <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
        <SectionTitle>How it works</SectionTitle>
        <Grid container spacing={3}>
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={s.title}>
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Chip label={`Step ${i + 1}`} size="small" color="secondary" sx={{ mb: 2 }} />
                  <Typography variant="h6">{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{s.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DottedLine />

      {/* 4. Meet the tiles */}
      <Box sx={{ py: 4, px: 2 }}>
        <SectionTitle>Meet the tiles</SectionTitle>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {TILES.map((tile) => (
              <Grid item xs={12} md={6} key={tile.id}>
                <TileCard tile={tile} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <DottedLine />

      {/* 5. Why it keeps dogs busy */}
      <Box sx={{ py: 4, px: 2, bgColor: '#FFFFFF', textAlign: 'center' }}>
        <SectionTitle>Why it keeps dogs busy</SectionTitle>
        <Grid container spacing={3}>
          {FEATURE_ITEMS.map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.label}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {f.icon}
                </Typography>
                <Typography variant="subtitle2" fontWeight="600">{f.label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{f.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DottedLine />

      {/* 6. Buy section */}
      <Box id="buy" sx={{ py: 4, px: 2 }}>
        <Container maxWidth="lg">
          <SectionTitle>Build your kit</SectionTitle>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>Choose your dog&#39;s size</Typography>
            <ToggleButtonGroup
              value={selectedSize}
              exclusive
              onChange={(e, val) => setSelectedSize(val)}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {SIZES.map((s) => (
                <ToggleButton key={s.id} value={s.id} sx={{ textTransform: 'none', borderRadius: 2 }}>
                  {s.label} ({s.weight})
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>Choose your kit</Typography>
            <Grid container spacing={2}>
              {KITS.map((kit) => (
                <Grid item xs={12} sm={6} md={4} key={kit.id}>
                  <ProductCard
                    product={{ ...kit }}
                    selected={selectedKit.id === kit.id}
                    onSelect={setSelectedKit}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="subtitle2" fontWeight="600">Quantity</Typography>
            <QuantityStepper value={qty} onChange={setQty} />
            <Box sx={{ ml: 'auto', fontWeight: 600, minWidth: 100, textAlign: 'right' }}>
              {formatINR(kitPrice)}
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth={true}
              variant="contained"
              sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Box>
          <Box sx={{ mt: 3, p: 2, border: '1px solid #E5DDCE', borderRadius: 2, fontSize: '0.9rem', color: 'text.secondary' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <b>Delivery:</b> Standard ₹99 (free above ₹1,999), Express ₹199
            </Typography>
            <Typography variant="body2">
              <b>Returns:</b> 30-day happy-dog guarantee&#8212;no questions asked.
            </Typography>
          </Box>
        </Container>
      </Box>
      <DottedLine />

      {/* 7. Specs + What's in the box */}
      <Box sx={{ py: 4, px: 2, bgColor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <SectionTitle>Specs</SectionTitle>
              <Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography>Details &amp; care</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {SPECS.map((s) => (
                      <ListItem key={s.q} sx={{ px: 0 }}>
                        <ListItemText primary={s.q} secondary={s.a} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionTitle>What&#39;s in the box</SectionTitle>
              <List dense sx={{ border: '1px solid #E5DDCE', borderRadius: 3, p: 1 }}>
                {WHATS_IN_THE_BOX.map((item, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <DottedLine />

      {/* 8. Reviews */}
      <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
        <SectionTitle>Sample reviews</SectionTitle>
        <Grid container spacing={3}>
          {REVIEWS.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r.name}>
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Chip key={star} label={star <= r.stars ? '★' : '☆'} size="small" color={star <= r.stars ? 'secondary' : 'default'} sx={{ m: 0.25 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.seconded" sx={{ mt: 1, fontStyle: 'italic' }}>
                    "{r.text}"
                  </Typography>
                  <Typography variant="caption" fontWeight="600" sx={{ mt: 2, display: 'block' }}>
                    — {r.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DottedLine />

      {/* 9. Safety note */}
      <Box sx={{ py: 4, px: 2 }}>
        <Alert severity="info" sx={{ mx: 'auto', maxWidth: 600 }}>
          Not for unsupervised chewing. Always watch your dog while they hunt, and remove any
          damaged tiles right away. Treats and kibble sold separately.
        </Alert>
      </Box>
      <DottedLine />

      {/* 10. Final CTA */}
      <Box sx={{ py: 6, px: 2, textAlign: 'center', bgcolor: '#2F5D50', color: '#FFFFFF' }}>
        <Typography variant="h4" component="h2" sx={{ fontFamily: 'Freda, serif', mb: 2 }}>
          Ready to start the trail?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={RouterLink} to="/quiz" variant="outlined" sx={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.5)', textTransform: 'none', borderRadius: '999px', '&:hover': { borderColor: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.1)' } }}>
            Find my dog&#39;s level
          </Button>
          <Button component="a" href="#buy" variant="contained" sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#E0A526', color: '#2B2B2B', fontWeight: 600, '&:hover': { bgcolor: '#d49a2e' } }}>
            Shop the starter kit
          </Button>
        </Box>
      </Box>

      {snackOpen && (
        <Box sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <Alert
            severity="success"
            action={
              <Button size="small" color="success" onClick={() => setSnackOpen(false)}>
                View cart
              </Button>
            }
            onClose={() => setSnackOpen(false)}
          >
            {snackMessage}
          </Alert>
        </Box>
      )}
    </Box>
  )
}
