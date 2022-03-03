<template>
  <main class="main">
    <div class="flex items-center justify-center py-8">
      <div class="w-5/6 max-w-4xl bg-white rounded-lg p-8 flow">
        <LibBaseHtmlHeader level="1" header-font-size="3">
          AFTER intervention training feedback
        </LibBaseHtmlHeader>
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