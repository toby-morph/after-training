export const cookieControl = {
  methods: {
    cookieControlAcceptAll() {
      if (this.$morphCookies) {
        this.$morphCookies.acceptAll()
        this.$store.dispatch('site/setCurrentUserCookiePrefs', true)
      }
      // Only opt in to GA if GA is enabled
      if (JSON.parse(this.$config.GA_Enabled)) {
        // console.log("this.$gtag.optIn()")
        this.$gtag.optIn()
      }
    },
    cookieControlDenyAll() {
      if (this.$morphCookies) {
        this.$morphCookies.denyAll()

        this.$store.dispatch('site/setCurrentUserCookiePrefs', false)
      }
      // Only opt out of GA if GA is enabled
      if (JSON.parse(this.$config.GA_Enabled)) {
        // console.log("this.$gtag.optOut()")
        this.$gtag.optOut()
      }
    },
    showCookieSettingsModal() {
      this.$store.dispatch('site/setCookieSettingsModalShow', true)
    },
    hideCookieSettingsModal() {
      this.$store.dispatch('site/setCookieSettingsModalShow', false)
    },
  },
}
