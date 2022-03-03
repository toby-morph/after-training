import siteData from '@/content/site.json'
import sitePreCacheDetails from '@/static/precachedetails.json'

export const state = () => ({
  logo: siteData.site_logo,
  fullScreen: false,
  fullScreenEnabled: false,
  exitedFullScreen: false,
  scrolledToBottom: false,
  currentPageTitle: 'Welcome',
  navIsOpen: false,
  tooltipIsOpen: false,
  disabledLinkClicked: null,
  deviceOfflineEnabled: false,
  deviceUserResetEnabled: false,
  hasRefreshed: false,
  cacheRefreshedDate: null,
  cookieNotice: {
    currentUserCookiePrefs: null,
    cookieNoticeShow: false,
    text: siteData.cookie_control.cookie_notice_text,
    cookieSettingsModalShow: false,
    nonNecessaryCookies: siteData.cookie_control.non_necessary_cookies_used,
    modalTitle: siteData.cookie_control.cookie_modal_title,
    modalText: siteData.cookie_control.cookie_modal_text,
  },
  siteDetails: {
    siteName: siteData.site_details.site_name,
    siteUrl: siteData.site_details.site_url,
    siteStrapline: siteData.site_details.site_strapline,
    organisationName: siteData.site_details.organisation_name,
    audience: siteData.site_details.audience,
  },
  parentSiteDetails: {
    siteName: siteData.parent_site_details.site_name,
    siteUrl: siteData.parent_site_details.site_url,
  },
  isMultiVersion: false,
  preCacheSize: sitePreCacheDetails.size,
  preCacheTotalCount: sitePreCacheDetails.count,
  preCacheCurrentCount: null,
  trialSites: [],
  videos: [],
})

export const getters = {
  getParentSite: (state) => {
    return state.parentSite
  },
  getPreCacheSize: (state) => {
    return state.preCacheSize
  },
  getPreCacheTotalCount: (state) => {
    return state.preCacheTotalCount
  },
  getPreCacheCurrentCount: (state) => {
    return state.preCacheCurrentCount
  },
}

export const mutations = {
  SET_FULL_SCREEN: (state, fullScreen) => {
    state.fullScreen = fullScreen
  },
  SET_FULL_SCREEN_ENABLED: (state, fullScreenEnabled) => {
    state.fullScreenEnabled = fullScreenEnabled
  },
  SET_EXITED_FULL_SCREEN: (state, exitedFullScreen) => {
    state.exitedFullScreen = exitedFullScreen
  },
  SET_SCROLLED_TO_BOTTOM: (state, scrolledToBottom) => {
    state.scrolledToBottom = scrolledToBottom
  },
  SET_CURRENT_PAGE_TITLE: (state, currentPageTitle) => {
    state.currentPageTitle = currentPageTitle
  },
  SET_MENU_IS_OPEN: (state, navIsOpen) => {
    state.navIsOpen = navIsOpen
  },
  SET_TOOLTIP_IS_OPEN: (state, tooltipIsOpen) => {
    state.tooltipIsOpen = tooltipIsOpen
  },
  SET_DISABLED_LINK_CLICKED: (state, disabledLinkClicked) => {
    state.disabledLinkClicked = disabledLinkClicked
  },
  SET_DEVICE_OFFLINE_ENABLED: (state, deviceOfflineEnabled) => {
    state.deviceOfflineEnabled = deviceOfflineEnabled
  },
  SET_DEVICE_USER_RESET_ENABLED: (state, deviceUserResetEnabled) => {
    state.deviceUserResetEnabled = deviceUserResetEnabled
  },
  SET_HAS_REFRESHED: (state, hasRefreshed) => {
    state.hasRefreshed = hasRefreshed
  },
  SET_CACHE_REFRESHED_DATE: (state, cacheRefreshedDate) => {
    state.cacheRefreshedDate = cacheRefreshedDate
  },
  SET_COOKIE_NOTICE_SHOW: (state, cookieNoticeShow) => {
    state.cookieNotice.cookieNoticeShow = cookieNoticeShow
  },
  SET_COOKIE_SETTINGS_MODAL_SHOW: (state, cookieSettingsModalShow) => {
    state.cookieNotice.cookieSettingsModalShow = cookieSettingsModalShow
  },
  SET_CURRENT_USER_COOKIE_PREFS: (state, currentUserCookiePrefs) => {
    state.cookieNotice.currentUserCookiePrefs = currentUserCookiePrefs
  },
  SET_IS_MULTI_VERSION: (state, isMultiVersion) => {
    state.isMultiVersion = isMultiVersion
  },
  SET_PRECACHE_TOTAL_COUNT: (state, preCacheTotalCount) => {
    state.preCacheTotalCount = preCacheTotalCount
  },
  SET_PRECACHE_CURRENT_COUNT: (state, preCacheCurrentCount) => {
    state.preCacheCurrentCount = preCacheCurrentCount
  },
  SET_TRIAL_SITES: (state, trialSites) => {
    state.trialSites = trialSites
  },
  SET_VIDEO_PROGRESS: (state, videoProgress) => {
    state.videos.push (videoProgress)
  },
  UPDATE_VIDEO_PROGRESS: (state, {videoIndex, videoCurrentProgress}) => {
    state.videos[videoIndex].videoProgress = videoCurrentProgress;
  }, 
}

