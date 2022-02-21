export default function (to, from, savedPosition) {
  // if in fullscreen mode, scroll top on root document, not window object
  if (document.fullscreenElement || document.webkitCurrentFullScreenElement) {
    const fullScreenRootElement =
      document.fullscreenElement || document.webkitCurrentFullScreenElement
    fullScreenRootElement.scrollTop = 0
  }
  document.getElementById('appContent').scrollTop = 0
  return { x: 0, y: 0 }
}
