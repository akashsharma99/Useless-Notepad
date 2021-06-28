const CACHE_VERSION = 'v5';
const cacheItems = [
    '/styles.css',
    '/index.html',
    '/app.js',
    '/uselessnotepad.webmanifest',
    '/assets/app-icon-192.png',
    '/assets/app-icon-512.png',
    '/assets/favicon.svg',
    '/assets/dark-icon.svg',
    '/assets/light-icon.svg',
    '/assets/moon.svg',
    '/assets/sun.svg',
]
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            return cache.addAll(cacheItems);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((resp) => {
            return resp || fetch(event.request).then((response) => {
                return caches.open(CACHE_VERSION).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
self.addEventListener('activate', (event) => {
    var cacheKeeplist = [CACHE_VERSION];
  
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });