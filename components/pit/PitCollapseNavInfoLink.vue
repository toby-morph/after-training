<template>
  <div class="relative" @click.capture="handleLinkClick()">
    <nuxt-link
      class="
        menu-link
        flex flex-row
        items-center
        justify-start
        px-4
        py-2
        min-h-12
        md:py-4 md:min-h-16
      "
      :aria-disabled="navIsOpen ? 'false' : 'true'"
      :tabindex="navIsOpen ? false : '-1'"
      :to="route"
      v-on="$listeners"
    >
      <slot>Menu Link</slot>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    route: {
      type: String,
      required: false,
      default: '/',
    },
  },
  computed: {
    ...mapState({
      navIsOpen: (state) => state.site.navIsOpen,
    }),
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen', 'setDisabledLinkClicked']),
    handleLinkClick() {
      this.$emit('enabled-click')
    },
  },
}
</script>

<style lang="scss" scoped></style>
