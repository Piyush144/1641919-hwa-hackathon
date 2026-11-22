import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Chip,
} from '@mui/material'
import { generateHunt } from '../utils/quizEngine'
import { SIZES } from '../data/products'
import { useCart } from '../context/CartContext'
import { List, ListItem } from '@mui/material'
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
      { value: 'first-time', label: "First time—new to puzzles" },
      { value: 'gets-the-hang', label: "Gets the hang of it" },
      { value: 'solves-fast', label: 'Solves fast' },
    ],
  },
  {
    id: 'food',
    label: "What does your dog prefer?",
    options: [
      { value: 'kibble', label: 'Kibble' },
      { value: 'treat', label: 'Treats' },
      { value: 'mixed', label: 'Mixed / any' },
    ],
  },
  {
    id: 'duration',
    label: 'How long do you want them busy?',
    options: [
      { value: '15', label: '~15 minutes' },
      { value: '30', label: '~30 minutes' },
      { value: '45', label: '~45 minutes' },
    ],
  },
]

export default function Quiz() {
  const { addItem } = useCart()
  const [current, setCurrent] = React.useState(0)
  const [answers, setAnswers] = React.useState({})
  const [result, setResult] = React.useState(null)
  const [snackOpen, setSnackOpen] = React.useState(false)

  const question = QUESTIONS[current]
  const isLast = current === QUESTIONS.length - 1

  const handleSelect = (value) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = () => {
    if (isLast) {
      const hunt = generateHunt({
        size: answers.size,
        experience: answers.experience,
        food: answers.food,
        duration: answers.duration,
      })
      setResult(hunt)
      setCurrent(current + 1)
    } else {
      setCurrent(current + 1)
    }
  }

  const handleBack = () => {
    setCurrent(current - 1)
  }

  const handleRegenerate = () => {
    const hunt = generateHunt({
      size: answers.size,
      experience: answers.experience,
      food: answers.food,
      duration: answers.duration,
    })
    setResult(hunt)
  }

  const handleAddKitToCart = () => {
    addItem('starter-kit', answers.size || 'medium', 1)
    setSnackOpen(true)
  }

  if (result && current >= QUESTIONS.length) {
    return (
      <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <SectionTitle>Your trail level</SectionTitle>
          <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5">{result.title}</Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                Level {result.level}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Estimated time: {result.estimatedMinutes} minutes
              </Typography>
              <Typography variant="subtitle2" fontWeight="600" sx={{ mt: 3, mb: 1 }}>
                Ordered tiles
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {result.tiles.map((t) => (
                  <Chip key={t.id} label={t.name} size="small" color="secondary" />
                ))}
              </Box>
              <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
                Hiding steps
              </Typography>
              <List dense sx={{ mt: 1, pl: 0 }}>
                {result.hidingSteps.map((step, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    {`${i + 1}. ${step}`}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="outlined" onClick={handleRegenerate} sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50' }}>
              Generate another layout
            </Button>
            <Button variant="contained" onClick={handleAddKitToCart} sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}>
              Add the starter kit to cart
            </Button>
            <Button variant="text" onClick={() => { setResult(null); setCurrent(0); setAnswers({}); }} sx={{ borderRadius: '999px', textTransform: 'none', color: '#6B6B6B', '&:hover': { color: '#2B2B2B' } }}>
              Start Over
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={current} sx={{ mb: 2 }}>
            {QUESTIONS.map((q) => (
              <Step key={q.id}>
                <StepLabel>{q.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <LinearProgress variant="determinate" value={((current) / QUESTIONS.length) * 100} sx={{ height: 4, borderRadius: 2 }} />
        </Box>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Freda, serif', mb: 4 }}>
          Question {current + 1} of {QUESTIONS.length}
        </Typography>
        <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">{question.label}</FormLabel>
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => handleSelect(e.target.value)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
              >
                {question.options.map((opt) => (
                  <Typography key={opt.value} component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', p: 1.5, border: '1px solid #E5DDCE', borderRadius: 2, '&:hover': { borderColor: '#2F5D50', bgcolor: '#f3f7f5' } }}>
                    <Radio
                      color="primary"
                      value={opt.value}
                      checked={answers[question.id] === opt.value}
                      inputProps={{ 'aria-label': opt.label }}
                    />
                    {opt.label}
                  </Typography>
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          {current > 0 && (
            <Button variant="outlined" onClick={handleBack} sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50' }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[question.id]}
            sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
          >
            {isLast ? 'Get my trail' : 'Next'}
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
