import React from 'react'
import ReactDOM from 'react-dom'

// MUI
import CssBaseLine from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'

// Styles
import globalStyles from '@styles/globalStyles'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseLine />
    <GlobalStyles styles={globalStyles} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
