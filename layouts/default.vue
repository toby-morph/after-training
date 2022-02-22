<template>
  <div
    id="appLayout"
    class="bg-grey-light relative"
    :class="showPitFooter ? 'has-footer' : ''"
    tabindex="-1"
  >
    <div id="appContent" class="flex flex-col">
      <!-- https://github.com/vue-a11y/vue-skip-to -->
      <LibSkipTo to="main" label="Skip to main content" />
      <UserPreNav />
      <!-- <PitMultiVersionPreNav v-if="isMultiVersion" /> -->
      <PitHeader class="header" />
      <Nuxt id="main" class="flex-grow" />
    </div>
    <PitFooter v-if="showPitFooter" class="footer" theme="primary" />

    <PitResetDeviceModal v-if="showReseDeviceModal" />

    <LibCookieSettingsModal
      v-if="cookieControlEnabled && !this.$morphCookies.cookiePrefsSet()"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { GAMethods } from '@/mixins/GAMethods.js'
import { cookieControl } from '@/mixins/cookieControl.js'
import { currentPage } from '@/mixins/currentPage.js'

export default {
  name: 'Default',
  mixins: [GAMethods, cookieControl, currentPage],
  computed: {
    ...mapState({
      currentStepsVersion: (state) => state.steps.currentStepsVersion,
      isMultiVersion: (state) => state.site.isMultiVersion,
      deviceOfflineEnabled: (state) => state.site.deviceOfflineEnabled,
      deviceUserResetEnabled: (state) => state.site.deviceUserResetEnabled,
      hasRefreshed: (state) => state.site.hasRefreshed,
    }),
    cookieControlEnabled() {
      return this.$morphCookies
    },
    themeStylesheetUrl() {
      return `/css/theme-${this.currentStepsVersion}.css`
    },
    showPitFooter() {
      // return true
      return this.isGetStarted || this.isThankyou || this.isStep || this.isInfoPage
    },
    showReseDeviceModal(){
      // return false
      // If the site has just been refreshed due to replacing _ga then we do not need to refresh again
      if(!this.deviceUserResetEnabled || this.hasRefreshed) return false
      if(this.isMultiVersion){
        return !!this.isVersionLanding
      } else {
        return !!this.isGetStarted
      }
    }
  },
  watch: {
    $route(to) {
      this.$nextTick(function () {
        this.setRouteAnnouncement(document.title)
        this.setSkipLinksFocus()
        this.setAriaCurrent()
        this.logPageView()
      })
      this.setTooltipIsOpen(false)
      if (this.cookieControlEnabled) {
        this.handleCookieModal()
      }
    },
  },
  mounted() {
    this.$viewport.calcHeight()

    // see https://marcus.io/blog/improved-accessible-routing-vuejs
    setTimeout(() => this.scrollFix(this.$route.hash), 1)

    // run $axe a11y test - only on initial app mount()
    this.runA11yTest()
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen']),
    ...mapActions('steps', ['setTotalActiveSteps']),
    // see https://marcus.io/blog/improved-accessible-routing-vuejs
    scrollFix(hashbang) {
      window.location.hash = hashbang
    },
    setSkipLinksFocus() {
      // puts focus on #appLayout after route change
      this.$el.focus()
    },
    setRouteAnnouncement(pagetitle) {
      this.$announcer.set(`Navigated to ${pagetitle}`)
    },
    logPageView() {
      const eventText = 'Page View'
      // const eventProperty = document.URL + ' ' + document.title
      const eventProperty = { page: window.location.pathname }

      this.gaLogEvent(eventText, eventProperty)
    },
    setAriaCurrent() {
      const app = this.$el
      const currents = app.querySelectorAll('[aria-current]')
      if (currents) {
        currents.forEach((current) => {
          current.removeAttribute('aria-current')
        })
      }
      app.querySelectorAll('.nuxt-link-active').forEach((current) => {
        current.setAttribute('aria-current', 'step')
      })
    },
    runA11yTest() {
      if (process.env.NODE_ENV === 'development' && this.$axe) {
        // const axe = this.$axe
        setTimeout(() => {
          this.$axe.run()
        }, 5000)
      }
    },
    handleCookieModal() {
      if (this.$morphCookies && !this.$morphCookies.cookiePrefsSet()) {
        this.showCookieSettingsModal()
      }
    },
  },
  // head() {
  //   return {
  //     link: [
  //       {
  //         rel: 'stylesheet',
  //         href: this.themeStylesheetUrl,
  //       },
  //     ],
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.main {
  --footer-height: 72px;
  padding-bottom: var(--footer-height);
  @screen md {
    --footer-height: 100px;
  }
}
</style>
