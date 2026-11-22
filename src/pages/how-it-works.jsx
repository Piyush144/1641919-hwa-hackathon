import React from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SectionTitle from '../components/SectionTitle'
import { FAQS } from '../data/faq'

export default function HowItWorks() {
  const steps = [
    { title: 'Pick a kit', text: 'Choose a Starter, Explorer, or Expansion kit matched to your dog&#39;s size.' },
    { title: 'Set up the trail', text: 'Place tiles around your home or garden and hide treats in each one.' },
    { title: 'Let them hunt', text: 'Watch your dog sniff, solve, and earn every treat.' },
  ]

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <SectionTitle>How it works</SectionTitle>
        <Grid container spacing={3}>
          {steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #E5DDCE', bgcolor: 'background.paper' }}>
                <Chip label={`Step ${i + 1}`} size="small" color="secondary" sx={{ mb: 2 }} />
                <Typography variant="h6">{step.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flexGrow: 1 }}>
                  {step.text}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <SectionTitle sx={{ mt: 6 }}>FAQ</SectionTitle>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I clean the tiles?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Wipe tiles with a damp cloth and mild soap. The bag is machine washable.</Typography>
          </AccordionDetails>
        </Accordion>
        {FAQS.map((faq, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  )
}
