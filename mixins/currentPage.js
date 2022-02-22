export const currentPage = {
  computed: {
    isHome() {
      return this.$route.path === '/'
    },
    isThankyou() {
      return this.$route.path === '/thankyou'
    },
    isStep() {
      return 'step' in this.$route.params && this.$route.path !== '/steps/0'
    },
    isVersionLanding() {
      return this.$route.path === '/'
    },
    isGetStarted() {
      return this.$route.path.includes('/get-started')
    },
    isInfoPage() {
      const infoPageRoutes = ['/privacy', '/accessibility', '/cookies', '/settings']
      const isInfoPage = infoPageRoutes.find(
        (route) => route === this.$route.path
      )
      return !!isInfoPage
    },
  },
}
