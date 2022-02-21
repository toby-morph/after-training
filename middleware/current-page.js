export default function ({ store, route }) {
  let currentPageTitle = ''
  switch (route.path) {
    case '/privacy':
      currentPageTitle = 'Privacy policy'
      break
    case '/cookies':
      currentPageTitle = 'Cookie policy'
      break
    case '/accessibility':
      currentPageTitle = 'Accessibility statement'
      break
    case '/settings':
      currentPageTitle = 'Settings'
      break
    default:
      currentPageTitle = 'Welcome to ' + store.state.site.siteDetails.siteName
  }
  // may be over-ridden in page mounted method - e.g. steps.vue`
  store.dispatch('site/setCurrentPageTitle', currentPageTitle)
}
