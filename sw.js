
// Files to cache
const cacheName = 'thedteam-v1';
const appShellFiles = [
  '/thedteam/',
  '/thedteam/index.html',
  '/thedteam/assets/index.js',
  '/thedteam/assets/css/styles.css',
  '/thedteam/assets/css/gallery.css',
  '/thedteam/assets/js/formoid.min.js',
  '/thedteam/assets/js/main.js',
  '/thedteam/assets/js/preloader.js',
  '/thedteam/assets/js/scrollreveal.min.js',
  '/thedteam/assets/js/snowstorm.js',
  '/thedteam/assets/audio/thedteam.mp3',
  '/thedteam/assets/icons/icon-192.png',
  '/thedteam/assets/img/about.png',
  '/thedteam/assets/img/home.gif',
  '/thedteam/assets/img/product1.png',
  '/thedteam/assets/img/product2.png',
  '/thedteam/assets/img/product3.png',
  '/thedteam/assets/img/product4.png',
  '/thedteam/assets/img/product5.png',
  '/thedteam/assets/img/product6.png',
  '/thedteam/assets/img/card1.png',
  '/thedteam/assets/img/card2.png',
  '/thedteam/assets/img/card3.png',
  '/thedteam/assets/img/card4.png',
  '/thedteam/assets/img/logo/logo1.png',
  '/thedteam/assets/img/logo/logo2.png',
  '/thedteam/assets/img/logo/logo3.png',
  '/thedteam/assets/img/logo/logo4.png',
  '/thedteam/assets/img/logo/logo5.png',
  '/thedteam/assets/img/logo/logo5.png',
  '/thedteam/assets/img/logo/logo6.png',
  '/thedteam/assets/img/logo/logo7.png',
  '/thedteam/assets/img/logo/logo8.png',
  '/thedteam/assets/img/logo/logo9.png',
  '/thedteam/assets/img/logo/logo10.png',
  '/thedteam/assets/img/logo/logo11.png',
  '/thedteam/assets/img/logo/logo12.png',
  '/thedteam/assets/scss',
];


// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
