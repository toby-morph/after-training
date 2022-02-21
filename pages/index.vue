<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="page.page_strapline"
    >
      <template #page-title>
        {{ page.page_title }}
      </template>
    </LibBasePageTitle>
    <LibContentSectionWrapper theme="mid">
      <LibLayoutCardGrid :max-cards-per-row="2">
        <LibBaseCard
          theme="secondary"
          max-card-width="max-w-none"
          :whole-clickable="true"
          @click="loadStepsVersion('staging')"
          @keyup.enter="loadStepsVersion('staging')"
        >
          <div class="relative">
            <LibBaseImg
              img-class="rounded-t-lg"
              src="16-9-video-thumb-2-1000w-576x324.png"
              alt=""
            />
            <div
              class="
              absolute
              rounded-tl-lg
              bottom-0
              right-0
              p-2
              bg-secondary
              group-hover:bg-secondary-dark
              transition-color
              duration-200
            "
            >
              {{ currVersionStatusText('staging') }}
            </div>
          </div>
          <div class="flow px-4 pb-4">
            <LibBaseHtmlHeader
              level="2"
              header-font-size="3"
            >
              <slot name="title">
                For staging
              </slot>
            </LibBaseHtmlHeader>
            <p>
              <slot
                name="summary"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </slot>
            </p>
          </div>
        </LibBaseCard>
        <LibBaseCard
          theme="primary"
          max-card-width="max-w-none"
          :whole-clickable="true"
          @click="loadStepsVersion('master')"
          @keyup.enter="loadStepsVersion('master')"
        >
          <div class="relative">
            <LibBaseImg
              img-class="rounded-t-lg"
              src="16-9-video-thumb-1-1000w-576x324.png"
              alt=""
            />
            <div
              class="
              absolute
              rounded-tl-lg
              bottom-0
              right-0
              p-2
              bg-primary
              group-hover:bg-primary-dark
              transition-color
              duration-200
            "
            >
              {{ currVersionStatusText('master') }}
            </div>
          </div>
          <div class="flow px-4 pb-4">
            <LibBaseHtmlHeader
              level="2"
              header-font-size="3"
            >
              <slot name="title">
                For master
              </slot>
            </LibBaseHtmlHeader>
            <p>
              <slot
                name="summary"
              >
                Blanditiis aliquid, nemo rerum ad deserunt cumque aperiam?
              </slot>
            </p>
          </div>
        </LibBaseCard>
      </LibLayoutCardGrid>
    </LibContentSectionWrapper>
    <LibContentSection
      v-for="(section, index) in page.page_content"
      :key="index"
      :section-id="`content-section-${(index + 1)}`"
      :section-type="section.type"
      :section="section"
    />
    <span id="endOfContent" />
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// eslint-disable-next-line
import { page } from '@/mixins/page.js'
import { scrolledToBottom } from '@/mixins/scrolledToBottom.js'
import { pageTransitions } from '@/mixins/pageTransitions.js'

const getPageContent = () =>
  import('~/content/pages/landing-page.json').then((m) => m.default || m)

export default {
  // layout: 'version-landing',
  mixins: [page, scrolledToBottom, pageTransitions],
  async asyncData({ req }) {
    const page = await getPageContent()
    return { page }
  },
  computed: {
    ...mapState({
      currentStepsVersion: (state) => state.steps.currentStepsVersion,
      currentStep: (state) => state.steps.currentStep,
      isMultiVersion: (state) => state.site.isMultiVersion,
    }),
    currVersionClasses() {
      const currVersionClasses = [
        'bg-primary',
        'text-white',
        'group-hover:bg-primary-dark',
      ]
      return currVersionClasses.join(' ')
    },
    altVersionClasses() {
      const altVersionClasses = [
        'bg-grey-light',
        'text-primary',
        'group-hover:bg-secondary',
        'group-hover:text-white',
      ]
      return altVersionClasses.join(' ')
    },
  },
  methods: {
    ...mapActions('site', ['setScrolledToBottom']),
    ...mapActions('steps', ['setCurrentStepsVersion', 'emptySteps']),
    isCurrentVersion(version) {
      return version === this.currentStepsVersion
    },
    currVersionStatusText(version) {
      return this.isCurrentVersion(version)
        ? 'Current version'
        : 'Change version'
    },
    resetStepsStore() {
      // set steps data in store to empty array
      // this.loadAllSteps([])
      this.emptySteps()
      this.$piTool.resetForNewUser()
    },
    loadStepsVersion(version) {
      const route = this.$piTool.lastStepVisited() > 0 ? this.$piTool.lastStepVisitedRoute() : '/get-started'
      // set vuex stepsVersion
      if (!this.isCurrentVersion(version)) {
        this.resetStepsStore()
        this.setCurrentStepsVersion(version)
      }
      this.$router.push(route)
    },
  },
}
</script>

<style scss></style>
