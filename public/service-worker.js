/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.a581fe9caea6488b35753da18c3ebdea.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});

const cacheName = 'dynamic';

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