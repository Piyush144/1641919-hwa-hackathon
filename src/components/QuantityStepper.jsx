import { Box, Button, TextField } from '@mui/material'

export default function QuantityStepper({ value, onChange, min = 1, max = 10 }) {
  const handleChange = (event) => {
    const val = Number(event.target.value)
    if (!Number.isNaN(val)) {
      onChange(Math.min(max, Math.max(min, val)))
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Button
        size="small"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        sx={{ px: 1, borderRadius: 1 }}
      >
        −
      </Button>
      <TextField
        type="number"
        inputProps={{ min, max }}
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ width: 50, textAlign: 'center', p: 0 }}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        size="small"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        sx={{ px: 1, borderRadius: 1 }}
      >
        +
      </Button>
    </Box>
  )
}
