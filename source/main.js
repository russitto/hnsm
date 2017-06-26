var root = document.getElementById('container')
var _l = console.log.bind(console) // eslint-disable-line no-console

redirToHttps()
registerSW()
navActive()

import Story from './Views/Story.js'
import User from './Views/User.js'
import Comments from './Views/Comments.js'

export default {
  router: m.route(root, '/', {
    '/'  : Story('news'),
    '/news/:page'  : Story('news'),
    '/newest/:page': Story('newest'),
    '/ask/:page'   : Story('ask'),
    '/show/:page'  : Story('show'),
    '/jobs/:page'  : Story('jobs'),
    '/user/:user'  : User,
    '/comm/:item'  : Comments,
  })
}

setStyles()

function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        _l('ServiceWorker registration successful with scope: ', registration.scope)
      }, function(err) {
        // registration failed :(
        _l('ServiceWorker registration failed: ', err)
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
    rmClass(this[i], 'active')
  }
  var target = ev.target
  if (!target) {
    return
  }
  var tag = target.tagName.toLowerCase()
  if (tag == 'a') {
    adClass(target.parentNode, 'active')
  }
}

function adClass(el, clas) {
  var actual = el.className.trim()
  if (actual == '') {
    el.className = clas
    return 1
  }
  if (actual == clas) {
    return 0
  }
  if (actual.indexOf(' ' + clas) >= 0 || actual.indexOf(clas + ' ') >= 0) {
    return 0
  }
  el.className += ' ' + clas
  return 1
}

function rmClass(el, clas) {
  var actual = el.className.trim()
  if (actual == '') {
    return 0
  }
  if (actual == clas) {
    el.className = ''
    return 0
  }
  var t = ' ' + clas
  if (actual.indexOf(t) >= 0) {
    el.className = el.className.replace(t, '')
    return 1
  }
  t = clas + ' '
  if (actual.indexOf(t) >= 0) {
    el.className = el.className.replace(t, '')
    return 1
  }
  return 0
}

function setStyles() {
  var s = document.createElement('link')
  s.rel = 'stylesheet'
  s.href = 'https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.2.14/spectre.min.css'
  document.querySelector('head').appendChild(s)
}
