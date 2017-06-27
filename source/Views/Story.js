import config from '../config.js'
import u from '../utils.js'

export default function (type) {
  return {
    loading: true,
    items: [],
    oninit: function () {
      this.loading = true
      var page = m.route.param('page') || 1
      var url = config.base + type + '?page=' + page
      var self = this
      u.request(url)
      .then(function (items) {
        // u.log('story view', items)
        self.items = items
        self.loading = false
        m.redraw()
      })
    },
    view: function () {
      if (this.loading) {
        return m('.loading')
      }
      return u.items2dom(this.items)
    }
  }
}
