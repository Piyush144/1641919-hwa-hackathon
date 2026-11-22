import { createTheme } from '@mui/material/styles'

const basePalette = {
  secondary: { main: '#E0A526' },
  text: { primary: '#2B2B2B', secondary: '#6B6B6B' },
}

export function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#5C8D84' : '#2F5D50',
      },
      secondary: basePalette.secondary,
      background: {
        default: isDark ? '#231f1a' : '#F4E9D8',
        paper: isDark ? '#2d2720' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#e8e2d8' : '#2B2B2B',
        secondary: isDark ? '#b5a896' : '#6B6B6B',
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
    shape: { borderRadius: 16 },
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
            backgroundColor: isDark ? '#231f1a' : '#F4E9D8',
            color: isDark ? '#e8e2d8' : '#2B2B2B',
          },
        },
      },
    },
  })
}
