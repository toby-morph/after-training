<template>
  <article>
    <LibBaseVideo 
      :video-id="videoId" 
      :video-title="videoTitle"
      :offline-video="offlineVideo"
      :offline-video-thumbnail="offlineVideoThumbnail"
    />
    <div v-if="videoTranscript" class="flex flex-col items-end">
      <button
        :id="transcriptHeaderId"
        ref="transcriptToggleButton"
        :class="toggleBtnThemeClasses"
        class="py-1 my-1 focus:outline-none text-color-body"
        :aria-expanded="showTranscript.toString()"
        :aria-controls="transcriptPanelId"
        @click="toggleTranscript"
      >
        {{ transcriptBtnText }}
      </button>
      <div
        :id="transcriptPanelId"
        ref="videoTranscript"
        :aria-labelledby="transcriptHeaderId"
        :aria-hidden="showTranscript ? 'false' : 'true'"
        class="video-transcript h-0 overflow-hidden"
      >
        <div :class="transcriptThemeClasses" class="flow relative p-4">
          <LibBaseHtmlHeader
            v-show="videoTitle"
            level="1"
            header-font-size="4"
            :class="theme !== 'light' ? 'text-white' : 'text-color-h1'"
          >
            Transcript for {{ videoTitle }}
          </LibBaseHtmlHeader>
          <div class="flow text-color-body" v-html="$md.render(videoTranscript)" />
          <button
            class="sr-only focus:not-sr-only focus:outline-none"
            :class="
              theme !== 'light'
                ? 'focus:shadow-outline-on-dark'
                : 'focus:shadow-outline-on-light'
            "
            :tabindex="showTranscript ? '0' : '-1'"
            :aria-controls="transcriptPanelId"
            :aria-expanded="showTranscript.toString()"
            @click="toggleTranscript"
          >
            {{ transcriptBtnText }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { GAMethods } from '@/mixins/GAMethods.js'
export default {
    mixins: [GAMethods],
  props: {
    videoId: {
      type: String,
      default: null,
    },
    videoTitle: {
      type: String,
      default: 'Video title',
    },
    videoTranscript: {
      type: String,
      default: null,
    },
    offlineVideo: {
      type: String,
      default: null,
    },
    offlineVideoThumbnail: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      showTranscript: false,
    }
  },
  computed: {
    transcriptBtnText() {
      return this.showTranscript ? 'Close transcript' : 'Show transcript'
    },
    transcriptHeaderId() {
      return 'transcript-header-' + this._uid
    },
    transcriptPanelId() {
      return 'transcript-panel-' + this._uid
    },
    toggleBtnThemeClasses() {
      const toggleBtnThemeClasses = []
      if (this.theme !== 'light') {
        toggleBtnThemeClasses.push('focus:shadow-outline-on-dark')
      } else {
        toggleBtnThemeClasses.push('focus:shadow-outline-on-light')
      }
      return toggleBtnThemeClasses.join(' ')
    },
    transcriptThemeClasses() {
      let transcriptThemeClasses = []
      switch (this.theme) {
        case 'primary':
          transcriptThemeClasses = ['bg-primary-dark', 'text-white']
          break
        case 'secondary':
          transcriptThemeClasses = ['bg-secondary-dark', 'text-white']
          break
        default:
          transcriptThemeClasses = ['bg-grey-mid-light', 'text-color-body']
      }
      return transcriptThemeClasses.join(' ')
    },
  },
  methods: {
    toggleTranscript(event) {
      // console.log(this.$refs.videoTranscript)
      const targetTranscript = this.$refs.videoTranscript
      // const targetTranscript = event.target.nextElementSibling
      if (this.showTranscript) {
        // slide close
        this.$animations.slideUp(targetTranscript)
        this.$refs.transcriptToggleButton.focus()
      } else {
        // slide open
        this.$animations.slideDown(targetTranscript)
        this.gaLogEvent("Transcript Opened", { videoID: this.videoId, title: this.videoTitle } )
      }
      this.showTranscript = !this.showTranscript
    },
  },
}
</script>

<style lang="scss" scoped></style>
