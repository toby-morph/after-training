<template>
  <header class="section">
    <div class="section-content pt-10 md:pt-16 pb-4">
      <p
        v-if="pageStrapline || siteStrapline"
        class="text-xs-base mb-4 strapline"
      >
        <template v-if="pageStrapline">
          {{ pageStrapline }}
        </template>
        <template v-else>
          {{ siteStrapline }}
        </template>
      </p>
      <h1
        v-if="pageTitle"
        class="text-primary text-xs-h1 leading-xs-h1 md:text-h1 md:leading-h1"
      >
        {{ pageTitle }}
        <span class="block my-4 border-primary border-b-4 w-14 h-0" />
      </h1>
      <p
        v-if="pageSubTitle"
        class="text-primary text-xs-h4 leading-xs-h4 md:text-h4 md:leading-h4"
      >
        {{ pageSubTitle }}
      </p>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    pageTitle: {
      type: String,
      required: true,
      default: '',
    },
    pageSubTitle: {
      type: String,
      default: '',
    },
    pageStrapline: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapState({
      siteStrapline: (state) => state.site.siteDetails.siteStrapline,
    }),
  },
}
</script>

<style lang="scss" scoped></style>
