var root = document.getElementById('container')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

import Story from './Views/Story.js'

export default {
  router: m.route(root, '/', {
    '/'  : Story('news'),
    '/news/:page'  : Story('news'),
    '/newest/:page': Story('newest'),
    '/ask/:page'   : Story('ask'),
    '/show/:page'  : Story('show'),
    '/jobs/:page'  : Story('jobs'),
  })
}
