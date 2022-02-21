<template>
  <button
    class="BaseCloseButton flex flex-row items-center"
    :class="'BaseCloseButton--' + colorTheme"
    v-on="$listeners"
  >
    <CloseIcon class="BaseCloseButton__icon w-8 h-8 flex-shrink-0" />
    <span :class="labelClass"><slot>Close</slot></span>
  </button>
</template>

<script>
import CloseIcon from '@/assets/icons/close.svg?inline'
export default {
  components: {
    CloseIcon,
  },
  props: {
    showLabel: {
      type: Boolean,
      default: false,
    },
    labelPosition: {
      type: String,
      default: 'right',
    },
    colorTheme: {
      type: String,
      required: false,
      default: 'on-dark',
    },
  },
  computed: {
    labelClass() {
      const labelClass = []
      if (!this.showLabel) {
        labelClass.push('sr-only')
      }
      if (this.labelPosition === 'left') {
        labelClass.push('order-first', 'mr-4')
      } else {
        labelClass.push('order-last', 'ml-4')
      }
      return labelClass.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
.BaseCloseButton--on-light {
  &:focus,
  &:focus-visible {
    @apply shadow-inner-outline-on-light outline-none;
  }
  .BaseCloseButton__icon {
    @apply fill-primary;
  }
}
.BaseCloseButton--on-dark {
  &:focus,
  &:focus-visible {
    @apply shadow-inner-outline-on-dark outline-none;
  }
  .BaseCloseButton__icon {
    @apply fill-white;
  }
}
</style>
