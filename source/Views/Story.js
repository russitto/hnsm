import config from '../config.js'

var pageSize = 20

export default function (type) {
  return {
    loading: true,
    items: [],
    oninit: function (vnode) {
      this.loading = true
      var page = m.route.param('page') || 1
      var url = config.base + type + '?page=' + page
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
      // use the for padawan to go fasta
      var ret = []
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i]
        ret.push(m('h4', m('a[href=' + item.url + '][target=_blank][rel=noopener]', item.title)))
      }
      return ret
    }
  }
}
