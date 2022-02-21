export default ({ app, $config }, inject) => {
  let morphCookies = false
  if (JSON.parse($config.cookieControlEnabled)) {
    morphCookies = {
      acceptAll() {
        localStorage.setItem('GDPR:accepted', true)
      },
      denyAll() {
        localStorage.setItem('GDPR:accepted', false)
      },
      cookiePrefsSet() {
        return 'GDPR:accepted' in localStorage
      },
      getGDPR() {
        return JSON.parse(localStorage.getItem('GDPR:accepted'))
      },
    }
  }

  inject('morphCookies', morphCookies)
}
