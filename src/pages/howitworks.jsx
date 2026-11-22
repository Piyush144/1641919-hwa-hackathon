import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Alert,
  Snackbar,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FAQS } from '../data/faq'
import SectionTitle from '../components/SectionTitle'

const MANUFACTURE_POINTS = [
  'Injection-moulded food-grade silicone tiles',
  'Tongue-and-groove edges snap together securely',
  'Recycled card level cards',
]

const COST_POINTS = [
  { label: 'Estimated unit cost', value: '₹700' },
  { label: 'Starter kit price', value: '₹2,499' },
  { label: 'Margin', value: '~72%' },
]

const WHY_LAUNCH = [
  'Repeat revenue from expansion packs',
  'Low return risk — durable silicone',
  'Easy to ship — lightweight and compact',
]

const TESTING_PLAN = [
  'Chew test with 20+ dogs',
  'Material safety test (BPA-free, food-grade)',
  'Trail trial with 20 households',
]

const TIMELINE = [
  { label: 'Prototype', text: 'First silicone tile moulds and card designs.' },
  { label: 'Testing', text: 'Chew, material, and household trials completed.' },
  { label: 'Launch', text: 'Starter kit and expansion packs go live.' },
]

export default function HowItWorks() {
  const [open, setOpen] = React.useState(false)
  const [msg, setMsg] = React.useState(null)
  const [form, setForm] = React.useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setMsg({ ok: false, text: 'Please fill in all fields.' })
      setOpen(true)
      return
    }
    setMsg({ ok: true, text: 'Thanks! Your message has been sent (demo).' })
    setOpen(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* How it could be made */}
        <SectionTitle>How it could be made</SectionTitle>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Manufacture</Typography>
                <List>
                  {MANUFACTURE_POINTS.map((p) => (
                    <ListItem key={p} sx={{ px: 0 }}>{p}</ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Cost &amp; margin</Typography>
                {COST_POINTS.map((c) => (
                  <Box key={c.label} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{c.label}</Typography>
                    <Typography fontWeight="600">{c.value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h6">Why launch it</Typography>
                <List>
                  {WHY_LAUNCH.map((p) => (
                    <ListItem key={p} sx={{ px: 0 }}>{p}</ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Testing plan */}
        <SectionTitle sx={{ mt: 6 }}>Testing plan</SectionTitle>
        <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
          <CardContent>
            <List>
              {TESTING_PLAN.map((t) => (
                <ListItem key={t} sx={{ px: 0 }}>{t}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Timeline */}
        <SectionTitle sx={{ mt: 6 }}>From prototype to launch</SectionTitle>
        <Stepper activeStep={2} sx={{ mb: 4 }}>
          {TIMELINE.map((t) => (
            <Step key={t.label}>
              <StepLabel>{t.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={2}>
          {TIMELINE.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.label}>
              <Typography variant="body2" color="text.secondary">
                {t.text}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* FAQ */}
        <SectionTitle sx={{ mt: 6 }}>FAQ</SectionTitle>
        {FAQS.map((faq, i) => (
          <Accordion key={i} defaultExpanded={i === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Contact */}
        <SectionTitle sx={{ mt: 6 }}>Contact us</SectionTitle>
        <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                multiline
                rows={3}
                required
                fullWidth
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
              >
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity={msg?.ok ? 'success' : 'error'} onClose={() => setOpen(false)}>
          {msg?.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}
