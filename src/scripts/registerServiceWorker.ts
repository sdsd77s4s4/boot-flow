if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.agent.js')
      .then((registration) => {
        console.log('[Service Worker] Registrado com sucesso:', registration.scope);
      })
      .catch((error) => {
        console.error('[Service Worker] Erro ao registrar:', error);
      });
  });
}

