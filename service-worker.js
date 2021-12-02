importScripts('https://s3-eu-west-1.amazonaws.com/static.wizrocket.com/js/sw_webpush.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
var version = '1599484337';

workbox.setConfig({
  debug: false
});
workbox.core.setCacheNameDetails({
  prefix: 'sw',
  suffix: version,
  precache: 'reliance'
});
self.addEventListener('install', function(event) {
  return self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.endsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('WORKER: activate completed.');
      })
  );
});
workbox.precaching.precacheAndRoute([
  '/noconnection.html',
  '/favicon.ico',
  '/assets/offline/no-connection.png',
], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'js-cache'+version,
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 5,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
workbox.routing.registerRoute(
  // Cache CSS files
  new RegExp('.*\.css'),
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache'+version,
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 5,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:svg)/,
  // Use the cache if it's available
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'image-cache'+version,
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 10,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
self.addEventListener('fetch', function (event) {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  if (event.request.mode === 'navigate') {
    return event.respondWith(
      fetch(event.request).catch(() => caches.match('/noconnection.html'))
    );
  }
});
