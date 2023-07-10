/* eslint-disable array-callback-return */
// cache: storage of the browser: if i load something once, don't need to reload image everytime i go online, it is taken from the cache, faster and more effective
const CACHENAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];
//'this' is the service worker itself
//offline.html is the page shown when the app has no internet connection

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  //tells the browser that work is going on until the promise is resolved and that it shouldnt terminate the service worker
  event.waitUntil(
    //open the cache and add the files to the cache
    //takes the array if string URLS and adds them to the cache
    caches.open(CACHENAME).then((cache) => {
      console.log('Opened cache');

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.waitUntil(
    self.registration
      .showNotification('Hello', {
        body: 'Hello from daygrade',
      })
      .catch((error) => {
        console.error('Failed to show notification:', error);
      })
  );

  //respond with something when we notice a fetch request
  event.respondWith(
    caches.match(event.request).then(async () => {
      try {
        return await fetch(event.request);
      } catch {
        return await caches.match('offline.html');
      }
    })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHENAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
