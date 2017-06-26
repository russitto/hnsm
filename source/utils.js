export default {
  items2dom: items2dom
}

function items2dom(items) {
  var ret = []
  // use the for young padawan to go faster
  for (var i = 0, l = items.length; i < l; i++) {
    var item = items[i]
    var comm = '#!/comments/' + item.id
    var title = item.title
    if (item.domain) {
      title += ' (' + item.domain + ')'
    }
    var points = m('span.badge[data-badge=' + item.points + ']', 'Points')
    if (item.points === null) {
      points = ''
    }
    var st = [
      m('h5',
        m('a[href=' + item.url + '][target=_blank][rel=noopener]', title)),
      m('.columns', [
        m('.column.col-3', points),
        m('.column.col-3',
          m('span.badge[data-badge=' + item.comments_count + ']', m('a[href=' + comm + ']', 'Comments'))),
        m('.column.col-3',
          // m('span.user', m('a[href=#!/user/' + item.user + ']', 'by ' + item.user))),
          m('span.user', 'by ' + item.user)),
        m('.column.col-3',
          m('span.time', item.time_ago)),
      ]),
      m('.divider')
    ]
    ret.push(st)
  }
  return ret
}
