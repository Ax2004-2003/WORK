const CACHE_NAME = 'system-pwa-cache-v1';

const FILES_TO_CACHE = [
  '/system/',
  '/system/index.html',
  '/system/fisica.html',
  '/system/fisica.jpeg',
  '/system/manifest.json',
  '/system/img/12.jpg',
  '/system/img/512.jpg'
];

// Instalar y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  console.log('✅ Service Worker instalado');
});

// Activar (puedes limpiar caches antiguos si gustas aquí)
self.addEventListener('activate', event => {
  console.log('🌀 Service Worker activo');
});

// Interceptar solicitudes y responder desde caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});