const CACHE_NAME = 'site-cache-v1';

// install event
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/fallback.html',
        '/favicon.ico',
        // '/skratek/fonts/Lexend-Thin.ttf',
        // '/skratek/img/skratek_prozoren.png',
      ]);
    })
  );
});

// activate event
self.addEventListener('activate', (e) => {
  // clear old cache
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((key) => key === CACHE_NAME || caches.delete(key)))));
});

// fetch event
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return caches.match(evt.request.url).then((cacheRes) => {
          // EXISTS
          if (cacheRes) {
            fetch(evt.request.url).then((fetchRes) => {
              cache.put(evt.request.url, fetchRes);
            });
            return cacheRes;
          } else {
            // DOES NOT EXIST
            return fetch(evt.request).then((fetchRes) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          }
        });
      })
      .catch(() => {
        return caches.match('/fallback.html');
      })
  );
});
