<template>
  <a
    :href="linkUrl"
    :target="linkTarget"
    class="btn"
    :class="btnClass"
    @click="checkLogEvent"
    v-on="$listeners"
  >
    <span>
      <span
        class="btn-text"
        :class="'text-' + labelAlign"
      ><slot
        name="text"
      /></span>
      <span v-if="hasIcon" class="btn-icon" :class="iconClass">
        <slot
          name="icon"
        /></span>
    </span>
  </a>
</template>

<script>
import { GAMethods } from '@/mixins/GAMethods.js'
export default {
  mixins: [GAMethods],
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
    onBackground: {
      type: String,
      default: 'light',
    },
    linkUrl: {
      type: String,
      default: null,
    },
    openNewTab: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'right',
    },
    labelAlign: {
      type: String,
      default: 'left',
    },
    logEvent: {
      type: String,
      required: false,
      default: null,
    },
    logEventProperty: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    linkTarget() {
      const linkTarget = this.openNewTab ? '_blank' : null
      return linkTarget
    },
    btnClass() {
      const btnClass = []
      btnClass.push('btn-' + this.theme)
      if (this.onBackground === 'dark') {
        btnClass.push('btn-on-dark')
      }
      return btnClass.join(' ')
    },
    iconClass() {
      return this.iconPosition === 'left' ? 'mr-2 order-first' : 'ml-2'
    },
    hasIcon() {
      return this.$slots.icon
    },
  },
  methods: {
    checkLogEvent(e) {
      if (this.logEvent) {
        this.gaLogEvent(this.logEvent, this.logEventProperty)
      }
    },
  },
}
</script>
