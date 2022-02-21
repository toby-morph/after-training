import { mapState, mapActions } from 'vuex'

import { toolTip } from '@/mixins/toolTip.js'

export const disabledButtonMessage = {
  mixins: [toolTip],
  computed: {
    ...mapState({
      fullScreen: (state) => state.site.fullScreen,
    }),
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen']),
    showDisabledMessage() {
      if (!this.isEnabled) {
        const tooltipToOpen = this.$refs.tooltip.uuid
        this.openTooltip(tooltipToOpen)

        this.hideTooltipOnScroll()
      }
    },
    hideTooltipOnScroll() {
      const elToScroll = document.getElementById('appContent')

      elToScroll.addEventListener(
        'scroll',
        this.$utils.debounce(() => {
          this.closeTooltip()
        }, 300),
        { once: true }
      )
    },
  },
}
