<template>
  <main class="main flex items-center justify-center">
    <div class="w-5/6 max-w-lg bg-white rounded-lg p-8 mt-8 flow">
      <LibBaseHtmlHeader level="1" header-font-size="3">
        Log-in
      </LibBaseHtmlHeader>
      <UserLoginForm />
    </div>
  </main>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  mounted(){
    this.logOutExistingUser()
  },
  methods: {
    // ...mapActions('steps', ['resetStepsStore']),
    // ...mapActions('trainee', ['resetTraineeStore']),
    logOutExistingUser(){
      if(this.$auth){
        this.$auth.logout()
        // this.resetStepsStore()
        // this.resetTraineeStore()
      }
    }    
  }
}
</script>

<style lang="scss" scoped></style>