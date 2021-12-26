// (A) FILES TO CACHE
const cName = "demo-tdt",
cFiles = [
  "index.html",
  "style.css",
  "main.js",
  "assets/css/styles.css",
  "assets/css/gallery.css",
  "assets/audio/tdt.mp3",
  "assets/css/gallery.css",
  "assets/js/formoid.min.js",
  "assets/js/main.js",
  "assets/js/preloader.js",
  "assets/js/scrollreveal.min.js",
  "assets/js/snowstrom.js",
  "assets/img/about.png",
  "assets/img/card1.png",
  "assets/img/card2.png",
  "assets/img/card3.png",
  "assets/img/card4.png",
  "assets/img/favicon.png",
  "assets/img/home.gif",
  "assets/img/product1.png",
  "assets/img/product2.png",
  "assets/img/product3.png",
  "assets/img/product4.png",
  "assets/img/product5.png",
  "assets/img/product6.png",
  "assets/img/logo/logo1.png",
  "assets/img/logo/logo2.png",
  "assets/img/logo/logo3.png",
  "assets/img/logo/logo4.png",
  "assets/img/logo/logo5.png",
  "assets/img/logo/logo6.png",
  "assets/img/logo/logo7.png",
  "assets/img/logo/logo8.png",
  "assets/img/logo/logo9.png",
  "assets/img/logo/logo10.png",
  "assets/img/logo/logo11.png",
  "assets/img/logo/logo12.png",
  "assets/img/movil-app.png",
  "assets/img/app1.png",
  "assets/img/app2.png",
  "assets/img/google/google_review.png",
  "assets/img/google/google1.png",
  "assets/img/google/google2.png",
  "assets/img/google/google3.png",
  "favicon.png",
  "assets/scss/base/_base.scss",
  "assets/scss/components/_about.scss",
  "assets/scss/components/_breakpoints.scss",
  "assets/scss/components/_buttons.scss",
  "assets/scss/components/_contact.scss",
  "assets/scss/components/_footer.scss",
  "assets/scss/components/_header.scss",
  "assets/scss/components/_home.scss",
  "assets/scss/components/_products.scss",
  "assets/scss/components/_questions.scss",
  "assets/scss/components/_scroll.scss",
  "assets/scss/components/_steps.scss",
  "assets/scss/config/_variables.scss",
  "assets/scss/layout/_layout.scss",
  "assets/scss/theme/_theme.scss",
  "assets/scss/styles/_styles.scss"

];

// (B) CREATE/INSTALL CACHE
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cName)
    .then((cache) => { return cache.addAll(cFiles); })
    .catch((err) => { console.error(err) })
  );
});

// (C) CACHE STRATEGY
self.addEventListener("fetch", (evt) => {
  // (C1) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
  event.respondWith(
    caches.match(evt.request)
    .then((res) => { return res || fetch(evt.request); })
  );

  /* (C2) LOAD WITH NETWORK FIRST, FALLBACK TO CACHE IF OFFLINE
  evt.respondWith(
    fetch(evt.request)
    .catch(() => { return caches.match(evt.request); })
  );*/
});
