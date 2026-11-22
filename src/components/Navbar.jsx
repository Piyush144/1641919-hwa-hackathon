import { AppBar, Toolbar, Typography, Box, Link, Badge, Button, IconButton } from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { useCart } from '../context/CartContext'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar() {
  const { itemCount } = useCart()

  return (
    <AppBar position="static" elevation={0} color="inherit" sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5DDCE' }}>
      <Toolbar sx={{ px: 2, minHeight: 64 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.5px', fontFamily: 'Freda, serif' }}>
            Treasure Trail
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link component={RouterLink} to="/cart" underline="none">
            <IconButton size="small" sx={{ color: '#2B2B2B', '&:hover': { backgroundColor: 'rgba(47,93,80,0.08)' } }}>
              <Badge badgeContent={itemCount > 0 ? itemCount : 0} color="error" sx={{ pl: 1 }}>
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
