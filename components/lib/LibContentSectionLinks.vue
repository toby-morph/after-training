<template>
  <div class="flex flex-col space-y-4 items-start">
    <LibBaseButtonLink
      v-for="(link, index) in links"
      :key="index"
      :link-url="link.url"
      :open-new-tab="link.target"
      :log-event="link.logEvent"
      :log-event-property="link.logEventProperty"
      theme="primary"
      on-background="light"
    >
      <template #text>
        {{ link.title }}
      </template>
    </LibBaseButtonLink>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>