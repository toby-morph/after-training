<template>
  <LibBaseModal
    :show="showUserResetModal"
    title="Are you a new or existing user?"
    @toggle-modal="closeModal"
  >
    <div
      class="
        flex flex-col
        space-y-4
        items-end
        sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-end
      "
    >
      <LibBaseButton
        theme="primary-filled"
        on-background="dark"
        @click="closeModal"
        v-on="$listeners"
      >
        <template
          v-slot:text
        >
          <slot>Continue as existing user</slot>
        </template>
      </LibBaseButton>
      <LibBaseButton
        theme="primary"
        on-background="dark"
        @click="resetDeviceForNewUser"
        v-on="$listeners"
      >
        <template
          v-slot:text
        >
          <slot>Start as a new user</slot>
        </template>
      </LibBaseButton>
    </div>
  </LibBaseModal>
</template>

<script>
import { GAMethods } from '@/mixins/GAMethods.js'
import { mapActions } from 'vuex'
export default {
  mixins: [GAMethods],
  data() {
    return {
      showUserResetModal: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.showUserResetModal = true
    }, 500)
  },
  methods: {
        ...mapActions('site', [
      'setHasRefreshed',
    ]),
    closeModal() {
      this.showUserResetModal = false
    },
    resetDeviceForNewUser() {
      this.$piTool.resetForNewUser()
      this.showUserResetModal = false
      this.setHasRefreshed(true)
      if (JSON.parse(this.$config.GA_Enabled)) {
        this.gaResetUser()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
