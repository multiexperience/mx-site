import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import './styles/index.css'

inject();
injectSpeedInsights()
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)