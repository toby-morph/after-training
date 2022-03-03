<template>
  <main class="main flex items-center justify-center">
    <div class="w-5/6 max-w-lg bg-white rounded-lg p-8 mt-8 flow">
      <LibBaseHtmlHeader level="1" header-font-size="3">
        Register
      </LibBaseHtmlHeader>
      <UserRegister />
    </div>
  </main>
</template>

<script>
export default {
  auth: false,
  async middleware({ store, commit }) {
    if (store.state.site.trialSites.length === 0) {
      try {
        const trialSites = await store.dispatch('site/setTrialSites')
        commit('SET_TRIAL_SITES', trialSites.data)
        return true
      } catch (err) {
        return this.$nuxt.error({ statusCode: 404, message: 'err message' })
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>