self.addEventListener('install', async event => {
    console.log('install event')
  });
  
  self.addEventListener('fetch', async event => {
    console.log('fetch event')
  });

  const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './index.html',
  './app.js',
  './sw.js',  
  './manifest.json',
  './assets/css/styles.css',
  './assets/css/gallery.css',
  './assets/audio/tdt.mp3',
  './assets/css/gallery.css',
  './assets/js/formoid.min.js',
  './assets/js/main.js',
  './assets/js/preloader.js',
  './assets/js/scrollreveal.min.js',
  './assets/js/snowstrom.js',
  './assets/img/about.png',
  './assets/img/card1.png',
  './assets/img/card2.png',
  './assets/img/card3.png',
  './assets/img/card4.png',
  './assets/img/favicon.png',
  './assets/img/home.gif',
  './assets/img/product1.png',
  './assets/img/product2.png',
  './assets/img/product3.png',
  './assets/img/product4.png',
  './assets/img/product5.png',
  './assets/img/product6.png',
  './assets/img/logo/logo1.png',
  './assets/img/logo/logo2.png',
  './assets/img/logo/logo3.png',
  './assets/img/logo/logo4.png',
  './assets/img/logo/logo5.png',
  './assets/img/logo/logo6.png',
  './assets/img/logo/logo7.png',
  './assets/img/logo/logo8.png',
  './assets/img/logo/logo9.png',
  './assets/img/logo/logo10.png',
  './assets/img/logo/logo11.png',
  './assets/img/logo/logo12.png',
  './icon-512x512.png',
  './assets/scss/base/_base.scss',
  './assets/scss/components/_about.scss',
  './assets/scss/components/_breakpoints.scss',
  './assets/scss/components/_buttons.scss',
  './assets/scss/components/_contact.scss',
  './assets/scss/components/_footer.scss',
  './assets/scss/components/_header.scss',
  './assets/scss/components/_home.scss',
  './assets/scss/components/_products.scss',
  './assets/scss/components/_questions.scss',
  './assets/scss/components/_scroll.scss',
  './assets/scss/components/_steps.scss',
  './assets/scss/config/_variables.scss',
  './assets/scss/layout/_layout.scss',
  './assets/scss/theme/_theme.scss',
  './assets/scss/styles/_styles.scss',

];

self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
  });

  async function cacheFirst(req) {
    const cache = await caches.open(cacheName); 
    const cachedResponse = await cache.match(req); 
    return cachedResponse || fetch(req); 
  }

  self.addEventListener('fetch', event => {
    const req = event.request;
  
    if (/.*(json)$/.test(req.url)) {
      event.respondWith(networkFirst(req));
    } else {
      event.respondWith(cacheFirst(req));
    }
  });

  async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try { 
      const fresh = await fetch(req);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) { 
      const cachedResponse = await cache.match(req);
      return cachedResponse;
    }
  }

  async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || networkFirst(req);
  }