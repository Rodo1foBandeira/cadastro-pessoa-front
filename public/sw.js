const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'favicon.ico',
  'index.html',
  'logo192.png',
  'logo512.png'
];

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

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

// Cache then network
self.addEventListener('fetch', function(event) {
  console.log("Request fetch interceptor::::::", event.request);
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        if (response.ok){
          console.log("REsponse fetch interceptor::::::", response);
          cache.put(event.request, response.clone());
          return response;
        }
        return caches.match(event.request);
      }).catch(function() {
        return caches.match(event.request);
      });
    })
  );
});

/* Network first
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      console.log("Request listener fetch:::", event.request);
      console.log("Response listener fetch:::", response);
      if (response.ok){
        return caches.open(cacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      }
      return caches.match(event.request.url);
    }).catch(function() {
      return caches.match(event.request.url);
    })  
  );
});
*/

/*
// On network response
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
*/