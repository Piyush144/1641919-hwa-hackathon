import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2F5D50',
    },
    secondary: {
      main: '#E0A526',
    },
    background: {
      default: '#F4E9D8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2B2B2B',
      secondary: '#6B6B6B',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontFamily: 'Freda, serif', fontSize: '2.5rem' },
    h2: { fontFamily: 'Freda, serif', fontSize: '2rem' },
    h3: { fontFamily: 'Freda, serif', fontSize: '1.75rem' },
    h4: { fontFamily: 'Freda, serif', fontSize: '1.5rem' },
    h5: { fontFamily: 'Freda, serif', fontSize: '1.25rem' },
    h6: { fontFamily: 'Freda, serif', fontSize: '1rem' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '999px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F4E9D8',
          color: '#2B2B2B',
        },
      },
    },
  },
})
