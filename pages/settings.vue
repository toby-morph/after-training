<template>
  <main class="main">
    <LibBasePageTitle :page-strapline="pageStrapline">
      <template #page-title>
        Settings
      </template>
    </LibBasePageTitle>
    <LibContentSectionWrapper v-if="preCacheLoading" theme="mid">
      <PitAdminNotice
        show="true"
        :notice-type="preCacheLoadingComplete ? 'notice' : 'inProgress'"
      >
        <h3>{{ cacheHeading }}</h3>
        <p>{{ cacheMessage }}</p>
        <div class="relative">
          <div
            :class="preCacheLoadingComplete ? '' : 'animate-pulse'"
            class="
              overflow-hidden
              h-2
              mb-4
              text-xs
              flex
              rounded
              bg-primary-light
            "
          >
            <div
              :style="'width:' + preCacheLoadingProgress"
              class="
                shadow-none
                flex flex-col
                text-center
                whitespace-nowrap
                text-white
                justify-center
                bg-primary-dark
              "
            />
          </div>
        </div>

        <p v-if="preCacheLoadingComplete">
          Cache refresh complete
        </p>
        <p v-else class="break-words">
          Currently caching file {{ preCacheCurrentCount }} of
          {{ preCacheTotalCount }}:
          {{ preCacheCurrentFile }}
        </p>
      </PitAdminNotice>
      <LibBaseModal
        :show-close="false"
        :show="showModal"
        title="Offline content now available"
      >
        <p>You can now use this device</p>
        <LibBaseButton
          theme="primary-filled"
          on-background="dark"
          @click="showModal = false"
        >
          <template v-slot:text>
            Close
          </template>
        </LibBaseButton>
      </LibBaseModal>
    </LibContentSectionWrapper>
    <!-- User reset -->
    <LibContentSectionWrapper theme="mid">
      <LibBaseProse>
        <h2>User progress settings</h2>
        <p>
          We record the user's progress through the tool so it is clear which
          step they have reached and they do not need to start again if they go
          back or leave and return to the tool.
        </p>
        <PitAdminAction>
          <template v-slot:action-header>
            User progress reset popup
          </template>
          <template v-slot:action-feedback>
            <PitAdminNotice
              :show="true"
              :notice-type="deviceUserResetEnabled ? 'notice' : 'warning'"
            >
              User reset pop up is currently
              <span class="font-bold">{{
                deviceUserResetEnabled ? 'enabled' : 'disabled'
              }}</span>
            </PitAdminNotice>
          </template>
          <template v-slot:action-text>
            <p>
              Enabling this setting adds a pop-up on the 'Get Started' page
              asking the user whether they want to "Start as a new user" (which
              will reset progress) or "Continue as existing user" (not reset
              progress). We recommend this is enabled if this device will be
              shared by different users.
            </p>
          </template>
          <template v-slot:action-button>
            <LibBaseButton
              theme="primary-filled"
              on-background="light"
              @click="enableUserDeviceReset"
              v-on="$listeners"
            >
              <template
                v-slot:text
              >
                <slot>
                  {{ !deviceUserResetEnabled ? 'Enable' : 'Disable' }} user
                  reset
                </slot>
              </template>
            </LibBaseButton>
          </template>
        </PitAdminAction>
        <PitAdminAction>
          <template
            v-slot:action-header
          >
            Manually reset device for new user
          </template>
          <template v-slot:action-feedback>
            <PitAdminNotice
              :show="userProgressReset"
              class="mt-4"
            >
              This device has been reset for a new user
            </PitAdminNotice>
          </template>
          <template v-slot:action-text>
            <p>
              This is a manual reset of the device so that information about
              progress is removed.
            </p>
          </template>
          <template v-slot:action-button>
            <LibBaseButton
              theme="primary-filled"
              on-background="light"
              @click="resetDeviceForNewUser"
              v-on="$listeners"
            >
              <template
                v-slot:text
              >
                <slot>Reset device for new user</slot>
              </template>
            </LibBaseButton>
          </template>
        </PitAdminAction>
      </LibBaseProse>
    </LibContentSectionWrapper>

    <!-- Offline settings and functionality -->
    <template>
      <LibContentSectionWrapper theme="mid">
        <LibBaseProse>
          <h2>Offline settings</h2>
          <template v-if="!siteOfflineEnabled">
            <PitAdminNotice notice-type="warning" :show="true">
              <p>
                Offline is currently disabled on this site. Please contact
                <a href="mailto:info@digitrial.com">info@digitrial.com</a> to
                enable this app to be used offline.
              </p>
            </PitAdminNotice>
          </template>
          <template v-else>
            <PitAdminAction>
              <template v-slot:action-header>
                Offline status
              </template>
              <template v-slot:action-text>
                <p>
                  When offline is enabled, and once all necessary files have
                  been downloaded, the site is able to be viewed on devices not
                  connected to the internet.
                </p>
              </template>
              <template v-slot:action-feedback>
                <PitAdminNotice
                  :show="true"
                  :notice-type="deviceOfflineEnabled ? 'notice' : 'warning'"
                  class="mt-4"
                >
                  Offline is currently
                  <span class="font-bold">{{
                    deviceOfflineEnabled ? 'enabled' : 'disabled'
                  }}</span>
                  on this device
                </PitAdminNotice>
              </template>
              <template v-slot:action-button>
                <LibBaseButton
                  theme="primary-filled"
                  on-background="light"
                  :disabled="$nuxt.isOffline"
                  @click="toggleDeviceOfflineEnabled"
                  v-on="$listeners"
                >
                  <template
                    v-slot:text
                  >
                    <slot>
                      <template
                        v-if="deviceOfflineEnabled"
                      >
                        Disable offline
                      </template><template v-else>
                        Enable offline
                      </template>
                    </slot>
                  </template>
                </LibBaseButton>
              </template>
            </PitAdminAction>
            <template v-if="deviceOfflineEnabled">
              <PitAdminAction>
                <template v-slot:action-header>
                  Offline last refresh
                </template>
                <template v-slot:action-feedback>
                  <PitAdminNotice
                    :show="isRefreshingContent"
                    notice-type="inProgress"
                    class="mt-4"
                  >
                    Please wait while the page reloads...
                  </PitAdminNotice>
                </template>
                <template v-slot:action-text>
                  <p>
                    Offline content was last manually refreshed at
                    {{ dateOfLastManualRefresh }}. Note that some items in the
                    cache may have been automatically refreshed since this date.
                  </p>
                  <p v-if="$nuxt.isOffline" class="mb-4 md:mb-0 md:mr-4">
                    You are currently offline, please connect to a reliable
                    internet connection before refreshing offline content
                  </p>
                </template>
                <template v-slot:action-button>
                  <LibBaseButton
                    theme="primary-filled"
                    on-background="light"
                    class="flex-shrink-0 ml-auto"
                    :disabled="$nuxt.isOffline"
                    v-on="$listeners"
                    @click="refreshCacheAndReload"
                  >
                    <template
                      v-slot:text
                    >
                      <slot>Refresh offline content</slot>
                    </template>
                  </LibBaseButton>
                </template>
              </PitAdminAction>
            </template>
          </template>
        </LibBaseProse>
      </LibContentSectionWrapper>
    </template>
    <span id="endOfContent" />
  </main>