export const actions = {
  setScrolledToBottom({ commit }, scrolledToBottom) {
    commit('SET_SCROLLED_TO_BOTTOM', scrolledToBottom)
  },
  setFullScreen({ commit }, fullScreen) {
    commit('SET_FULL_SCREEN', fullScreen)
  },
  setFullScreenEnabled({ commit }, fullScreenEnabled) {
    commit('SET_FULL_SCREEN_ENABLED', fullScreenEnabled)
  },
  setExitedFullScreen({ commit }, exitedFullScreen) {
    commit('SET_EXITED_FULL_SCREEN', exitedFullScreen)
  },
  setCurrentPageTitle({ commit }, currentPageTitle) {
    commit('SET_CURRENT_PAGE_TITLE', currentPageTitle)
  },
  setMenuIsOpen({ commit }, navIsOpen) {
    commit('SET_MENU_IS_OPEN', navIsOpen)
  },
  setTooltipIsOpen({ commit }, tooltipIsOpen) {
    commit('SET_TOOLTIP_IS_OPEN', tooltipIsOpen)
  },
  setDisabledLinkClicked({ commit }, disabledLinkClicked) {
    commit('SET_DISABLED_LINK_CLICKED', disabledLinkClicked)
  },
  setDeviceOfflineEnabled({ commit }, deviceOfflineEnabled) {
    commit('SET_DEVICE_OFFLINE_ENABLED', deviceOfflineEnabled)
  },
  setDeviceUserResetEnabled({ commit }, deviceUserResetEnabled) {
    commit('SET_DEVICE_USER_RESET_ENABLED', deviceUserResetEnabled)
  },
  setHasRefreshed({ commit }, hasRefreshed) {
    commit('SET_HAS_REFRESHED', hasRefreshed)
  },
  setCacheRefreshedDate({ commit }, cacheRefreshedDate) {
    commit('SET_CACHE_REFRESHED_DATE', cacheRefreshedDate)
  },
  setCookieSettingsModalShow({ commit }, cookieSettingsModalShow) {
    commit('SET_COOKIE_SETTINGS_MODAL_SHOW', cookieSettingsModalShow)
  },
  setCookieNoticeShow({ commit }, cookieNoticeShow) {
    commit('SET_COOKIE_NOTICE_SHOW', cookieNoticeShow)
  },
  setCurrentUserCookiePrefs({ commit }, currentUserCookiePrefs) {
    commit('SET_CURRENT_USER_COOKIE_PREFS', currentUserCookiePrefs)
  },
  setIsMultiVersion({ commit }, isMultiVersion) {
    commit('SET_IS_MULTI_VERSION', isMultiVersion)
  },
  setPreCacheTotalCount({ commit }, preCacheTotalCount) {
    commit('SET_PRECACHE_TOTAL_COUNT', preCacheTotalCount)
  },
  setPreCacheCurrentCount({ commit }, preCacheCurrentCount) {
    commit('SET_PRECACHE_CURRENT_COUNT', preCacheCurrentCount)
  },
  async setTrialSites({ commit, state }) {
    try {
      const trialSites = await this.$axios.get(
        this.$config.siteUrl + '/.netlify/functions/get-trial-sites'
      )
      commit('SET_TRIAL_SITES', trialSites.data)
      return true
    } catch (err) {
      return false
    }
  },
  setVideoProgress({ commit }, videoProgress) {
    commit('SET_VIDEO_PROGRESS', videoProgress)
  },
  updateVideoProgress({ commit }, {videoIndex, videoCurrentProgress}) {
    commit('UPDATE_VIDEO_PROGRESS', {videoIndex, videoCurrentProgress})
  },
}
