<template>
  <LibLayoutCardGrid :max-cards-per-row="cardsPerRow">
    <template v-if="sectionType === 'video_cards'">
      <LibVideoModalCard
        v-for="(videoModalCard, index) in cards"
        :key="index"
        :img-src="videoModalCard.image.url"
        :img-alt="videoModalCard.image.alt"
        :img-sizes="imgSizes"
        :title="videoModalCard.title"
        :summary="videoModalCard.summary"
        :header-font-size="headerFontSize"
        :header-level="headerLevel"
        :align="align"
        :whole-clickable="wholeClickable"
        :video-id="videoModalCard.video.vimeo_id"
        :video-title="videoModalCard.video.video_title"
        :video-transcript="videoModalCard.video.video_transcript"
        :theme="theme"
      >
        <template #title>
          {{ videoModalCard.title }}
        </template>
        <template #summary>
          {{ videoModalCard.summary }}
        </template>
      </LibVideoModalCard>
    </template>

    <template v-else>
      <LibCardImageText
        v-for="(card, index) in cards"
        :key="index"
        :img-src="card.image.url"
        :img-alt="card.image.alt"
        :img-width="card.image.width"
        :img-height="card.image.height"
        :img-sizes="imgSizes"
        :title="card.title"
        :summary="card.summary"
        :header-font-size="headerFontSize"
        :header-level="headerLevel"
        :align="align"
        :whole-clickable="wholeClickable"
        :theme="theme"
        :link="card.link ? card.link.url : null"
        :is-nuxt-link="card.isExternalLink ? false : true"
      >
        <template #image-overlay>
          <div
            v-if="numberedCards"
            class="
            absolute
            bottom-0
            right-0
            h-12
            w-12
            flex
            items-center
            justify-center
            text-white
            transition-color
            duration-200
            font-bold
            text-h4
            rounded-tl-lg
          "
            :class="
              wholeClickable
                ? `bg-${theme} group-hover:bg-${theme}-dark`
                : `bg-${theme} `
            "
          >
            {{ index + 1 }}
          </div>
        </template>
      </LibCardImageText>
    </template>
  </LibLayoutCardGrid>
</template>

<script>
export default {
  props: {
    sectionType: {
      type: String,
      default: 'text_and_image',
    },
    cards: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
    },
    maxCardsPerRow: {
      type: Number,
      default: 3,
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
      default: false,
    },
    numberedCards: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardsPerRow() {
      return this.maxCardsPerRow
        ? this.maxCardsPerRow
        : this.getMaxCardsPerRow()
    },
    imgSizes() {
      let imgSizes = null
      switch (this.maxCardsPerRow) {
        case 2:
          imgSizes = 'sm:100vw md:332px lg:442px xl:448px'
          break
        case 3:
          imgSizes = 'sm:100vw md:216px lg:289px xl:363px'
          break
        case 4:
          imgSizes = 'sm:100vw lg:332px xl:268px'
          break
        default:
      }
      return imgSizes
    },
  },
  methods: {
    getMaxCardsPerRow() {
      const totalCards = this.cards.length
      let maxCardsPerRow = totalCards
      if (totalCards > 4) {
        if (totalCards % 3 === 0 || totalCards === 5) {
          maxCardsPerRow = 3
        } else {
          maxCardsPerRow = 4
        }
      }
      return maxCardsPerRow
    },
    clickHandler(link){

    }
  },
}
</script>

<style lang="scss" scoped></style>
