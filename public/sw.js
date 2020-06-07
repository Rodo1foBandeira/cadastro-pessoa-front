const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'favicon.ico',
  'index.html',
  'logo192.png',
  'logo512.png'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })  
  );
});