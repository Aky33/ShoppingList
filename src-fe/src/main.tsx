import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/auth-context.tsx'

import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

// eslint-disable-next-line no-unused-vars
import './i18n.ts'    //import kvůli inicializaci
import { ErrorProvider } from './error/error-context.tsx'

ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ErrorProvider>
  </React.StrictMode>
)
