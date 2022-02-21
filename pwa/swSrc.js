// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js'
// )
console.log('Starting Workbox...')

if (typeof importScripts === 'function') {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
  )

  if (workbox) {
    console.log('Yay - Workbox is loaded')

    workbox.core.skipWaiting()
    workbox.core.clientsClaim()

    // workbox.setConfig({
    //   debug: false,
    // })

    /**
     * Handle a route with and without trailing slash
     * e.g. /about & /about/
     */
    const mapRouteWithTrailingSlash = ({ url }) => {
      const additionalUrlsToCheck = []
      if (url.href.endsWith('/')) {
        const newURL = new URL(url.href)
        newURL.pathname = newURL.pathname.substring(
          0,
          newURL.pathname.length - 1
        )
        additionalUrlsToCheck.push(newURL)
      }
      return additionalUrlsToCheck
    }

    // https://github.com/GoogleChrome/workbox/issues/1663#issuecomment-655696906

    // Your .mp4 file will likely have a WB_REVISION parameter appended to it
    // when stored in the precache. This plugin will normalize the cach key:
    const cacheKeyWillBeUsed = ({ request }) => {
      const url = workbox.precaching.getCacheKeyForURL(request.url)
      return new Request(url, { headers: request.headers })
    }

    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#cached-av
    // In your service worker:
    // It's up to you to either precache or explicitly call cache.add('movie.mp4')
    // to populate the cache.
    //
    // This route will go against the network if there isn't a cache match,
    // but it won't populate the cache at runtime.
    // If there is a cache match, then it will properly serve partial responses.
    // workbox.routing.registerRoute(
    //   ({ url }) => url.pathname.endsWith('.mp4'),
    //   new workbox.strategies.CacheFirst({
    //     cacheName: workbox.core.cacheNames.precache,
    //     plugins: [
    //       new workbox.cacheableResponse.CacheableResponsePlugin({
    //         statuses: [200],
    //       }),
    //       new workbox.rangeRequests.RangeRequestsPlugin(),
    //     ],
    //   })
    // )

    workbox.routing.registerRoute(
      ({ url }) => url.pathname.endsWith('.mp4'),
      new workbox.strategies.CacheFirst({
        cacheName: workbox.core.cacheNames.precache,
        plugins: [
          { cacheKeyWillBeUsed },
          new workbox.rangeRequests.RangeRequestsPlugin(),
        ],
      })
    )

    // const preCacheTotal = 0

    // fetch('precachedetails.json')
    //   .then((x) => x.json())
    //   .then((y) => console.log('Files to precache: ' + y.count))

    /**
     * Precache and ensure files are downloaded and cached before a service worker is installed,
     * workbox-precaching does all of this during the service worker's install event.
     */

    const preacacheManifest = self.__WB_MANIFEST // injected through workbox-build

    let preCacheCount = 0

    // https://stackoverflow.com/questions/65981189/using-stalewhilerevalidate-and-broadcastupdateplugin-from-workbox-how-to-notify
    const myPlugin = {
      cacheWillUpdate: async ({ request, response, event, state }) => {
        // Return `response`, a different `Response` object, or `null`.
        const message = {
          payload: {
            eventType: 'cacheWillUpdate',
            url: request.url,
          },
        }
        // const windows = await self.clients.matchAll({ type: 'window' })
        const windows = await self.clients.matchAll({
          includeUncontrolled: true,
          type: 'window',
        })
        // console.log(windows)
        for (const win of windows) {
          win.postMessage(message)
        }
        return response
      },
      cacheDidUpdate: async ({ cacheName, request }) => {
        preCacheCount++
        const message = {
          payload: {
            eventType: 'cacheDidUpdate',
            cacheName,
            preCacheCount,
            url: request.url,
          },
        }
        // const windows = await self.clients.matchAll({ type: 'window' })
        const windows = await self.clients.matchAll({
          includeUncontrolled: true,
          type: 'window',
        })
        // console.log(windows)
        for (const win of windows) {
          win.postMessage(message)
        }
      },
    }

    workbox.precaching.addPlugins([myPlugin])
    // workbox.precaching.cleanupOutdatedCaches()

    workbox.precaching.precacheAndRoute(preacacheManifest, {
      // cacheId: 'wfp-fms-web',
      urlManipulation: mapRouteWithTrailingSlash,
    })
    console.log('Done')
  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}
