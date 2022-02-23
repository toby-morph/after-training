<template>
  <div class="flow relative">
    <UserComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback
      v-show="resetPwdFeedback.msg"
      :status="resetPwdFeedback.status"
    >
      {{ resetPwdFeedback.msg }}
    </UserFormFeedback>
    <form class="flow flex flex-col">
      <div v-for="(field, name, index) in form.fields" :key="index">
        <LibFormGroupInput
          v-if="field.el === 'input'"
          v-model.trim="$v.formData[field.name].$model"
          :field-name="field.name"
          :field-el="field.name"
          :input-type="field.inputType"
          :label="field.label"
          :instructions="field.instructions"
          :disabled="field.disabled"
          :placeholder="field.placeholder"
          :required="field.required"
          :feedback="field.feedback"
          :auto-focus="index === 0"
          :field-wrapper-classes="field.wrapperClasses"
          :v="$v.formData[field.name]"
        />
      </div>
      <LibBaseButton
        class="ml-auto"
        btn-class="btn-dark"
        :disabled="$v.$invalid"
        @click.prevent="submit"
      >
        <template #text>
          Request new password
        </template>
      </LibBaseButton>
    </form>
    <div class="flex flex-wrap gap-4 pt-6">
      <LibBaseLink
        class="ml-auto"
        :is-nuxt-link="true"
        link="/login"
        link-class="underline"
      >
        Log in
      </LibBaseLink>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      resetPwdFeedback: {
        msg: null,
        status: null,
      },
      resetPwdFeedbackMsgs: {
        username_does_not_exist:
          `The username you have entered has not been recognised. Please try again or contact ${this.$config.siteAdminEmail}`,
        success: 'You have been sent an email containing instructions on how to reset your password.',
        error:
          `There has been a problem with sending your password reset email. Please try again or contact ${this.$config.siteAdminEmail}`,
      },
      formData: {
        userName: null,
      },
      form: {
        submitStatus: null,
        fields: {
          userName: {
            el: 'input',
            inputType: 'email',
            name: 'userName',
            label: 'Username',
            feedback: [],
            instructions:
              'Username is the email with which you were registered on this site.',
          },
        },
      },
    }
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.form.submitStatus = 'PENDING'
        this.sendResetPwdEmail()
      }
    },
    async sendResetPwdEmail() {
      try {
        await this.$axios.post(
          this.$config.siteUrl + '/.netlify/functions/pwd-reset-send-email',
          {
            username: this.formData.userName,
          }
        )
        this.formFeedbackMsg = this.setResetPwdFeedbackMsg(
          this.resetPwdFeedbackMsgs.success,
          'success'
        )
        this.form.submitStatus = 'OK'
      } catch (error) {
        if (error.response.data === 'username does not exist') {
          this.formFeedbackMsg = this.setResetPwdFeedbackMsg(
            this.resetPwdFeedbackMsgs.username_does_not_exist,
            'warning'
          )
        } else {
          this.formFeedbackMsg = this.setResetPwdFeedbackMsg(
            this.resetPwdFeedbackMsgs.error,
            'warning'
          )
        }
        this.form.submitStatus = 'ERROR'
      }
    },
    closeLoginModal() {
      this.form.submitStatus = null
    },
    setResetPwdFeedbackMsg(msg = null, status = null) {
      this.resetPwdFeedback.msg = msg
      this.resetPwdFeedback.status = status
    },
  },
  validations: {
    formData: {
      userName: {
        required,
        email,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>