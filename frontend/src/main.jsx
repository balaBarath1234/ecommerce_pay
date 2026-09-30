import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime : 30 * 1000,
      retry:1
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </QueryClientProvider>
)
