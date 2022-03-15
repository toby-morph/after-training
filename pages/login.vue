<template>
  <main class="main">
    <LibContentSectionWrapper>
      <UserLoginForm />
    </LibContentSectionWrapper>
  </main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
      }
    }    
  }
}
</script>

<style lang="scss" scoped></style>