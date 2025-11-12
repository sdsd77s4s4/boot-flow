const CACHE_NAME = 'bootflow-agent-cache-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.agent.json',
  '/favicon.ico',
];
const API_CACHE_NAME = 'bootflow-api-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((outdated) => caches.delete(outdated)),
      )),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Cache de API com estratégia network-first
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase.co')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(request))
          .then((cached) => cached || new Response('Offline', { status: 503 }));
      }),
    );
    return;
  }

  // Cache de assets com estratégia cache-first
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, cloned);
            });
          }
          return response;
        })
        .catch(() => {
          if (cachedResponse) return cachedResponse;
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#1e293b"/><text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="14">Offline</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } },
            );
          }
          return new Response('Conteúdo offline não disponível', { status: 503 });
        });

      return cachedResponse ?? networkFetch;
    }),
  );
});
