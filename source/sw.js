var CACHE_NAME = 'cache-v0'
var urlsToCache = [
  'index.html',
  'main.js',
  'ext/spectre.css',
  'ext/mithril.js',
  'img/icon.png',
  'img/icon-256.png',
  'img/icon-128.png',
  'img/icon-64.png',
  'img/icon-32.png',
  'favicon.ico',
  // 'https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.2.14/spectre.min.css',
  // 'https://unpkg.com/mithril@1.1.1/mithril.min.js',
  // 'https://api.hackerwebapp.com/news?page=1',
  // 'https://api.hackerwebapp.com/newest?page=1',
  // 'https://api.hackerwebapp.com/ask?page=1',
  // 'https://api.hackerwebapp.com/show?page=1',
  // 'https://api.hackerwebapp.com/jobs?page=1',
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache') // eslint-disable-line no-console
        return cache.addAll(urlsToCache)
      })
  )
  if (event.registerForeignFetch) {
    event.registerForeignFetch({
      scopes: [self.registration.scope],
      // origins: ['api.hackerwebapp.com', 'unpkg.com', 'cdnjs.cloudflare.com'] // or simply '*' to allow all origins
      origins: ['*'] // or simply '*' to allow all origins
    })
  }
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      }
    )
  )
})

self.addEventListener('foreignfetch', function (event) {
  event.respondWith(fetch(event.request).then(function (response) {
    return {
      response: response,
      origin: event.origin,
      headers: ['Content-Type']
    }
  }))
})
