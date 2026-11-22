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
  TextField,
  Alert,
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
  const [dogName, setDogName] = React.useState('')
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
      setResult({ ...hunt, dogName })
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
    setResult({ ...hunt, dogName })
  }

  const handleAddKitToCart = () => {
    addItem('starter-kit', answers.size || 'medium', 1)
    setSnackOpen(true)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=800')
    const tilesHtml = result.tiles.map((t) => `<li>${t.name}</li>`).join('')
    const stepsHtml = result.hidingSteps.map((s) => `<li>${s}</li>`).join('')
    printWindow.document.write(`
      <html>
      <head>
        <title>${dogName ? dogName + "'s" : "Your"} Hunt Level Card</title>
        <style>
          body { font-family: Inter, sans-serif; padding: 2rem; color: #2B2B2B; }
          h1 { color: #2F5D50; font-size: 14px; }
          .card { border: 2px solid #2F5D50; border-radius: 16px; padding: 1.5rem; max-width: 500px; margin: 0 auto; }
          ul { padding-left: 1.2rem; }
          @media print { body { padding: 0; } .card { border: 2px solid #000; } }
        </style>
      </head>
      <body onload="window.print(); window.close()">
        <div class="card">
          <h1>${dogName ? dogName + "'s" : "Your"} Hunt Level Card</h1>
          <p><strong>Level:</strong> ${result.level} &bull; <strong>${result.title}</strong></p>
          <p><strong>Estimated time:</strong> ${result.estimatedMinutes} minutes</p>
          <h3>Ordered tiles</h3>
          <ul>${tilesHtml}</ul>
          <h3>Hiding steps</h3>
          <ol>${stepsHtml}</ol>
        </div>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  if (result && current >= QUESTIONS.length) {
    const displayName = dogName ? `${dogName}'s` : "Your"
    return (
      <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <SectionTitle>${displayName} trail level</SectionTitle>
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
            <Button variant="outlined" onClick={handlePrint} sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50' }}>
              Download level card
            </Button>
            <Button variant="text" onClick={() => { setResult(null); setCurrent(0); setAnswers({}); setDogName(''); }} sx={{ borderRadius: '999px', textTransform: 'none', color: '#6B6B6B', '&:hover': { color: '#2B2B2B' } }}>
              Start Over
            </Button>
          </Box>
        </Container>
      </Box>
    )
  }

  const showDogName = current === 0

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
        {showDogName && (
          <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, mb: 4 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Optional: tell us your dog&#39;s name so we can personalise the result.
              </Typography>
              <TextField
                label="Dog's name"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="e.g. Bruno"
                fullWidth
                size="small"
              />
            </CardContent>
          </Card>
        )}
        <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 4 }}>
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
