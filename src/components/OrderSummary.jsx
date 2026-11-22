import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material'
import { formatINR } from '../utils/format'

export default function OrderSummary({ items, subtotal, discount, coupon, shipping, total, couponMessage }) {
  return (
    <Box sx={{ border: '1px solid #E5DDCE', borderRadius: 3, p: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List dense>
        {items.map((item) => (
          <ListItem key={item.key} sx={{ px: 0 }}>
            <ListItemText primary={item.qty + ' × ' + item.kitId} secondary={`₹0`} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
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
        <Typography>{shipping === 0 ? 'Free' : formatINR(shipping)}</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{formatINR(total)}</Typography>
      </Box>
      {couponMessage && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {couponMessage}
        </Typography>
      )}
    </Box>
  )
}
