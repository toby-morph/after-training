<template>
  <div
    class="
      step-icon
      w-8
      h-8
      rounded-full
      border-3
      flex flex-shrink-0
      items-center
      justify-center
      relative
    "
    v-on="$listeners"
  >
    <span class="relative z-20">{{ step.step_number }}</span>
    <span class="text-white sr-only" :class="`bg-${theme}`">{{ step.step_title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
    },
  },
}
</script>

<style lang="scss" scoped></style>
