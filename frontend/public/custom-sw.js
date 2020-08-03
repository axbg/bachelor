const cacheVersion = 1;
const currentCache = {
  offline: 'offline-cache-' + cacheVersion,
};
const offlineUrl = 'offline.html';

self.addEventListener('push', (e) => {
  const title = e.data.json().title;
  const content = e.data.json().content;
  self.registration.showNotification(title, {
    body: content,
    icon: 'https://banner2.kisspng.com/20171217/8a2/envelope-png-5a3744625f6bf9.6827994515135714263909.jpg',
    tag: '1',
    data: 'Hello there',
  });
});

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(currentCache.offline).then(function(cache) {
        return cache.addAll([
          './logo_transparent.png',
          './password.png',
          './notifications.png',
          './background.png',
          offlineUrl,
        ]);
      }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' ||
    (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
        fetch(event.request.url).catch((error) => {
          return caches.match(offlineUrl);
        }),
    );
  } else {
    event.respondWith(caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        }),
    );
  }
});
