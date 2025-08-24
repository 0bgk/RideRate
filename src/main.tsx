import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/index.tsx'
import { StrictMode } from 'react'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
