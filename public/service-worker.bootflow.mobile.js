import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const CACHE_NAME = 'bootflow-mobile-v1';
const API_CACHE_NAME = 'bootflow-api-v1';
const IMAGE_CACHE_NAME = 'bootflow-images-v1';

// Limpar caches antigos
cleanupOutdatedCaches();

// Precaching de assets estáticos
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache-first para assets estáticos (CSS, JS, fonts)
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'font',
  new CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
      }),
    ],
  }),
);

// Stale-while-revalidate para imagens
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: IMAGE_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dias
      }),
    ],
  }),
);

// Network-first para APIs com fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/') || url.hostname.includes('supabase.co'),
  new NetworkFirst({
    cacheName: API_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 5, // 5 minutos
      }),
    ],
    networkTimeoutSeconds: 3,
  }),
);

// Background sync para ações offline
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-actions') {
    event.waitUntil(syncOfflineActions());
  }
});

async function syncOfflineActions() {
  try {
    const db = await openIndexedDB();
    const actions = await db.getAll('offlineActions');
    
    for (const action of actions) {
      try {
        const response = await fetch(action.url, {
          method: action.method,
          body: JSON.stringify(action.body),
          headers: action.headers,
        });
        
        if (response.ok) {
          await db.delete('offlineActions', action.id);
        }
      } catch (error) {
        console.error('Erro ao sincronizar ação offline:', error);
      }
    }
  } catch (error) {
    console.error('Erro no background sync:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Boot Flow', body: 'Nova notificação' };
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/bootflow-192-maskable.png',
      badge: '/icons/bootflow-192-maskable.png',
      data: data.url,
      tag: data.tag || 'default',
      requireInteraction: data.requireInteraction || false,
    }),
  );
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data),
    );
  }
});

// Helper para IndexedDB (simplificado)
async function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('bootflow-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('offlineActions')) {
        db.createObjectStore('offlineActions', { keyPath: 'id', autoIncrement: true });
      }
      resolve({
        getAll: (store) => {
          return new Promise((res, rej) => {
            const tx = db.transaction([store], 'readonly');
            const objStore = tx.objectStore(store);
            const req = objStore.getAll();
            req.onsuccess = () => res(req.result);
            req.onerror = () => rej(req.error);
          });
        },
        delete: (store, id) => {
          return new Promise((res, rej) => {
            const tx = db.transaction([store], 'readwrite');
            const objStore = tx.objectStore(store);
            const req = objStore.delete(id);
            req.onsuccess = () => res();
            req.onerror = () => rej(req.error);
          });
        },
      });
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offlineActions')) {
        db.createObjectStore('offlineActions', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

