// http://kipalog.com/posts/Trick--nho-de-lay-screen-size-voi-javascript-va-css

export default function getSize () {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.getComputedStyle(document.body, '::before')
    .getPropertyValue('content')
    .replace(/["']/g, '')
}
