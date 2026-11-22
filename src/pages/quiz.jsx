import React from 'react'
import { Box, Container, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material'
import SectionTitle from '../components/SectionTitle'

const QUESTIONS = [
  {
    id: 'size',
    label: "What's your dog's size?",
    options: [
      { value: 'small', label: 'Small (under 10kg)' },
      { value: 'medium', label: 'Medium (10–25kg)' },
      { value: 'large', label: 'Larger (over 25kg)' },
    ],
  },
  {
    id: 'experience',
    label: "Has your dog used puzzle toys before?",
    options: [
      { value: 'beginner', label: "No—new to puzzles" },
      { value: 'intermediate', label: 'A little experience' },
      { value: 'advanced', label: 'Loves a challenge' },
    ],
  },
  {
    id: 'food',
    label: "What does your dog prefer?",
    options: [
      { value: 'kibble', label: 'Kibble' },
      { value: 'treat', label: 'Treats' },
      { value: 'both', label: 'Both' },
    ],
  },
]

export default function Quiz() {
  const [answers, setAnswers] = React.useState({})
  const [current, setCurrent] = React.useState(0)

  const question = QUESTIONS[current]
  const isLast = current === QUESTIONS.length - 1

  const handleSelect = (value) => {
    setAnswers({ ...answers, [question.id]: value })
    setCurrent(current + 1)
  }

  if (current >= QUESTIONS.length) {
    return (
      <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <SectionTitle>Your trail level</SectionTitle>
          <Card sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid #E5DDCE' }}>
            <CardContent>
              <Typography variant="h5">Recommended: Starter Kit</Typography>
              <Typography variant="body2" color="text.secondary">
                Based on your answers, we recommend the Starter Kit with tiles matched to your dog.
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
            >
              Build today's hunt
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <SectionTitle>Find your dog's level</SectionTitle>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Question {current + 1} of {QUESTIONS.length}
        </Typography>
        <Card sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid #E5DDCE' }}>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">{question.label}</FormLabel>
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => handleSelect(e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
              >
                {question.options.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio color="primary" />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          {current > 0 && (
            <Button
              variant="outlined"
              onClick={() => setCurrent(current - 1)}
              sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50' }}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => handleSelect(answers[question.id])}
            disabled={!answers[question.id]}
            sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
          >
            {isLast ? 'Get recommendation' : 'Next'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
