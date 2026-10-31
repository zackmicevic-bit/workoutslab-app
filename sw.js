const CACHE_NAME = 'lux-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './bg/bg-01.jpg', './bg/bg-02.jpg', './bg/bg-03.jpg', './bg/bg-04.jpg',
  './bg/bg-05.jpg', './bg/bg-06.jpg', './bg/bg-07.jpg', './bg/bg-08.jpg',
  './bg/bg-09.jpg', './bg/bg-10.jpg', './bg/bg-11.jpg', './bg/bg-12.jpg',
  './bg/bg-13.jpg', './bg/bg-14.jpg', './bg/bg-15.jpg', './bg/bg-16.jpg',
  './bg/bg-17.jpg', './bg/bg-18.jpg', './bg/bg-19.jpg', './bg/bg-20.jpg',
  './bg/bg-21.jpg', './bg/bg-22.jpg', './bg/bg-23.jpg', './bg/bg-24.jpg',
  './bg/bg-25.jpg', './bg/bg-26.jpg', './bg/bg-27.jpg', './bg/bg-28.jpg',
  './bg/bg-29.jpg', './bg/bg-30.jpg', './bg/bg-31.jpg', './bg/bg-32.jpg',
  './bg/bg-33.jpg',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
