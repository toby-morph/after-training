export default ({$auth}, inject) => {
  const appUser = {}

  appUser.isLoggedIn = () => {
    return !!($auth && $auth.loggedIn)
  }

  inject('appUser', appUser)
}
