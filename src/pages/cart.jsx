import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import { Link as RouterLink } from 'react-router-dom'

export default function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    coupon,
    removeItem,
    setQty,
    applyCoupon,
    clearCart,
    shipping,
    total,
  } = useCart()
  const shipStandard = shipping('standard')
  const [openCouponMsg, setOpenCouponMsg] = React.useState(null)
  const [removingKey, setRemovingKey] = React.useState(null)

  const handleApply = (code) => {
    const res = applyCoupon(code)
    setOpenCouponMsg({ ok: res.ok, message: res.message })
  }

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      {itemCount === 0 ? (
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>🛒</Typography>
            <Typography variant="h6">Your cart is empty</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}>
              Let's find something for your dog.
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
              >
                Shop now
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 4 }}>
            Your cart ({itemCount})
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3 }}>
                <CardContent>
                  <List dense>
                    {items.map((item) => {
                      const kitPrice = (item.kitId === 'starter-kit' ? 2499 : item.kitId === 'explorer-kit' ? 3999 : 1299)
                      return (
                        <ListItem key={item.key} sx={{ px: 0, mb: 2, alignItems: 'center' }}>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <ListItemText
                              primary={item.kitId}
                              secondary={`Size: ${item.sizeId}  •  ₹${kitPrice} each`}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <button
                              onClick={() => setQty(item.key, item.qty - 1)}
                              disabled={item.qty <= 1}
                              sx={{ p: 0, border: 'none', bgcolor: 'transparent', cursor: 'pointer', color: '#2F5D50', opacity: item.qty <= 1 ? 0.4 : 1 }}
                            >
                              −
                            </button>
                            <Typography variant="body2" sx={{ mx: 0.5, minWidth: 20, textAlign: 'center' }}>
                              {item.qty}
                            </Typography>
                            <button
                              onClick={() => setQty(item.key, item.qty + 1)}
                              sx={{ p: 0, border: 'none', bgcolor: 'transparent', cursor: 'pointer', color: '#2F5D50' }}
                            >
                              +
                            </button>
                            <button
                              onClick={() => setRemovingKey(item.key)}
                              sx={{ p: 0, border: 'none', bgcolor: 'transparent', cursor: 'pointer', ml: 1, color: 'text.secondary' }}
                            >
                              Remove
                            </button>
                          </Box>
                        </ListItem>
                      )
                    })}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 2, borderBottom: '1px solid #E5DDCE', pb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <input
                        type="text"
                        placeholder="Enter coupon"
                        defaultValue=""
                        sx={{ flex: 1, px: 1, py: 0.5, border: '1px solid #E5DDCE', borderRadius: 1 }}
                      />
                      <Button size="small" onClick={() => handleApply('TRAILS10')} sx={{ textTransform: 'none', borderRadius: 1 }}>
                        Apply
                      </Button>
                      {coupon && (
                        <Button size="small" onClick={() => applyCoupon(null)} sx={{ textTransform: 'none', borderRadius: 1, color: '#2F5D50' }}>
                          Remove
                        </Button>
                      )}
                    </Box>
                    {openCouponMsg && (
                      <Alert severity={openCouponMsg.ok ? 'success' : 'error'} sx={{ mt: 1 }}>
                        {openCouponMsg.message}
                      </Alert>
                    )}
                    {coupon && (
                      <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                        Code applied: {coupon} — 10% off
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'right', mt: 2 }}>
                    <Button
                      onClick={clearCart}
                      sx={{ textTransform: 'none', color: 'text.secondary', borderColor: 'text.secondary', '&:hover': { borderColor: 'text.secondary' } }}
                      variant="outlined"
                    >
                      Clear cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ minWidth: 280 }}>
              <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', borderRadius: 3, position: 'sticky', top: 4 }}>
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
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
                      component={RouterLink}
                      to="/checkout"
                    >
                      Proceed to checkout
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      component={RouterLink}
                      to="/"
                      sx={{ borderRadius: '999px', textTransform: 'none', color: '#2F5D50', borderColor: '#2F5D50', mt: 1, '&:hover': { borderColor: '#274d42', color: '#274d42' } }}
                    >
                      Continue shopping
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      )}
      <Snackbar open={openCouponMsg !== null} autoHideDuration={4000} onClose={() => setOpenCouponMsg(null)}>
        <Alert severity={openCouponMsg?.ok ? 'success' : 'error'} onClose={() => setOpenCouponMsg(null)}>
          {openCouponMsg?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
