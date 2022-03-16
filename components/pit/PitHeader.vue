<template>
  <header class="header bg-white">
    <section class="section flex flex-row items-center py-2.5">
      <div class="site-logo mr-auto">
        <nuxt-link
          class="
            block
            w-full
            h-full
            focus:shadow-outline-on-light focus:outline-none
            rounded
          "
          to="/get-started"
          @click.native="registerLogoClickEvent"
        >
          <LibBaseImg class="w-full h-full" :src="logo.url" :alt="logo.alt" />
        </nuxt-link>
      </div>
      <PitHeaderButtonTextSize
        v-if="largeTextEnabled"
        class="xxs:mr-1 sm:mr-5 mr-2.5 print:hidden"
      />
      <PitHeaderButtonFullScreen
        v-if="fullScreenEnabled"
        class="xxs:mr-1 sm:mr-5 mr-2.5 print:hidden"
      />
      <PitCollapseNav v-if="showMainNav" class="print:hidden" />
    </section>
  </header>
</template>

<script>
import { mapState } from 'vuex'

import { currentPage } from '@/mixins/currentPage.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  mixins: [currentPage, GAMethods],
  computed: {
    ...mapState({
      logo: (state) => state.site.logo,
      // fullScreenEnabled: (state) => state.site.fullScreenEnabled,
    }),
    largeTextEnabled() {
      return JSON.parse(this.$config.largeText)
    },
    fullScreenEnabled() {
      return JSON.parse(this.$config.fullScreen)
    },
    showMainNav() {
      return this.$appUser.isLoggedIn()
    },
  },
  methods: {
    registerLogoClickEvent() {
      this.gaLogEvent('Nav: Back to Home logo clicked')
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  height: var(--header-height);
}
.site-logo {
  width: var(--site-logo-width);
}
</style>
