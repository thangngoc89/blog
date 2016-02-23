if (
  typeof window !== 'undefined' &&
  typeof window.Waypoints === 'undefined'
) {
  // DANGER >_< Global variable
  require('waypoints/lib/noframework.waypoints.js')
}
