import url from 'url'

export default function (root, cb) {
  root.addEventListener('click', function (ev) {
    if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
      return true
    }

    var anchor = null
    for (var n = ev.target; n.parentNode; n = n.parentNode) {
      if (n.nodeName === 'A') {
        anchor = n
        break
      }
    }
    if (!anchor) return true
    var href = anchor.getAttribute('href')

    // Don't intercerpt anchor
    if (href.startsWith('#')) {
      return true
    }

    var u = url.parse(href)

    if (u.host && u.host !== window.location.host) return true

    ev.preventDefault()

    // var base = window.location.protocol + '//' + window.location.host

    cb(url.resolve(window.location.pathname, u.path) + (u.hash || ''))
    return false
  })
}
