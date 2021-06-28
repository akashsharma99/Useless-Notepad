const CACHE_VERSION = 'v5';
const cacheItems = [
    '/Useless-Notepad/styles.css',
    '/Useless-Notepad/index.html',
    '/Useless-Notepad/app.js',
    '/Useless-Notepad/uselessnotepad.webmanifest',
    '/Useless-Notepad/assets/app-icon-192.png',
    '/Useless-Notepad/assets/app-icon-512.png',
    '/Useless-Notepad/assets/favicon.svg',
    '/Useless-Notepad/assets/dark-icon.svg',
    '/Useless-Notepad/assets/light-icon.svg',
    '/Useless-Notepad/assets/moon.svg',
    '/Useless-Notepad/assets/sun.svg',
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