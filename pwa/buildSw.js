// Source: https://github.com/matthewblewitt/pwa-workbox-precache-nuxt

const workboxBuild = require('workbox-build')
/**
 * Transform nuxt page file
 * e.g. /my-page/index.html => /my-page
 */
const htmlTransform = async (manifestEntries) => {
  const manifest = manifestEntries.map((entry) => {
    if (entry.url.endsWith('/index.html')) {
      entry.url = entry.url.substring(0, entry.url.length - 11)
    }
    return entry
  })
  return { manifest, warnings: [] }
}

const buildSW = async () => {
  try {
    const result = await workboxBuild.injectManifest({
      swSrc: './pwa/swSrc.js',
      swDest: './static/sw.js',
      globDirectory: './dist',
      globPatterns: [
        '**/*.{js,css,svg,png,jpg,json,ttf,html,mp4}',
        '**/favicon.ico',
      ],
      globIgnores: ['sw.js'],
      manifestTransforms: [htmlTransform],
      maximumFileSizeToCacheInBytes: 25000000, // 25mb (based on 720p animation file size)
    })
    const { count, size, warnings } = result
    warnings.forEach(console.warn); //eslint-disable-line
    console.log(`${count} files will be precached, totaling ${size/1000000} MB.`); //eslint-disable-line
    // New - Return precache file size and count
    const preCacheDetails = { size: size / 1000000, count }
    return preCacheDetails
    // return count
  } catch (error) {
    console.log(error); //eslint-disable-line
  }
}

// Call buildSW and write result (size of precache) to a json file for us in App
buildSW().then((buildSWResult) => {
  console.log(buildSWResult)
  const fs = require('fs')
  const path = require('path')
  // const preCacheObject = {
  //   PrecacheSize: buildSWResult,
  // }

  // const preCacheSizeString = JSON.stringify(preCacheObject, null, 2)
  const preCacheDetailsJSON = JSON.stringify(buildSWResult, null, 2)
  const filePath = path.join(process.cwd(), '/static/precachedetails.json')

  fs.writeFile(filePath, preCacheDetailsJSON, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Precache json file created successfully')
    }
  })
})
