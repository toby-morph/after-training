<template>
  <main class="main">
    <LibContentSectionWrapper>
      <SurveyTrainingFeedback />
    </LibContentSectionWrapper>
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