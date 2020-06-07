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

/*
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache
      then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});
*/
// Cache then network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        if (response.ok){
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
// network first
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      console.log("Request listener fetch:::", event.request);
      console.log("Response listener fetch:::", response);
      
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          return caches.open(cacheName).then(cache => {
            cache.put(event.request.url, json);
            return response;
          });
        });
      }
      return caches.open(cacheName).then(cache => {
        cache.put(event.request.url, response.clone());
        return response;
      });
    }).catch(function() {
      return caches.match(event.request.url);
    })  
  );
});
*/
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })  
  );
});
*/
/*
self.addEventListener('fetch', async event => {
  console.log('Fetch intercepted for:', event.request.url);
  console.log('Request::::', event.request);
  event.respondWith(
    fetch(event.request)
      .then(response => {
        try {
          if (response.status == 200){
            return response;
          } else {
            return caches.match(event.request);
          }
        } catch (error){
          return caches.match(event.request);
        }        
      })
      .catch(function(err) {
        return caches.match(event.request);
      })
  );
});*/