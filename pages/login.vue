<template>
  <main class="main">
    <LibContentSectionWrapper>
      <UserLoginForm />
    </LibContentSectionWrapper>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  mixins: [GAMethods],
  mounted(){
    this.logOutExistingUser()
  },
  methods: {
    ...mapActions('steps', ['resetUserStepsStore']),
    ...mapActions('trainee', ['resetTraineeStore']),
    logOutExistingUser(){
      if(this.$auth){
        this.$auth.logout()
        this.resetUserStepsStore()
        this.resetTraineeStore()
        this.gaLogEvent('User: log out')
      }
    }    
  }
}
</script>

<style lang="scss" scoped></style>