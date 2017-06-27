var root = document.getElementById('container')
redirToHttps()
registerSW()
navActive()

import Story from './Views/Story.js'
import User from './Views/User.js'
import Item from './Views/Item.js'
import u from './utils.js'

export default {
  router: m.route(root, '/', {
    '/'  : Story('news'),
    '/news/:page'  : Story('news'),
    '/newest/:page': Story('newest'),
    '/ask/:page'   : Story('ask'),
    '/show/:page'  : Story('show'),
    '/jobs/:page'  : Story('jobs'),
    '/user/:user'  : User,
    '/item/:id'    : Item
  })
}

// setStyles()

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        u.log('ServiceWorker registration successful with scope: ', registration.scope)
      }, function(err) {
        // registration failed :(
        u.log('ServiceWorker registration failed: ', err)
      })
    })
  }
}

function redirToHttps() {
  var host = location.hostname
  if (host == 'localhost' || host.match(/\.localhost$/)) {
    return 0
  }
  if (location.protocol == 'https:') {
    return 0
  }
  var href = location.href.replace(/^http:/, 'https:')
  location.href = href
}

function navActive() {
  var nav = document.getElementById('navigation')
  nav.style.marginTop = 0
  var theme = document.querySelector('head meta[name=theme-color]')
  var tColor
  if (theme) {
    tColor = theme.getAttribute('content')
    if (tColor) {
      nav.style.backgroundColor = tColor
    }
  }

  var items = nav.querySelectorAll('.tab-item')
  nav.addEventListener('click', navActiveToggle.bind(items))
  var link = location.hash.substr(3).replace(/\/.*/, '')
  if (link == '') {
    link = 'news'
  }
  var actual = nav.querySelector('a[data-link=' + link + ']')
  navActiveToggle.call(items, {target: actual})
}

function navActiveToggle(ev) {
  for (var i = 0, l = this.length; i < l; i++) {
    u.rmClass(this[i], 'active')
  }
  var target = ev.target
  if (!target) {
    return
  }
  var tag = target.tagName.toLowerCase()
  if (tag == 'a') {
    u.adClass(target.parentNode, 'active')
  }
}

function setStyles() {
  var s = document.createElement('link')
  s.rel = 'stylesheet'
  // s.href = 'https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.2.14/spectre.min.css'
  s.href = 'ext/spectre.css'
  document.querySelector('head').appendChild(s)
}
