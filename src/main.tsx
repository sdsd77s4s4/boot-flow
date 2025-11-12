import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.agent.js')
      .then((registration) => {
        console.log('[Service Worker] Registrado:', registration.scope);
      })
      .catch((error) => {
        console.error('[Service Worker] Erro:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
