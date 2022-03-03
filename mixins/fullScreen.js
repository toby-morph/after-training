import { mapState, mapActions } from 'vuex'

import { GAMethods } from '@/mixins/GAMethods.js'

export const fullScreen = {
  mixins: [GAMethods],
  computed: {
    ...mapState({
      fullScreen: (state) => state.site.fullScreen,
      fullScreenEnabled: (state) => state.site.fullScreenEnabled,
      exitedFullScreen: (state) => state.site.exitedFullScreen,
    }),
  },
  methods: {
    ...mapActions('site', ['setFullScreen', 'setExitedFullScreen']),
    toggleFullScreen() {
      this.$fullscreen.toggle(document.body, {
        wrap: true,
        background: '#fff',
        callback: this.fullScreenStatusChange,
      })
    },
    startFullScreen() {
      if (this.fullScreenEnabled && !this.exitedFullScreen) {
        this.$fullscreen.enter(document.body, {
          wrap: true,
          background: '#fff',
          callback: this.fullScreenStatusChange,
        })
      }
    },
    fullScreenStatusChange(fullscreen) {
      // if user has exited full screen at any point, store this in vuex state
      if (!this.exitedFullScreen && !fullscreen) {
        this.setExitedFullScreen(true)
      }
      this.gaLogEvent('Prefs: Full Screen', { fullscreen })
      this.setFullScreen(fullscreen)
    },
  },
}
