export const cookieControl = {
  methods: {
    cookieControlAcceptAll() {
      if (this.$morphCookies) {
        this.$morphCookies.acceptAll()
        this.$store.dispatch('site/setCurrentUserCookiePrefs', true)
      }
      this.$gtag.optIn()
    },
    cookieControlDenyAll() {
      if (this.$morphCookies) {
        this.$morphCookies.denyAll()

        this.$store.dispatch('site/setCurrentUserCookiePrefs', false)
      }
      this.$gtag.optOut()
    },
    showCookieSettingsModal() {
      this.$store.dispatch('site/setCookieSettingsModalShow', true)
    },
    hideCookieSettingsModal() {
      this.$store.dispatch('site/setCookieSettingsModalShow', false)
    },
  },
}
