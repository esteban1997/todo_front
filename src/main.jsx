import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoApp } from './TodoApp.jsx'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <TodoApp />
    </StrictMode>,
  </BrowserRouter>
)