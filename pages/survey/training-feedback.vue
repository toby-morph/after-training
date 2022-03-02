<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="siteStrapline"
    >
      <template #page-title>
        Training feedback
      </template>
    </LibBasePageTitle>
    <div class="flex items-center justify-center container mx-auto">
      <div class="w-5/6 max-w-4xl bg-white rounded-lg p-8 flow">
        <SurveyTrainingFeedback />
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