import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/api" element={<App />} />
        <Route path="/api/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
