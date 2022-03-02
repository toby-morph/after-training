<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="siteStrapline"
    >
      <template #page-title>
        Training feedback
      </template>
    </LibBasePageTitle>
    <div class="flex items-center justify-center">
      <div class="w-5/6 max-w-2xl bg-white rounded-lg p-8 flow">
        <LibBaseHtmlHeader level="1" header-font-size="3">
          AFTER intervention training log
        </LibBaseHtmlHeader>
        <SurveyTrainingLog />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      siteStrapline: (state) => state.site.siteDetails.siteStrapline,
    }),
  },
}
</script>

<style lang="scss" scoped></style>