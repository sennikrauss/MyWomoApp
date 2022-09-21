importScripts('/idb.js');
importScripts('/indexedDB.js');

const CACHE_VERSION = 2;
const DOMAIN_BACKEND = 'http://localhost:4201/backend';
const CURRENT_STATIC_CACHE = 'static-v'+CACHE_VERSION;
const CURRENT_DYNAMIC_CACHE = 'dynamic-v'+CACHE_VERSION;
const STATIC_FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/cards.html",
  "/about-us.html",
  "/app.js",
  "/fillCards.js",
  "/login.html",
  "/login-signin.js",
  "/search.js",
  "/403-page.html",
  "/idb.js",
  "/indexedDB.js",
  "/form.html",
  "/js/chooseLocation.js",
  "/js/handleFormData.js",
  "/json/countries.json"
].map(url => new Request(url, {credentials: 'include'}));

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CURRENT_STATIC_CACHE).then( cache => {
      cache.addAll(STATIC_FILES);
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
  const url = DOMAIN_BACKEND + "/cards.php";
  if (event.request.url.indexOf(url) >= 0) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clonedResponse = res.clone();
          clonedResponse.json()
            .then(data => {
              if(Array.isArray(data)){
                for (let key in data) {
                  writeData("cards", data[key]);
                }
              }else {
                writeData("cards", data)
              }
            })
          return res;
        })
    )
  } else {

    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(res => {     // nicht erneut response nehmen, haben wir schon
                return caches.open(CURRENT_DYNAMIC_CACHE)      // neuer, weiterer Cache namens dynamic
                  .then(cache => {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              });
          }
        })
    )
  }
})

self.addEventListener('sync', event => {
  console.log('service worker --> background syncing ...', event);
  if(event.tag === 'sync-new-card') {
    console.log('service worker --> syncing new posts ...');
    event.waitUntil(
      readAllData('sync-cards')
        .then( dataArray => {
          for(let data of dataArray) {
            console.log('data from IndexedDB', data);
            const formData = new FormData();
            for (let key in data) {
              formData.append(key, data[key]);
            }
            fetch(DOMAIN_BACKEND + "/addCard.php", {
              method: 'POST',
              body: formData
            }).then( response => {
                return response.text();
            }).then(result => {
              if (result === "successfully inserted data"){
                console.log('Data sent to backend ...', result);
                deleteOneData('sync-cards', data._id)
              }
            }).catch( err => {
              console.log('Error while sending data to backend ...', err);
            })
          }
        })
    );
  }
})
