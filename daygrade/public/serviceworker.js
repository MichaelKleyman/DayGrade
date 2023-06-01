// cache: storage of the browser: if i load something once, dont need to reload image everytime i go online, it is taken from the cache, faster and more effective
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
  //respond with something when we notice a fetch request
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
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

// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint16Array(rawData.length);

//   for (let i = 0; i < rawData.length; i++) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// function determineAppServerKey() {
//   const vapidPublicKey = '';
//   return urlBase64ToUint8Array(vapidPublicKey);
// }
