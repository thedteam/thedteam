const staticTheDTeam = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/assets/css/style.css",
  "/assets/js/app.js",
  "/assets/index.js",
  "/assets/css/styles.css",
  "/assets/css/gallery.css",
  "/assets/js/formoid.min.js",
  "/assets/js/main.js",
  "/assets/js/preloader.js",
  "/assets/js/scrollreveal.min.js",
  "/assets/js/snowstorm.js",
  "/assets/audio/thedteam.mp3",
  "/assets/icons/icon-192x192.png",
  "/assets/img/about.png",
  "/assets/img/home.gif",
  "/assets/img/product1.png",
  "/assets/img/product2.png",
  "/assets/img/product3.png",
  "/assets/img/product4.png",
  "/assets/img/product5.png",
  "/assets/img/product6.png",
  "/assets/img/card1.png",
  "/assets/img/card2.png",
  "/assets/img/card3.png",
  "/assets/img/card4.png",
  "/assets/img/logo/logo1.png",
  "/assets/img/logo/logo2.png",
  "/assets/img/logo/logo3.png",
  "/assets/img/logo/logo4.png",
  "/assets/img/logo/logo5.png",
  "/assets/img/logo/logo5.png",
  "/assets/img/logo/logo6.png",
  "/assets/img/logo/logo7.png",
  "/assets/img/logo/logo8.png",
  "/assets/img/logo/logo9.png",
  "/assets/img/logo/logo10.png",
  "/assets/img/logo/logo11.png",
  "/assets/img/logo/logo12.png",
  "/assets/scss",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticTheDTeam).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})