import config from '../config.js'
import u from '../utils.js'

export default  {
  loading: true,
  user: false,
  oninit: function () {
    this.loading = true
    var user = m.route.param('user')
    var url = config.base + 'user/' + user
    var self = this
    m.request(url)
    .then(function (user) {
      self.user = user
      self.loading = false
    })
  },
  view: function () {
    if (this.loading) {
      return m('.loading')
    }
    u.log(this.user)
    return [
      m('h4', this.user.id),
      m('.karma', 'karma: ' + this.user.karma),
      m('.time', 'created: ' + this.user.created),
      m.trust(this.user.about)
    ]
  }
}
