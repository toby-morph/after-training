<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="strapline"
      :page-sub-title="step.step_subtitle"
    >
      <template #page-title>
        {{ step.step_title }}
      </template>
    </LibBasePageTitle>
    <LibContentSection
      v-for="(section, index) in step.step_content"
      :key="index"
      :section-id="`content-section-${index + 1}`"
      :section-type="section.type"
      :section="section"
      theme="mid"
    />
    <LibContentSectionWrapper>
      <LibBaseButton @click="sendUserCertificate">
        <template #text>
          Send user certificate
        </template>
      </LibBaseButton>
    </LibContentSectionWrapper>
    <span id="endOfContent" />
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { step } from '@/mixins/step.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  mixins: [step, GAMethods],
  data() {
    return {
      step: null,
    }
  },
  computed: {
    ...mapState({
      currentStep: (state) => parseInt(state.steps.currentStep),
    }),
    ...mapGetters('steps', ['getStepByNumber']),
  },
  mounted() {
    this.gaLogEvent('Finished')
  },
  created() {
    this.step = this.getStepByNumber(this.currentStep)
  },
  methods: {
    async sendUserCertificate() {
      try {
        const response = await this.$axios.post(
          this.$config.siteUrl + '/.netlify/functions/send-certificate',
          {
            userId: this.$auth.user.id,
          }
        )
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
  head() {
    return {
      title: this.step.step_metadata.html_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.step.step_metadata.html_desc,
        },
      ],
    }
  },
}
</script>

<style scss></style>
