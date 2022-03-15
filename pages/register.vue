<template>
  <main class="main">
    <LibContentSectionWrapper>
      <UserRegister />
    </LibContentSectionWrapper>
  </main>
</template>

<script>
export default {
  auth: false,
  async middleware({ store, error }) {
    if (store.state.site.trialSites.length === 0) {
      try {
        const trialSites = await store.dispatch('site/setTrialSites')
        if (!trialSites) {
          throw new Error('Failed to load trial sites')
        } else {
          return true
        }
      } catch (err) {
        return error({ statusCode: 500, message: 'Failed to load trial sites' })
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>