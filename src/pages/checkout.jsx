import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Link,
  Alert,
  Divider,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import {
  validateName,
  validateEmail,
  validatePhone,
  validatePincode,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateUpi,
} from '../utils/validators'
import { useNavigate } from 'react-router-dom'

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal',
]

export default function Checkout() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    coupon,
    shipping,
    total,
    clearCart,
  } = useCart()
  const shipStandard = shipping('standard')
  const shipExpress = shipping('express')
  const navigate = useNavigate()

  if (itemCount === 0) {
    navigate('/cart')
    return null
  }

  const [step, setStep] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', address1: '', address2: '', city: '', state: '', pincode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
    upiId: '', cardNumber: '', expiry: '', cvv: '',
  })

  const validateStep1 = () => {
    const e = {}
    const n = validateName(form.name)
    if (n) e.name = n
    const em = validateEmail(form.email)
    if (em) e.email = em
    const p = validatePhone(form.phone)
    if (p) e.phone = p
    const a = validatePincode(form.pincode)
    if (a) e.pincode = a
    if (!form.address1) e.address1 = 'Please enter your address.'
    if (!form.city) e.city = 'Please enter your city.'
    if (!form.state) e.state = 'Please select a state.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validatePayment = () => {
    const e = { ...errors }
    if (form.paymentMethod === 'upi') {
      const u = validateUpi(form.upiId)
      if (u) e.upi = u
    }
    if (form.paymentMethod === 'card') {
      const c = validateCardNumber(form.cardNumber)
      if (c) e.card = c
      const ex = validateExpiry(form.expiry)
      if (ex) e.expiry = ex
      const v = validateCVV(form.cvv)
      if (v) e.cvv = v
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNextStep0 = () => {
    if (!validateStep1()) return
    setStep(1)
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!validatePayment()) return
    setLoading(true)
    const orderId = 'TT-' + Math.floor(10000 + Math.random() * 90000)
    const order = {
      id: orderId,
      items,
      address: { ...form },
      totals: { subtotal, discount, shipping: shipStandard, total: total('standard') },
      method: form.deliveryMethod,
      payment: form.paymentMethod,
      date: new Date().toISOString(),
    }
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))
    } catch {
      // ignore storage errors
    }
    clearCart()
    setLoading(false)
    navigate(`/order-confirmation/${orderId}`)
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontFamily: 'Freda, serif', mb: 4 }}>
          Checkout
        </Typography>
        <Stepper activeStep={step} sx={{ mb: 4 }}>
          {[
            <Step key="1"><StepLabel>Delivery details</StepLabel></Step>,
            <Step key="2"><StepLabel>Delivery method</StepLabel></Step>,
            <Step key="3"><StepLabel>Payment (demo)</StepLabel></Step>,
          ]}
        </Stepper>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 280 }}>
            {step === 0 && (
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <form onSubmit={handleNextStep0} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      label="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Phone (10 digits)"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Address line 1"
                      value={form.address1}
                      onChange={(e) => setForm({ ...form, address1: e.target.value })}
                      error={!!errors.address1}
                      helperText={errors.address1}
                      required
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Address line 2 (optional)"
                      value={form.address2}
                      onChange={(e) => setForm({ ...form, address2: e.target.value })}
                      fullWidth
                      size="small"
                    />
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <TextField
                        label="City"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        error={!!errors.city}
                        helperText={errors.city}
                        required
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        select
                        label="State"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        error={!!errors.state}
                        helperText={errors.state}
                        required
                        size="small"
                        sx={{ flex: 1 }}
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </TextField>
                    </Box>
                    <TextField
                      label="PIN code (6 digits)"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      error={!!errors.pincode}
                      helperText={errors.pincode}
                      required
                      fullWidth
                      size="small"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        bgcolor: '#2F5D50',
                        color: 'white',
                        mt: 1,
                        '&:hover': { bgcolor: '#274d42' },
                      }}
                    >
                      NEXT
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            {step === 1 && (
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Choose delivery speed</Typography>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend">Delivery method</FormLabel>
                    <RadioGroup
                      value={form.deliveryMethod}
                      onChange={(e) => setForm({ ...form, deliveryMethod: e.target.value })}
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
                    >
                      <FormControlLabel
                        value="standard"
                        control={<Radio color="primary" />}
                        label={`Standard (4–6 days)${shipStandard === 0 ? ' • FREE' : ' • ₹' + shipStandard}`}
                      />
                      <FormControlLabel
                        value="express"
                        control={<Radio color="primary" />}
                        label={`Express (2–3 days) • ₹${shipExpress}`}
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStep(0)}
                      sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', flex: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setStep(2)}
                      sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', flex: 1, '&:hover': { bgcolor: '#274d42' } }}
                    >
                      NEXT
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
            {step === 2 && (
              <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Payment (demo)</Typography>
                  <Alert severity="info">
                    This is a demo store. No real payment will be taken.
                  </Alert>
                  <FormControl component="fieldset" sx={{ mb: 2, mt: 2 }}>
                    <FormLabel component="legend">Payment method</FormLabel>
                    <RadioGroup
                      value={form.paymentMethod}
                      onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
                    >
                      <FormControlLabel value="upi" control={<Radio color="primary" />} label="UPI" />
                      <FormControlLabel value="card" control={<Radio color="primary" />} label="Card" />
                      <FormControlLabel value="cod" control={<Radio color="primary" />} label="Cash on Delivery" />
                    </RadioGroup>
                  </FormControl>
                  {form.paymentMethod === 'upi' && (
                    <TextField
                      label="UPI ID"
                      value={form.upiId}
                      onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                      error={!!errors.upi}
                      helperText={errors.upi}
                      required
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}
                  {form.paymentMethod === 'card' && (
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <TextField
                        label="Card number"
                        value={form.cardNumber}
                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                        error={!!errors.card}
                        helperText={errors.card}
                        required
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Expiry (MM/YY)"
                        value={form.expiry}
                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                        error={!!errors.expiry}
                        helperText={errors.expiry}
                        required
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="CVV"
                        type="password"
                        value={form.cvv}
                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                        error={!!errors.cvv}
                        helperText={errors.cvv}
                        required
                        size="small"
                        sx={{ flex: 1 }}
                      />
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStep(1)}
                      sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', flex: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', flex: 1, '&:hover': { bgcolor: '#274d42' } }}
                    >
                      NEXT
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
          <Box sx={{ minWidth: 280, position: 'sticky', top: 4 }}>
            <Card sx={{ p: 3, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">Order summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>{formatINR(subtotal)}</Typography>
                </Box>
                {coupon && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: '#2F5D50', fontWeight: 600 }}>
                    <Typography>Discount ({coupon})</Typography>
                    <Typography>- {formatINR(discount)}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontWeight: 600 }}>
                  <Typography>Shipping</Typography>
                  <Typography>{shipStandard === 0 ? 'Free' : formatINR(shipStandard)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">{formatINR(total('standard'))}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
