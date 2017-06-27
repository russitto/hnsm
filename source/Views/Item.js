import config from '../config.js'
import u from '../utils.js'

export default {
  loading: true,
  item: false,
  oninit: function () {
    this.loading = true
    var id = m.route.param('id')
    var url = config.base + 'item/' + id
    var self = this
    u.request({url: url, cache: false})
    .then(function (it) {
      self.item = it
      self.loading = false
    })
  },
  view: function () {
    if (this.loading) {
      return m('.loading')
    }
    var elDom = [
      m('h4', this.item.title),
    ]
    if (this.item.url.indexOf('item?') != 0) {
      elDom.push(m('.url', m('a[rel=noopener][target=_blank][href=' + this.item.url + ']', this.item.url)))
    }
    elDom.push(m('.stats', this.item.time_ago + ' by ' + this.item.user))
    elDom.push(m('h5', 'Comments'))
    elDom.push(u.comms2dom(this.item.comments))
    return elDom
  }
}