</template>

<script>
// import { cacheNames } from 'workbox-core'
// import { PrecacheController } from 'workbox-precaching'
// import { matchPrecache, PrecacheController } from 'workbox-precaching'
// import { cleanupOutdatedCaches } from 'workbox-precaching'

import { mapState, mapActions } from 'vuex'
import { pageStrapline } from '@/mixins/pageStrapline.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  
  mixins: [pageStrapline, GAMethods],
  
  data() {
    return {
      isRefreshingContent: false,
      userProgressReset: false,
      preCacheLoading: false,
      preCacheLoadingTime: 300000,
      preCacheCurrentFile: null,
      // preCacheLoadingTimeRemainingStr: null,
      preCacheLoadingProgress: 0,
      preCacheLoadingComplete: false,
      showModal: false,
      cacheHeading: 'Refreshing offline content',
      cacheMessage: 'Please remain on this page until complete',
    }
  },
  computed: {
    dateOfLastManualRefresh() {
      const timestamp = this.cacheRefreshedDate
      const date = new Date(timestamp)
      const datevalues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ]
      const dateOfLastManualRefresh =
        this.zeroPad(datevalues[3]) +
        ':' +
        this.zeroPad(datevalues[4]) +
        ' on ' +
        this.zeroPad(datevalues[2]) +
        '/' +
        this.zeroPad(datevalues[1]) +
        '/' +
        datevalues[0]
      return dateOfLastManualRefresh
    },
    siteOfflineEnabled() {
      return JSON.parse(this.$config.offlineEnabled)
    },
    ...mapState({
      deviceOfflineEnabled: (state) => state.site.deviceOfflineEnabled,
      deviceUserResetEnabled: (state) => state.site.deviceUserResetEnabled,
      cacheRefreshedDate: (state) => state.site.cacheRefreshedDate,
      siteName: (state) => state.site.siteDetails.siteName,
      preCacheSize: (state) => state.site.preCacheSize,
      preCacheTotalCount: (state) => state.site.preCacheTotalCount,
      preCacheCurrentCount: (state) => state.site.preCacheCurrentCount,
    }),
  },
  mounted() {
    if (this.$route.query.refreshcache) {
      this.preCacheLoading = true
      this.unregisterSwAndEmptyCache()
      this.initPreCacheLoadingProgress()
    }
  },
  methods: {
    ...mapActions('site', [
      'setDeviceOfflineEnabled',
      'setCacheRefreshedDate',
      'setDeviceUserResetEnabled',
      'setPreCacheCurrentCount',
    ]),
    ...mapActions('steps', ['setTotalActiveSteps']),
    zeroPad(value) {
      return value < 10 ? '0' + value : value
    },
    toggleDeviceOfflineEnabled() {
      // toggle deviceOfflineEnabled to opposite of current setting
      const deviceOfflineEnabled = !this.deviceOfflineEnabled
      if (deviceOfflineEnabled) {
        // if enabling offline - refresh page to load sw
        // this.setCacheRefreshedDate(Date.now())
        this.unregisterSwAndEmptyCache()
        this.refreshPage()
        this.setCacheRefreshedDate(Date.now())
      } else {
        // if not - unregister sw and empty cache
        this.unregisterSwAndEmptyCache()
      }
      // register this decision in store and in localStorage (via vuex-persist)
      this.setDeviceOfflineEnabled(deviceOfflineEnabled)
    },
    refreshPage() {
      setTimeout(function () {
        this.isRefreshingContent = false
        window.location.replace('?refreshcache=true')
      }, 500)
    },
    unregisterSwAndEmptyCache() {
      // see https://stackoverflow.com/questions/54376355/clear-workbox-cache-of-all-content
      // need to - in response to client-side event 1. clear cache 2. refresh cache
      if ('serviceWorker' in navigator) {
        this.isRefreshingContent = true
        navigator.serviceWorker
          .getRegistrations()
          .then(function (registrations) {
            for (const registration of registrations) {
              registration.unregister().then(function (boolean) {
                if (boolean) {
                  // Remove caches too!! (source: https://stackoverflow.com/a/57149239)
                  if ('caches' in window) {
                    caches.keys().then(function (keyList) {
                      return Promise.all(
                        keyList.map(function (key) {
                          return caches.delete(key)
                        })
                      )
                    })
                  }
                }
              })
            }
          })
      }
    },
    refreshCacheAndReload() {
      this.setCacheRefreshedDate(Date.now())
      this.unregisterSwAndEmptyCache()
      this.refreshPage()
    },
    unregisterSw() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .getRegistration('/')
          .then(function (registration) {
            // console.log(registration)
            if (registration) {
              // console.log('unregister sw')
              registration.unregister()
            } else {
              // console.log('failed to unregister sw')
            }
          })
      }
    },
    resetDeviceForNewUser() {
      this.$piTool.resetForNewUser()
      this.userProgressReset = true
      this.gaResetUser()
    },
    enableUserDeviceReset() {
      this.setDeviceUserResetEnabled(!this.deviceUserResetEnabled)
    },
    initPreCacheLoadingProgress() {
      let progress = 0
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { eventType } = event.data.payload
        if ((eventType === 'cacheWillUpdate') & event.isTrusted) {
          const { url } = event.data.payload
          this.preCacheCurrentFile = url
        }
        if ((eventType === 'cacheDidUpdate') & event.isTrusted) {
          // console.log(event)
          const { preCacheCount } = event.data.payload
          this.setPreCacheCurrentCount(preCacheCount)
          progress = 100 * (this.preCacheCurrentCount / this.preCacheTotalCount)
          // this.preCacheCurrentFile = url
          this.preCacheLoadingProgress = progress + '%'
        }
        if (progress === 100) {
          this.preCacheLoadingComplete = true
          this.isRefreshingContent = false
          this.cacheHeading = 'Offline content now available'
          this.cacheMessage = 'You can now use this device'
          this.showModal = true
        }
      })
    },
  },
  head() {
    return {
      title: this.siteName + ' - App Settings',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Device admin including offline settings',
        },
      ],
    }
  },
}
</script>

<style scss></style>
