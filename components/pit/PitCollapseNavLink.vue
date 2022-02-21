<template>
  <div class="relative" @click.capture="handleLinkClick()">
    <LibBaseToolTip
      ref="tooltip"
      theme="light-primary"
      arrow-pos="topLeft"
      class="disabled-menu-link-tooltip w-4/5 z-50 shadow-lg absolute clearfix"
      @click.capture="closeTooltip()"
    >
      Sorry, but you cannot jump ahead
    </LibBaseToolTip>
    <nuxt-link
      class="
        menu-link
        group
        flex flex-row
        items-center
        justify-start
        px-4
        py-2
        min-h-12
        md:py-4 md:min-h-16
      "
      :class="menuLinkClass"
      :aria-disabled="isEnabled ? 'false' : 'true'"
      :tabindex="isEnabled ? false : '-1'"
      :to="route"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot>Menu Link</slot>
      <div class="ml-auto">
        <div class="mt-px ml-2 flex-shrink-0">
          <ArrowRight class="h-6 w-6 fill-white" />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ArrowRight from '@/assets/icons/arrow-right-sm.svg?inline'

import { toolTip } from '@/mixins/toolTip.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  components: {
    ArrowRight,
  },
  mixins: [toolTip, GAMethods],
  inheritAttrs: false,
  props: {
    route: {
      type: String,
      required: false,
      default: '/',
    },
    isEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    linkClass: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapState({
      navIsOpen: (state) => state.site.navIsOpen,
    }),
    tooltipIdAttr() {
      return 'disabled-menu-link-tooltip' + this.$refs.tooltip.uuid
    },
    menuLinkClass() {
      let menuLinkClass = this.linkClass
      menuLinkClass += this.isEnabled ? '' : ' disabled'
      return menuLinkClass
    },
  },
  watch: {
    navIsOpen() {
      if (!this.navIsOpen) {
        this.setTooltipIsOpen(false)
      }
    },
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen', 'setDisabledLinkClicked']),
    handleLinkClick() {
      this.gaLogEvent('Menu Link', { destination: this.route })
      if (this.isEnabled) {
        this.$emit('enabled-click')
      } else {
        // this.openTooltip(this.tooltipId)
        this.openTooltip(this.$refs.tooltip.uuid)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.disabled-menu-link-tooltip {
  top: 100%;
  left: 1rem;
}
.disabled {
  @apply pointer-events-none opacity-50;
}
</style>
