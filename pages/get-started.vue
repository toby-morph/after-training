<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="strapline"
      :page-sub-title="step.step_subtitle"
    >
      <template #page-title>
        {{ step.step_title }}
      </template><template #additional-content>
        <LibPageContentList
          v-if="hasContentList"
          :links="step.page_content_list.content_links"
          :back-to-top="true"
          :back-to-top-position-classes="[
            'bottom-20',
            'right-2',
            'md:bottom-28',
          ]"
        />
      </template>
    </LibBasePageTitle>
    <LibContentSection
      v-for="(section, index) in step.step_content"
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
import { mapState, mapGetters } from 'vuex'

import { step } from '@/mixins/step.js'
import { scrolledToBottom } from '@/mixins/scrolledToBottom.js'
import { pageTransitions } from '@/mixins/pageTransitions.js'

export default {
  mixins: [step, scrolledToBottom, pageTransitions],
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
    this.setScrolledToBottom(false)
  },
  created() {
    this.step = this.getStepByNumber(this.currentStep)
  },
}
</script>

<style scss></style>
