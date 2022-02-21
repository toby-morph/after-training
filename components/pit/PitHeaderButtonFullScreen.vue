<template>
  <PitHeaderButton
    v-if="fullScreenEnabled"
    class="toggle-full-screen"
    :aria-pressed="fullScreen ? 'true' : 'false'"
    :enabled="fullScreen ? true : false"
    @click="toggleFullScreen"
  >
    <template v-slot:text>
      {{ fullScreen ? 'Exit' : 'Fullscreen' }}
    </template>
    <template v-slot:icon>
      <ViewMaximise
        v-if="!fullScreen"
        class="w-8 h-8 fill-primary"
      />
      <ViewMinimise v-if="fullScreen" class="w-8 h-8 fill-primary" />
    </template>
  </PitHeaderButton>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ViewMaximise from '@/assets/icons/fullscreen-enter.svg?inline'
import ViewMinimise from '@/assets/icons/fullscreen-exit.svg?inline'

import { fullScreen } from '@/mixins/fullScreen.js'

export default {
  components: {
    ViewMaximise,
    ViewMinimise,
  },
  mixins: [fullScreen],
  computed: {
    ...mapState({
      // fullScreen: (state) => state.site.fullScreen,
      fullScreenEnabled: (state) => state.site.fullScreenEnabled,
    }),
  },
  mounted() {
    // set whether fullscreen API is available and turned on in config
    const fullScreenEnabled =
      this.$fullscreen.support &&
      JSON.parse(this.$config.fullScreen) &&
      parseInt(window.screen.width) > 480

    this.setFullScreenEnabled(fullScreenEnabled)
  },
  methods: {
    ...mapActions('site', ['setFullScreenEnabled']),
  },
}
</script>

<style lang="scss" scoped></style>
