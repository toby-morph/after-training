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