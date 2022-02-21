<template>
  <transition name="fade">
    <div
      v-show="show"
      class="
        fixed
        top-0
        left-0
        right-0
        bottom-0
        overflow-y-auto overflow-x-hidden
        z-9999
        flex flex-row
        items-center
      "
    >
      <LibBaseOverlay @click.prevent="closeModal()" />

      <div
        :id="modalId"
        :ref="modalId"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        :tabindex="show ? '0' : false"
        :class="modalDialogClasses"
        class="
          modal
          relative
          rounded-xl
          overflow-auto
          mx-auto
          shadow-lg
          focus:outline-none focus:shadow-outline-on-light
        "
      >
        <div v-if="showClose" class="px-4 pt-4 flex flex-row">
          <LibBaseCloseButton
            class="ml-auto focus:outline-none"
            :aria-controls="modalId"
            :color-theme="closeIconClasses"
            :show-label="true"
            label-position="left"
            @click.prevent="closeModal()"
          />
        </div>
        <div class="flow px-6 pt-6 pb-10">
          <LibBaseHtmlHeader
            id="modalTitle"
            level="2"
            header-font-size="4"
            class="mb-4"
            :class="showTitle ? '' : 'sr-only'"
          >
            {{ title }}
          </LibBaseHtmlHeader>
          <LibBaseProse>
            <slot />
          </LibBaseProse>
          <button
            class="
              sr-only
              focus:not-sr-only focus:outline-none focus:shadow-outline-on-dark
            "
            :aria-controls="modalId"
            :tabindex="show ? '0' : false"
            @click="closeModal"
          >
            Close window
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: 'dark-primary',
    },
    title: {
      type: String,
      required: true,
    },
    customSize: {
      type: Array,
      default() {
        return null
      },
    },
    textAlign: {
      type: String,
      default: 'left',
    },
  },
  data() {
    return {
      uuid: this.$uuid.v4(),
    }
  },
  computed: {
    modalId() {
      return 'modal-' + this.uuid
    },
    closeIconClasses() {
      // focus:shadow-outline-on-light
      let closeIconClasses = []
      if (this.theme === 'dark-primary' || this.theme === 'dark-secondary') {
        closeIconClasses = ['on-dark', 'focus:shadow-outline-on-dark']
      } else {
        closeIconClasses = ['on-light', 'focus:shadow-outline-on-light']
      }
      return closeIconClasses.join(' ')
    },
    themeClasses() {
      let themeClasses = null
      switch (this.theme) {
        case 'dark-primary':
          themeClasses = ['bg-primary', 'text-white']
          break
        case 'dark-secondary':
          themeClasses = ['bg-secondary', 'text-white']
          break
        case 'light-primary':
          themeClasses = ['bg-white', 'text-primary']
          break
        case 'light-secondary':
          themeClasses = ['bg-white', 'text-secondary']
          break
        default:
          themeClasses = ['bg-white', 'text-primary']
      }
      return themeClasses
    },
    modalDialogClasses() {
      const modalDialogClasses = []
      if (this.textAlign === 'center') {
        modalDialogClasses.push('text-center')
      }
      return [
        ...this.themeClasses,
        ...this.modalDialogSizeClasses,
        ...modalDialogClasses,
      ].join(' ')
    },
    modalDialogSizeClasses() {
      if (this.customSize) {
        return this.customSize
      }
      return ['max-h-90vh', 'w-11/12', 'md:max-w-2xl', 'my-6']
    },
  },
  watch: {
    $route() {
      document.documentElement.classList.remove('overflow-hidden')
      this.closeModal()
    },
    show(currentShowVal) {
      if (currentShowVal) {
        document.documentElement.classList.add('overflow-hidden')
      } else {
        document.documentElement.classList.remove('overflow-hidden')
      }
      this.$nextTick(() => {
        this.focusModalDialog()
      })
    },
  },
  beforeDestroy() {
    document.documentElement.classList.remove('overflow-hidden')
  },
  methods: {
    closeModal() {
      document.documentElement.classList.remove('overflow-hidden')
      this.$emit('toggle-modal')
    },
    focusModalDialog() {
      this.$refs[this.modalId].focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
