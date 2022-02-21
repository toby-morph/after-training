<template>
  <div class="flex flex-row flex-nowrap space-x-4">
    <LibBaseButton
      class="xs:min-w-7em"
      theme="primary-filled"
      on-background="dark"
      @click="denyAll"
    >
      <template #text>
        Opt out
      </template>
    </LibBaseButton>
    <LibBaseButton
      class="ml-4 xs:min-w-7em"
      theme="primary"
      on-background="dark"
      @click="acceptAll"
    >
      <template #text>
        Accept all
      </template>
    </LibBaseButton>
  </div>
</template>

<script>
import { cookieControl } from '@/mixins/cookieControl.js'
export default {
  mixins: [cookieControl],
  methods: {
    denyAll() {
      this.cookieControlDenyAll()
      this.$emit('option-selected')
    },
    acceptAll() {
      this.cookieControlAcceptAll()
      this.$emit('option-selected')
    },
  },
}
</script>

<style lang="scss" scoped></style>
