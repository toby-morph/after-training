<template>
  <LibBaseModal
    :show="cookieSettingsModalShow"
    :title="cookieSettingsModalTitle"
    :show-close="false"
    :theme="theme"
    :toggle-modal="hideCookieSettingsModal"
  >
    <div v-html="cookieSettingsModalText" />

    <div v-if="currentUserCookiePrefs && nonNecessaryCookies">
      <p class="mt-4">
        You have currently chosen to
        <span class="uppercase">{{ currentCookiePrefsText }}</span>
        non-necessary cookies.
      </p>
    </div>

    <!-- If non-necessary cookies are used, show user opt out/accept buttons -->
    <!-- <LibCookiesOptInOut
      v-if="nonNecessaryCookies"
      ref="CookiesOptInOut"
      @option-selected="closeModal"
    /> -->
    <div v-if="nonNecessaryCookies" class="flex flex-row flex-nowrap space-x-4">
      <LibBaseButton
        class="xs:min-w-7em"
        :theme="optOutBtnTheme.theme"
        :on-background="optOutBtnTheme.onBackground"
        @click="denyAll"
      >
        <template #text>
          Opt out
        </template>
      </LibBaseButton>
      <LibBaseButton
        class="ml-4 xs:min-w-7em"
        :theme="acceptAllBtnTheme.theme"
        :on-background="acceptAllBtnTheme.onBackground"
        @click="acceptAll"
      >
        <template #text>
          Accept all
        </template>
      </LibBaseButton>
    </div>
    <!-- If no non-necessary cookies are used, show user a close button -->
    <LibBaseButton
      v-if="!nonNecessaryCookies"
      ref="CookieModalClose"
      theme="primary-filled"
      on-background="dark"
      @click="closeModal"
    >
      <template #text>
        Close
      </template>
    </LibBaseButton>
    <div class="mt-6">
      <nuxt-link to="/cookies" @click.native="closeModal">
        View our cookie policy
      </nuxt-link>
    </div>
  </LibBaseModal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cookieControl } from '@/mixins/cookieControl.js'

export default {
  mixins: [cookieControl],
  props: {
    theme: {
      type: String,
      default: 'dark-primary',
    },
  },
  computed: {
    ...mapState({
      cookieSettingsModalShow: (state) =>
        state.site.cookieNotice.cookieSettingsModalShow,
      cookieSettingsModalTitle: (state) => state.site.cookieNotice.modalTitle,
      cookieSettingsModalText: (state) => state.site.cookieNotice.modalText,
      currentUserCookiePrefs: (state) =>
        state.site.cookieNotice.currentUserCookiePrefs,
      nonNecessaryCookies: (state) =>
        state.site.cookieNotice.nonNecessaryCookies,
    }),
    currentCookiePrefsText() {
      return this.currentUserCookiePrefs ? 'accept all' : 'deny all'
    },
    acceptAllBtnTheme() {
      const acceptAllBtnTheme = {}
      acceptAllBtnTheme.theme = this.theme.includes('primary')
        ? 'primary'
        : 'secondary'
      acceptAllBtnTheme.onBackground = this.theme.includes('dark')
        ? 'dark'
        : 'light'
      return acceptAllBtnTheme
    },
    optOutBtnTheme() {
      const optOutBtnTheme = {}
      optOutBtnTheme.theme = this.theme.includes('primary')
        ? 'primary-filled'
        : 'secondary-filled'
      optOutBtnTheme.onBackground = this.theme.includes('dark')
        ? 'dark'
        : 'light'
      return optOutBtnTheme
    },
  },
  mounted() {
    // if cookie prefs already set, don't show the modal
    if (this.$morphCookies.cookiePrefsSet()) {
      this.setCurrentUserCookiePrefs(this.$morphCookies.getGDPR())
    } else {
      this.showCookieSettingsModal()
      if (!this.nonNecessaryCookies) {
        // if there are no non-necessary cookies, set cookies to accept all without requiring user to opt in
        this.cookieControlAcceptAll()
      }
    }
  },
  methods: {
    ...mapActions('site', ['setCurrentUserCookiePrefs']),
    denyAll() {
      this.cookieControlDenyAll()
      this.hideCookieSettingsModal()
    },
    acceptAll() {
      this.cookieControlAcceptAll()
      this.hideCookieSettingsModal()
    },
    closeModal() {
      this.hideCookieSettingsModal()
    },
  },
}
</script>

<style lang="scss" scoped></style>
