<template>
  <header class="py-2.5 bg-white">
    <section class="section flex flex-row items-center">
      <div class="site-logo mr-auto">
        <nuxt-link
          class="block focus:shadow-outline-on-light focus:outline-none rounded"
          :to="'/'"
        >
          <LibBaseImg
            :src="logo.url"
            :alt="logo.alt"
          />
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
    </section>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      logo: (state) => state.site.logo,
      fullScreenEnabled: (state) => state.site.fullScreenEnabled,
    }),
    largeTextEnabled() {
      return JSON.parse(this.$config.largeText)
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 80px;
  @screen md {
    height: 110px;
  }
}
.site-logo {
  width: 100px;
  svg {
    @apply w-full h-full;
  }
  @screen sm {
    width: 120px;
  }
  @screen md {
    width: 165px;
  }
}
</style>
