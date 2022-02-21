<template>
  <figure>
    <template v-if="JSON.parse($config.useNuxtImageModule)">
      <nuxt-img
        :src="`/img/${src}`"
        :alt="alt"
        :width="width"
        :height="height"
        :sizes="sizes"
        :class="imgClass"
        loading="lazy"
      />
    </template>
    <template v-else>
      <img
        :src="require(`~/assets/img/${src}`)"
        :alt="alt"
        :width="width"
        :height="height"
        :class="imgClass"
        loading="lazy"
      >
    </template>
    <!-- use nuxt-image in production, not working in generated static storybook -->
    <!-- :src="require(`~/assets/img/${src}`)"
    loading="lazy" -->
    <figcaption v-if="caption" class="text-xs-small sm:text-small">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    sizes: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      default: null,
    },
    imgClass: {
      type: String,
      default: null,
    },
  },
}
</script>
