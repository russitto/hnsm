var log = console.log.bind(console) // eslint-disable-line no-console

export default {
  items2dom: items2dom,
  comms2dom: comms2dom,
  adClass: adClass,
  rmClass: rmClass,
  log: log
}

function items2dom(items) {
  var ret = []
  // use the for young padawan to go faster
  for (var i = 0, l = items.length; i < l; i++) {
    var item = items[i]
    var title = item.title
    if (item.domain) {
      title += ' (' + item.domain + ')'
    }

    var subline = []
    if (item.points !== null) {
      subline.push(m('span.badge[data-badge=' + item.points + ']', 'Points'))
    }
    subline.push(m('span.badge[data-badge=' + item.comments_count + ']',
      m('a[href=#!/item/' + item.id + ']', 'Comments')))
    if (item.user) {
      subline.push(m('span.user', m('a[href=#!/user/' + item.user + ']', 'by ' + item.user)))
    }
    subline.push(m('span.time', item.time_ago))
    var columns = []
    for (var j = 0, ll = subline.length; j < ll; j++) {
      columns.push(m('.column.col-' + (12/ll), subline[j]))
    }

    var st = m('.news-item', [
      m('h5',
        m('a[href=' + item.url + '][target=_blank][rel=noopener]', title)),
      m('.columns', columns),
      m('.divider')
    ])
    ret.push(st)
  }
  return ret
}

function comms2dom(comms) {
  var ret = []
  // use the for young padawan to go faster
  for (var i = 0, l = comms.length; i < l; i++) {
    var comm = comms[i]
    var content = comm.content
    var elDom = [
      m.trust(content),
      m('.stats', comm.time_ago + ' by ' + comm.user)
    ]
    if (comm.comments.length) {
      elDom.push(comms2dom(comm.comments))
    }
    if (comm.level == 0) {
      elDom.push(m('.divider'))
    }
    ret.push(m('.comment[style=margin-left: ' + (comm.level*2) + 'rem]', elDom))
  }
  return ret
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
