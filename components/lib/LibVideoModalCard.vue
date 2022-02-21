<template>
  <div>
    <LibCardImageText
      :theme="theme"
      :align="align"
      :whole-clickable="wholeClickable"
      :img-src="imgSrc"
      :img-alt="imgAlt"
      :img-sizes="imgSizes"
      :header-font-size="headerFontSize"
      :header-level="headerLevel"
      :title="title"
      :summary="summary"
      class="h-full transition-all duration-250 ease-out"
      @click="toggleVideoModal"
      @keyup.enter="toggleVideoModal"
    >
      <template #image-overlay>
        <PlayIcon
          class="
            transition-all
            duration-250
            ease-out
            absolute
            w-12
            h-12
            top-1/2
            left-1/2
            transform
            fill-primary
            -translate-x-1/2 -translate-y-1/2
            group-hover:w-14 group-hover:h-14
          "
          :class="videoCardIconClasses"
        />
      </template>
    </LibCardImageText>
    <template v-if="showVideoModal">
      <LibBaseModal
        :show="true"
        theme="primary"
        :title="videoTitle"
        @toggle-modal="toggleVideoModal"
      >
        <LibVideoWithTranscript
          :video-id="videoId"
          :video-title="videoTitle"
          :video-transcript="videoTranscript"
          theme="primary"
        />
      </LibBaseModal>
    </template>
  </div>
</template>

<script>
import PlayIcon from '@/assets/icons/circle-filled-play.svg?inline'

export default {
  components: {
    PlayIcon,
  },
  props: {
    imgSrc: {
      type: String,
      default: null,
    },
    imgAlt: {
      type: String,
      default: '',
    },
    imgSizes: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: 'white',
    },
    align: {
      type: String,
      default: 'center',
    },
    headerLevel: {
      type: String,
      default: '3',
    },
    headerFontSize: {
      type: String,
      default: '3',
    },
    wholeClickable: {
      type: Boolean,
      default: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    videoTitle: {
      type: String,
      required: true,
    },
    videoTranscript: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showVideoModal: false,
    }
  },
  computed: {
    videoCardIconClasses() {
      let videoCardIconClasses = []
      switch (this.theme) {
        case 'primary':
          videoCardIconClasses = ['group-hover:fill-primary-dark']
          break
        case 'secondary':
          videoCardIconClasses = ['group-hover:fill-secondary-dark']
          break
        default:
          videoCardIconClasses = ['group-hover:fill-grey-light']
      }
      return videoCardIconClasses.join(' ')
    },
  },
  methods: {
    toggleVideoModal() {
      this.showVideoModal = !this.showVideoModal
    },
  },
}
</script>

<style lang="scss" scoped></style>
