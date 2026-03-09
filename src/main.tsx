import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import { App } from './App.tsx'
import { QueryProvider } from './provider/QueryProvider.tsx'
import { ModalProvider } from 'tomascomponents'

const AppRouter = import.meta.env.PROD ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AppRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AppRouter>
    </QueryProvider>
  </StrictMode>,
)
