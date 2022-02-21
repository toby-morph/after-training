<template>
  <a
    class="
      group
      flex flex-row
      items-center
      justify-start
      px-4
      py-2
      min-h-12
      md:py-4 md:min-h-16
      bg-secondary
      text-white
      hover:bg-white hover:text-primary
      focus:shadow-outline-on-dark focus:outline-none
    "
    :href="link.url"
    :target="link.target"
    v-on="$listeners"
  >
    <slot>{{ link.title }}</slot>
    <div class="ml-auto">
      <div class="mt-px ml-2 flex-shrink-0">
        <ArrowRight class="w-6 h-6 fill-white group-hover:fill-primary" />
      </div>
    </div>
  </a>
</template>

<script>
import ArrowRight from '@/assets/icons/arrow-right-sm.svg?inline'

export default {
  components: {
    ArrowRight,
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
