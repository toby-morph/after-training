import { mapState, mapActions } from 'vuex'

export const toolTip = {
  computed: {
    ...mapState({
      tooltipIsOpen: (state) => state.site.tooltipIsOpen,
    }),
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen']),
    openTooltip(tooltipId) {
      this.setTooltipIsOpen(tooltipId)
    },
    closeTooltip() {
      this.setTooltipIsOpen(false)
    },
  },
}
