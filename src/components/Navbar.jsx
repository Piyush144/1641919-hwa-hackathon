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
  Switch,
  FormControlLabel,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import PawIcon from '@mui/icons-material/Pets'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useCart } from '../context/CartContext'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 260

export default function Navbar({ toggleDarkMode, darkMode }) {
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
        sx={{
          bgcolor: 'linear-gradient(135deg, #2F5D50 0%, #1a3a32 100%)',
          boxShadow: '0 4px 20px rgba(47,93,80,0.35)',
          borderBottom: 'none',
        }}
      >
        <Toolbar sx={{ px: 2, minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left side: Hamburger + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: '#FFFFFF',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                ml: -0.5,
              }}
              edge="start"
              aria-label="Open menu"
            >
              <MenuIcon fontSize="large" />
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
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#FFFFFF',
                textDecoration: 'none',
                cursor: 'pointer',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: '1.1rem',
              }}
            >
              TreasureTrail
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {/* Right side: Cart + Theme toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel
              control={<Switch size="small" checked={darkMode === 'dark'} onChange={toggleDarkMode} />}
              label={darkMode === 'dark' ? 'Dark' : 'Light'}
              labelPlacement="start"
              sx={{
                color: '#FFFFFF',
                ml: 1,
                mr: 1,
                '& .MuiFormControlLabel-label': { fontSize: '11px', fontWeight: 700 },
              }}
            />
            <IconButton
              component={RouterLink}
              to="/cart"
              sx={{
                color: '#FFFFFF',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#FFFFFF' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800, ml: 2, mr: 'auto', color: '#2B2B2B' }}>
            TreasureTrail
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
