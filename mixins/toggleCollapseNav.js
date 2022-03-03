import { mapState, mapActions } from 'vuex'
import { GAMethods } from '@/mixins/GAMethods.js'

export const toggleCollapseNav = {
  computed: {
    ...mapState({
      navIsOpen: (state) => state.site.navIsOpen,
    }),
  },
  mixins: [GAMethods],
  methods: {
    ...mapActions('site', ['setMenuIsOpen']),
    toggleCollapseNav() {
      this.setMenuIsOpen(!this.navIsOpen)

      // reset nav to not be vertically scrolled
      if (this.navIsOpen && this.$refs.collapseNav) {
        this.$refs.collapseNav.scrollTop = 0
      }

      // prevent body from scrolling while menu is open
      const htmlClassList = document.documentElement.classList
      let navOpenEvent
      if (this.navIsOpen) {
        htmlClassList.add('overflow-hidden')
        navOpenEvent = { OpenClose: 'open' }
      } else {
        htmlClassList.remove('overflow-hidden')
        navOpenEvent = { OpenClose: 'close' }
      }
      this.gaLogEvent('Nav: Toggle Menu', navOpenEvent)
    },
  },
}
