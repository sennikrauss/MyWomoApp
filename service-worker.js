importScripts('/idb.js');

const CACHE_VERSION = 1;
const CURRENT_STATIC_CACHE = 'static-v'+CACHE_VERSION;
const CURRENT_DYNAMIC_CACHE = 'dynamic-v'+CACHE_VERSION;
const STATIC_FILES = [
  "/",
  "/style.css",
  "/script.js",
  "/cards.html",
  "/about-us.html",
  "/idb.js",

];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CURRENT_STATIC_CACHE).then(function(cache) {
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('service worker --> activating ...', event);
  event.waitUntil(
    caches.keys()
      .then( keyList => {
        return Promise.all(keyList.map( key => {
          if(key !== CURRENT_STATIC_CACHE && key !== CURRENT_DYNAMIC_CACHE) {
            console.log('service worker --> old cache removed :', key);
            return caches.delete(key);
          }
        }))
      })
  );
  return self.clients.claim();
})

self.addEventListener('fetch', event => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
   const url = 'http://localhost:4158/backend/cards.php';
  if(event.request.url.indexOf(url) >= 0) {
      event.respondWith(
        fetch(event.request)
          .then(res => {
            const clonedResponse = res.clone();
            clonedResponse.json()
              .then(data => {
                for (let key in data) {
                  writeData("cards", data[key]);
                }
              })
            return res;
          })
      )
      } else {

  event.respondWith(
    caches.match(event.request)
      .then( response => {
        if(response) {
          return response;
        } else {
          return fetch(event.request)
            .then( res => {     // nicht erneut response nehmen, haben wir schon
              return caches.open(CURRENT_DYNAMIC_CACHE)      // neuer, weiterer Cache namens dynamic
                .then( cache => {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            });
        }
      })
  );
 })

)}
