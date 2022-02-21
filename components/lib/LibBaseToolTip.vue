<template>
  <div
    :aria-hidden="openTooltip ? 'false' : 'true'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      class="tooltip relative rounded-lg p-2 text-left"
      :class="tooltipClass"
    >
      <slot>Tooltip content</slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  // inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    arrowPos: {
      type: String,
      default: 'bottomRight',
    },
    theme: {
      type: String,
      default: 'dark-primary',
    },
  },
  data() {
    return {
      tooltipId: null,
      openTooltip: this.open,
      uuid: uuid.v1(),
    }
  },
  computed: {
    ...mapState({
      tooltipIsOpen: (state) => state.site.tooltipIsOpen,
    }),
    tooltipTheme() {
      return 'tooltip-' + this.theme
    },
    arrowPosClass() {
      let arrowPosClass = 'tooltip-arrow-'
      switch (this.arrowPos) {
        case 'bottomLeft':
          arrowPosClass += 'b-l'
          break
        case 'bottomRight':
          arrowPosClass += 'b-r'
          break
        case 'topLeft':
          arrowPosClass += 't-l'
          break
        case 'topRight':
          arrowPosClass += 't-r'
          break
      }
      return arrowPosClass
    },
    tooltipClass() {
      return this.openTooltip
        ? 'block ' + this.tooltipTheme + ' ' + this.arrowPosClass
        : 'hidden ' + this.tooltipTheme + ' ' + this.arrowPosClass
    },
  },
  watch: {
    tooltipIsOpen(openTooltipId) {
      // if a different tooltip opens close this one
      if (this.tooltipId !== openTooltipId) {
        this.openTooltip = false
      } else {
        this.openTooltip = true
      }
    },
  },
  mounted() {
    this.tooltipId = this.uuid
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen']),
  },
}
</script>

<style lang="scss" scoped>
// arrow
$arrow_size: 15px;
.tooltip {
  &:after {
    content: '';
    width: 0;
    height: 0;
    @apply border-solid block absolute;
  }
}
//arrow position
.tooltip-arrow-b-r {
  margin-bottom: $arrow_size;
  &:after {
    border-top-width: $arrow_size;
    border-right: $arrow_size solid transparent !important;
    border-left: $arrow_size solid transparent !important;
    bottom: -$arrow_size;
    right: 40px;
  }
}
.tooltip-arrow-b-l {
  margin-bottom: $arrow_size;
  &:after {
    border-top-width: $arrow_size;
    border-right: $arrow_size solid transparent !important;
    border-left: $arrow_size solid transparent !important;
    bottom: -$arrow_size;
    left: 40px;
  }
}
.tooltip-arrow-t-l {
  margin-top: $arrow_size;
  &:after {
    border-bottom-width: $arrow_size;
    border-right: $arrow_size solid transparent !important;
    border-left: $arrow_size solid transparent !important;
    top: -$arrow_size;
    left: 40px;
  }
}
.tooltip-dark-primary {
  @apply bg-primary text-white;
  &:after {
    @apply border-primary;
  }
}
.tooltip-dark-secondary {
  @apply bg-secondary text-white;
  &:after {
    @apply border-secondary;
  }
}
.tooltip-light-primary {
  @apply bg-white text-primary;
  &:after {
    @apply border-white;
  }
}
.tooltip-light-secondary {
  @apply bg-white text-secondary;
  &:after {
    @apply border-white;
  }
}
</style>
