<template>
  <div>
    <video
      v-if="$nuxt.isOffline"
      controls
      style="width: 100%"
      :src="require(`~/assets/img/${offlineVideo}`)"
      type="video/mp4"
      :poster="require(`~/assets/img/${offlineVideoThumbnail}`)"
      crossOrigin="anonymous"
      @play="vidPlay"
      @pause="videoPause"
      @ended="vidEnd"
    >
      Your browser does not support HTML5 video.
    </video>
    <vimeo-player
      v-if="$nuxt.isOnline"
      ref="player"
      class="embed-responsive aspect-ratio-16/9"
      :video-id="videoId"
      :video-title="videoTitle"
      :player-height="height"
      :options="options"
      @play="VidPlay"
      @pause="VidPause"
      @ended="VidEnd"
    />
  </div>
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
  },
  data() {
    return {
      // videoID: this.video.vimeo_id, // '141851770' test vid
      // videoUrl: '1234',
      height: 600,
      title: 0,
      options: {
        color: 'var(--secondary)',
        title: 0,
        byline: 0,
        portrait: 0,
      },
      playerReady: false,
      videoStarted: false,
      videoFinished: false,
      eventText: '',
      videoDuration: -1,
    }
  },
  computed: {
    // // eslint-disable-next-line vue/return-in-computed-property
    offLineVideo() {
      return '/video/' + this.videoId + '.mp4'
    },
  },
  mounted() {
    if (this.$refs.player) {
      this.gaLogEvent('Video Available', { videoID: this.videoId})
    }
    this.$root.$on('movedNextPage', (data) => {
      if (this.$refs.player) {
        this.$refs.player.player.getDuration().then((duration) => {
          this.videoDuration = duration
        })
        this.$refs.player.player.getCurrentTime().then((seconds) => {
          let videoProgress
          if (this.videoFinished) {
            videoProgress = 100
            seconds = this.videoDuration
          } else {
            videoProgress = (seconds / this.videoDuration) * 100
          }
          this.gaLogEvent('Video Progress (%)', { videoID: this.videoId, videoTitle: this.videoTitle, video_progress_percent : Math.trunc(videoProgress) })
          this.gaLogEvent('Video Time Watched (s)', { videoID: this.videoId, videoTitle: this.videoTitle, Seconds : seconds })
        })
      }
    })
  },
  methods: {
    VidPlay(event) {
      if (this.videoFinished) {
        this.gaLogEvent('Video Restarted', { videoID: this.videoId, videoTitle: this.videoTitle })
      } else if (this.videoStarted) {
        // event not available here 
        this.gaLogEvent('Video Resumed', { videoID: this.videoId, videoTitle: this.videoTitle })
      } else {
        this.gaLogEvent('Video Started', { videoID: this.videoId, videoTitle: this.videoTitle })
        this.videoStarted = true
      }
    },
    VidEnd(event) {
      this.videoFinished = true
      this.gaLogEvent('Video Finished', { videoID: this.videoId, videoTitle: this.videoTitle })
    },
    VidPause(event) {
      if (event.percent < 0.98 && event.percent !== 0) {
  // title = The title of the video
        this.gaLogEvent('Video Paused', { videoID: this.videoId, videoTitle: this.videoTitle, Seconds : event.seconds })
      }
    },
    // Not sure how to test the below / if it works
    // Video paused (also happens when video closed while playing)
    videoPause(data) {
      if (data.percent < 0.98 && data.percent !== 0) {
      this.gaLogEvent('Video Paused', {
        title: this.videoTitle,
        Seconds : data.seconds,
        percentPlayed: 100 * (data.target.currentTime / data.target.duration),
      })
    }
    }
  },
}
</script>
