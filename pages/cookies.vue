<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="pageStrapline"
    >
      <template #page-title>
        {{ page.page_title }}
      </template>
    </LibBasePageTitle>
    <LibContentSection
      v-for="(section, index) in page.page_content"
      :key="index"
      :section-id="`content-section-${(index + 1)}`"
      :section-type="section.type"
      :section="section"
      theme="mid"
    />
    <LibContentSectionWrapper v-if="cookieControlEnabled && nonNecessaryCookies">
      <div class="flow">
        <LibBaseProse>
          <LibBaseHtmlHeader level="2">
            What is my current cookie consent status?
          </LibBaseHtmlHeader>
          <template v-if="currentUserCookiePrefs === null">
            <p>
              You have not yet selected whether to
              <span class="uppercase">accept all</span> or
              <span class="uppercase">opt out</span> of all non-necessary cookies.
            </p>
          </template>
          <template v-else>
            <p>
              You have currently chosen to
              <span class="uppercase">{{ currentCookiePrefsText }}</span>
              non-necessary cookies.
            </p>
            <p>
              Your consent applies to the following domains:
              <a :href="siteUrl">{{ siteName }}</a>
            </p>
          </template>
        </LibBaseProse>
        <div
          class="
          bg-primary
          text-white
          rounded
          p-4
          flex flex-col
          flow
        "
        >
          <p>Update your preferences for non-necessary cookies:</p>
          <LibCookiesOptInOut class="ml-auto" />
        </div>
      </div>
    </LibContentSectionWrapper>
    <span id="endOfContent" />
  </main>
</template>

<script>
import { mapState } from 'vuex'

import { page } from '@/mixins/page.js'
import { pageStrapline } from '@/mixins/pageStrapline.js'

const getPageContent = () =>
  import('~/content/pages/cookie-policy.json').then((m) => m.default || m)

export default {
  mixins: [page, pageStrapline],
  async asyncData({ req }) {
    const page = await getPageContent()
    return { page }
  },
  computed: {
    ...mapState({
      currentUserCookiePrefs: (state) =>
        state.site.cookieNotice.currentUserCookiePrefs,
      siteName: (state) => state.site.siteDetails.siteName,
      siteUrl: (state) => state.site.siteDetails.siteUrl,
      nonNecessaryCookies: (state) =>
        state.site.cookieNotice.nonNecessaryCookies,
    }),
    currentCookiePrefsText() {
      return this.currentUserCookiePrefs ? 'accept all' : 'deny all'
    },
    cookieControlEnabled() {
      return this.$morphCookies
    },
  },
}
</script>

<style scss></style>
