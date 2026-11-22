import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import PawIcon from '@mui/icons-material/Pets'
import { useCart } from '../context/CartContext'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 260

export default function Navbar() {
  const { itemCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/quiz', "label": "Find my dog's level" },
    { path: '/how-it-works', label: 'How it works' },
  ]

  const isActive = (path) => location.pathname === path

  const handleNavClick = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        color="inherit"
        sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5DDCE' }}
      >
        <Toolbar sx={{ px: 2, minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: '#2B2B2B', md: 'display:none' }}
              edge="start"
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to="/"
              size="large"
              sx={{
                bgcolor: '#E0A526',
                p: 1,
                mr: 0.5,
                boxShadow: '0 4px 12px rgba(224,165,38,0.4)',
                '&:hover': { bgcolor: '#d4a01a' },
              }}
            >
              <PawIcon fontSize="large" sx={{ color: '#2B2B2B' }} />
            </IconButton>
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.5px', fontFamily: 'Freda, serif' }}
            >
              Treasure Trail
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              component={RouterLink}
              to="/cart"
              sx={{ color: '#2B2B2B', '&:hover': { backgroundColor: 'rgba(47,93,80,0.08)' } }}
            >
              <Badge badgeContent={itemCount > 0 ? itemCount : 0} color="error" sx={{ pl: 1 }}>
                <ShoppingCart fontSize="large" />
              </Badge>
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontFamily: 'Freda, serif', ml: 2, mr: 'auto' }}>
            Treasure Trail
          </Typography>
        </Toolbar>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(item.path)}
                selected={isActive(item.path)}
                sx={{ bgColor: isActive(item.path) ? 'rgba(47,93,80,0.08)' : 'inherit' }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/cart"
              onClick={handleDrawerToggle}
              sx={{ bgColor: 'inherit' }}
            >
              <ListItemText primary="Cart" />
              <Badge badgeContent={itemCount > 0 ? itemCount : 0} color="error" sx={{ ml: 'auto', mr: 2 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}
