import { mapState, mapActions } from 'vuex'

export const scrolledToBottom = {
  computed: {
    ...mapState({
      scrolledToBottom: (state) => state.site.scrolledToBottom,
      isScrolling: (state) => state.steps.isScrolling,
    }),
  },
  methods: {
    ...mapActions('site', ['setScrolledToBottom']),
    lastContentElementViewed() {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.setScrolledToBottom(true)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 1, rootMargin: '0px 0px -60px 0px' }
      )

      const endOfContent = document.getElementById('endOfContent')
      observer.observe(endOfContent)
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.lastContentElementViewed()
    // })
    setTimeout(this.lastContentElementViewed, 1000)
  },
}
