import { createTheme } from '@mui/material/styles'

export function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#5C8D84' : '#2F5D50',
      },
      secondary: { main: '#E0A526' },
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
      h1: { fontSize: '14px', fontWeight: 700 },
      h2: { fontSize: '14px', fontWeight: 700 },
      h3: { fontSize: '13px', fontWeight: 600 },
      h4: { fontSize: '13px', fontWeight: 600 },
      h5: { fontSize: '13px', fontWeight: 600 },
      h6: { fontSize: '12px', fontWeight: 600 },
      body1: { fontSize: '12px' },
      body2: { fontSize: '12px' },
      button: { fontSize: '12px', textTransform: 'none', fontWeight: 600 },
      caption: { fontSize: '12px' },
      subtitle1: { fontSize: '13px' },
      subtitle2: { fontSize: '13px' },
      overline: { fontSize: '12px' },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '999px',
            fontSize: '12px',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#231f1a' : '#F4E9D8',
            color: isDark ? '#e8e2d8' : '#2B2B2B',
            fontSize: '12px',
          },
        },
      },
    },
  })
}
