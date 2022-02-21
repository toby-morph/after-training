<template>
  <nav aria-labelledby="site-content-navigation">
    <h2 id="site-content-navigation" class="sr-only">
      Site content navigation
    </h2>
    <div class="flex flex-row items-center">
      <span class="hidden text-xs-base font-bold text-blue mr-2">Contents</span>

      <PitHeaderButton
        :aria-pressed="navIsOpen ? 'true' : 'false'"
        class="menu-open-icon"
        @click="toggleCollapseNav"
      >
        <template v-slot:text>
          Menu
        </template>
        <template v-slot:icon>
          <MenuIcon class="w-8 h-8 fill-primary" />
        </template>
      </PitHeaderButton>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        v-show="navIsOpen"
        class="z-40 fixed inset-0 transition-opacity"
        @keydown.esc="toggleCollapseNav"
      >
        <div
          class="absolute inset-0 bg-grey-light opacity-75"
          @click="toggleCollapseNav"
        />
      </div>
    </transition>

    <div
      ref="collapseNav"
      class="
        collapse-nav
        overflow-auto
        top-0
        right-0
        w-full
        sm:w-5/6
        md:w-4/5
        lg:w-3/5
        xl:w-1/2
        bg-primary
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-50
      "
      :class="
        navIsOpen ? 'transform translate-x-0' : 'transform translate-x-105'
      "
    >
      <div class="menu-close sticky top-0 left-0 z-50 w-full">
        <PitCloseButton
          aria-label="Close menu"
          :tabindex="!navIsOpen ? '-1' : '0'"
          :show-label="true"
          class="
            px-4
            h-12
            sm:h-16
            w-full
            bg-primary-dark
            text-white
            hover:bg-primary
          "
          @click="toggleCollapseNav"
        >
          Close menu
        </PitCloseButton>
      </div>
      <slot>Nav links here</slot>
      <button
        class="
          sr-only
          focus:not-sr-only focus:outline-on-dark focus:outline-none
          text-white
        "
        :tabindex="!navIsOpen ? '-1' : '0'"
        @click="toggleCollapseNav"
      >
        <span class="inline-block px-4 py-2">Close menu</span>
      </button>
    </div>
  </nav>
</template>

<script>
import MenuIcon from '@/assets/icons/hamburger.svg?inline'
import { toggleCollapseNav } from '@/mixins/toggleCollapseNav.js'

export default {
  components: {
    MenuIcon,
  },
  mixins: [toggleCollapseNav],
}
</script>

<style lang="scss">
.menu-link {
  @apply bg-primary border-white text-white;
  .step-icon {
    @apply border-white;
  }
  &:hover {
    @apply bg-primary-dark;
  }
  &:focus,
  &:focus-visible {
    @apply shadow-inner-outline-on-dark outline-none;
  }
  &.is-completed {
    &:hover {
      @apply bg-primary-dark text-white;
      .step-icon {
        @apply border-white;
      }
      svg {
        @apply fill-white;
      }
    }
  }
  &.is-current {
    @apply pointer-events-none bg-white text-primary;
    .step-icon {
      @apply border-primary;
    }
    svg {
      @apply fill-primary;
    }
    &:focus,
    &:focus-visible {
      @apply shadow-inner-outline-on-light outline-none;
    }
  }
}
.return-link {
  height: 60px;
  @screen md {
    height: 100px;
  }
}
</style>
