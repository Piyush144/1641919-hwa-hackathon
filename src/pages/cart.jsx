import React from 'react'
import { Box, Container, Typography, Button, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/format'
import SectionTitle from '../components/SectionTitle'
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

  return (
    <Box sx={{ bgColor: 'background.default', minHeight: '100vh', py: 4 }}>
      {itemCount === 0 ? (
        <Container maxWidth="md">
          <SectionTitle>Your cart is empty</SectionTitle>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Add some kits to get started on your trail.
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/"
                variant="contained"
                sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
              >
                Shop kits
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <SectionTitle>Your cart ({itemCount})</SectionTitle>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper' }}>
                <CardContent>
                  <List dense>
                    {items.map((item) => (
                      <ListItem key={item.key} sx={{ px: 0, mb: 2, alignItems: 'center' }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <ListItemText primary={item.kitId} secondary={`Size: ${item.sizeId}`} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <button
                            onClick={() => setQty(item.key, item.qty - 1)}
                            sx={{ p: 0, border: 'none', bgcolor: 'transparent', cursor: 'pointer', color: '#2F5D50', disabled: item.qty <= 1 }}
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
                            onClick={() => removeItem(item.key)}
                            sx={{ p: 0, border: 'none', bgcolor: 'transparent', cursor: 'pointer', ml: 1, color: 'text.secondary' }}
                          >
                            Remove
                          </button>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 2, borderBottom: '1px solid #E5DDCE', pb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <input
                        type="text"
                        placeholder="Enter coupon"
                        defaultValue=""
                        sx={{ flex: 1, px: 1, py: 0.5, border: '1px solid #E5DDCE', borderRadius: 1 }}
                      />
                      <Button size="small" onClick={() => applyCoupon('TRAILS10')} sx={{ textTransform: 'none', borderRadius: 1 }}>
                        Apply
                      </Button>
                    </Box>
                    {coupon && (
                      <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                        Coupon {coupon} applied
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
              <Card sx={{ p: 2, border: '1px solid #E5DDCE', bgcolor: 'background.paper', position: 'sticky', top: 4 }}>
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
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ borderRadius: '999px', textTransform: 'none', bgcolor: '#2F5D50', color: 'white', '&:hover': { bgcolor: '#274d42' } }}
                    component={RouterLink}
                    to="/checkout"
                  >
                    Checkout
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  )
}
