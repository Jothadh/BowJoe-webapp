// This service worker intentionally does NOT cache anything yet.
// Its job right now is just to make sure updates always show up immediately,
// instead of iOS holding on to an old copy of the app.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // For the HTML page itself, force a real network fetch every time
  // (cache: 'no-store' bypasses any HTTP cache along the way).
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
  }
});
