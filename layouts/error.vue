<template>
  <main class="main">
    <template v-if="error.statusCode === 404">
      <PitPageTitle page-title="Ooops... page not found!" />
      <LibContentSectionWrapper>
        <div class="md:flex md:flex-row md:items-top">
          <div class="mb-4 md:w-7/12 md:mb-0">
            <p>
              If you are looking for {{ siteName }}
              <NuxtLink to="/">
                click here to get started
              </NuxtLink>.
            </p>
          </div>
          <div class="pt-4 md:pt-0 md:w-5/12 md:pl-5">
            <img :src="require('~/assets/img/404.svg')">
          </div>
        </div>
      </LibContentSectionWrapper>
    </template>
    <template v-else>
      <PitPageTitle page-title="Error" />
      <LibContentSectionWrapper>
        <p>Sorry, there's been an error</p>
        <p>
          If you are looking for {{ siteName }}
          <NuxtLink to="/">
            click here to get started
          </NuxtLink>.
        </p>
      </LibContentSectionWrapper>
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapState({
      siteName: (state) => state.site.siteDetails.siteName,
    }),
  },
}
</script>

<style></style>
