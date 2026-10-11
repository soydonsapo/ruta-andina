import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    primary: { main: '#a94f31', contrastText: '#fff' },
    secondary: { main: '#f4a935', contrastText: '#2d211b' },
    background: { default: '#f7f5f0', paper: '#fffdf9' },
  },
  shape: { borderRadius: 14 },
  typography: { fontFamily: 'Jost, Arial, sans-serif' },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
