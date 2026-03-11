import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const path = window.location.pathname;

if (path.startsWith('/app')) {
  // Remove static content and render React
  const staticContent = document.getElementById('static-content');
  if (staticContent) {
    staticContent.remove();
  }
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // We are on the landing page
  // Attach event listener to login button
  const loginBtn = document.querySelector('.btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/app';
    });
  }
}

