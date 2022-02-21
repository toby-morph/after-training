<template>
  <div
    class="headerButton flex flex-col items-center hover:cursor-pointer"
    v-on="$listeners"
  >
    <button
      class="headerButton__button relative rounded px-2 py-1 flex-shrink-0"
      :class="enabled ? 'headerButton__button--enabled' : ''"
    >
      <span class="sr-only"><slot name="text" /></span>
      <span
        class="flex flex-row items-center justify-center flex-shrink-0"
      ><slot
        name="icon"
      /></span>
    </button>
    <span
      class="
        headerButton__label
        xxs:hidden
        text-xs-small
        leading-xs-small
        md:text-small md:leading-small
      "
    ><slot
      name="text"
    /></span>
  </div>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.headerButton {
  .headerButton__label {
    @apply text-primary;
  }
  svg {
    @apply fill-primary;
  }
  &:hover {
    .headerButton__label {
      @apply text-primary-dark;
    }
    svg {
      @apply fill-primary-dark;
    }
    &:after {
      @apply opacity-100;
    }
  }
}
.headerButton__button {
  height: 50px;
  width: 50px;
  svg {
    @apply relative z-20;
  }
  &:after {
    @apply block absolute z-0 rounded-full opacity-0 top-0 left-0;
    content: '';
    height: 50px;
    width: 50px;
    transition: opacity 0.2s ease-in-out;
  }
  &.headerButton__button--enabled {
    &:after {
      @apply bg-primary-light opacity-100;
    }
    svg {
      @apply fill-primary;
    }
    &:hover {
      svg {
        @apply fill-secondary;
      }
    }
  }
  &:focus,
  &:focus-visible {
    @apply outline-none;
    &:after {
      @apply opacity-100 shadow-outline-on-light;
    }
  }
}
</style>
