export default ({ isDev, store, $config }) => {
  if (
    'serviceWorker' in navigator &&
    !isDev &&
    JSON.parse($config.offlineEnabled) &&
    store.state.site.deviceOfflineEnabled
  ) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/sw.js')
        console.log('Registered SW')
      } catch (error) {
        console.log(error)
      }
    })
  }
}
