<template>
  <PitHeaderButton
    class="toggle-text-size"
    :class="largeText ? 'text-size-large' : ''"
    :aria-pressed="largeText ? 'true' : 'false'"
    :enabled="largeText ? true : false"
    @click="toggleTextSize"
  >
    <template v-slot:text>
      Text size
    </template>
    <template v-slot:icon>
      <TextSize class="w-8 h-8 fill-primary relative z-10" />
    </template>
  </PitHeaderButton>
</template>

<script>
import TextSize from '@/assets/icons/text-size.svg?inline'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  components: {
    TextSize,
  },
  mixins: [GAMethods],
  data() {
    return {
      largeText: false,
    }
  },
  computed: {
    btnText() {
      if (this.largeText) {
        return 'Decrease font size'
      } else {
        return 'Increase font size'
      }
    },
  },
  watch: {
    largeText() {
      const htmlClassList = document.documentElement.classList
      if (this.largeText) {
        htmlClassList.add('large-text')
      } else {
        htmlClassList.remove('large-text')
      }
    },
  },
  methods: {
    toggleTextSize() {
      this.largeText = !this.largeText
      let textSize
      if (this.largeText) {
        textSize = { size: 'large' }
      } else {
        textSize = { size: 'standard' }
      }
      this.gaLogEvent('Toggle Text Size', textSize)
    },
  },
}
</script>

<style lang="scss" scoped></style>
