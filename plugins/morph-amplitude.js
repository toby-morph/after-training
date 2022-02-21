const amplitude = require('amplitude-js')

export default ({ app, $config }, inject) => {
  // only load amplitude SDK if enabled on this site
  // let morphAmplitude = {
  //   morphLogEvent: () => {},
  //   enableTracking: () => {},
  //   setOptOut: () => {},
  // }

  let morphAmplitude = false
  if (JSON.parse($config.GAEnabled)) {
    const defaultConfig = {
      apiKey: $config.amplitudeApiKey,
      userId: null,
      saveEvents: true,
      trackingOptions: { ip_address: false },
      // config: {
      //   deferInitialization: true,
      // },
    }
    morphAmplitude = amplitude

    morphAmplitude
      .getInstance()
      .init(defaultConfig.apiKey, defaultConfig.userId, defaultConfig.config)

    // wrapper for amplitude's logEvent method
    morphAmplitude.morphLogEvent = (eventText, eventProperty) => {
      if (eventProperty) {
        morphAmplitude.getInstance().logEvent(eventText, {
          propery: eventProperty,
        })
      } else {
        morphAmplitude.getInstance().logEvent(eventText)
      }
    }

    morphAmplitude.enableTracking = () => {
      morphAmplitude.getInstance().enableTracking()
    }

    morphAmplitude.setOptOut = (optOut) => {
      morphAmplitude.getInstance().setOptOut(optOut)
    }

    morphAmplitude.resetUser = () => {
      morphAmplitude.getInstance().setUserId(null) // not string 'null'
      morphAmplitude.getInstance().regenerateDeviceId()
    }
  }

  // makes this.$morphAmplitude available for use around the app
  // this is an instance of the amplitude sdk with the addition of custom methods to handle optional installation and logging of events
  inject('morphAmplitude', morphAmplitude)
}
