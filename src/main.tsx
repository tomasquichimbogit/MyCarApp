import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import { App } from './App.tsx'
import { QueryProvider } from './provider/QueryProvider.tsx'

const AppRouter = import.meta.env.PROD ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter>
        <App />
      </AppRouter>
    </QueryProvider>
  </StrictMode>,
)
