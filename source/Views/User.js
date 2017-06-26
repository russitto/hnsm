import config from '../config.js'
import u from '../utils.js'

export default  {
  loading: true,
  items: [],
  oninit: function () {
    this.loading = true
    var user = m.route.param('user')
    var url = config.base + 'user/' + user
    var self = this
    m.request(url)
    .then(function (items) {
      self.items = items
      self.loading = false
    })
  },
  view: function () {
    if (this.loading) {
      return m('.loading')
    }
    return u.items2dom(this.items)
  }
}
