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
    <span id="endOfContent" />
  </main>
</template>

<script>
import { page } from '@/mixins/page.js'
import { pageStrapline } from '@/mixins/pageStrapline.js'

const getPageContent = () =>
  import('~/content/pages/privacy-page.json').then((m) => m.default || m)

export default {
  mixins: [page, pageStrapline],
  async asyncData({ req }) {
    const page = await getPageContent()
    return { page }
  },
}
</script>

<style scss></style>
