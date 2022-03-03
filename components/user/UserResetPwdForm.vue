<template>
  <div class="flow relative">
    <WidgetComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback
      v-show="formFeedback.msg"
      :status="formFeedback.status"
    >
      <p v-html="formFeedback.msg" />
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
        btn-class="btn-dark"
        class="ml-auto"
        :disabled="$v.$invalid || !validQueryParams"
        @click.prevent="submit"
      >
        <template #text>
          Reset password
        </template>
      </LibBaseButton>
    </form>
    <UserFormFooter>
      <LibBaseLink
        :is-nuxt-link="true"
        :link="loginLink"
        link-class="underline"
      >
        Log in
      </LibBaseLink>
      <LibBaseLink
        class="ml-auto"
        :is-nuxt-link="true"
        link="/reset-pwd-request"
        link-class="underline"
      >
        Send password reset email
      </LibBaseLink>
    </UserFormFooter>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        invalid_params: `Please click the link in the password reset email you were sent. If you have not received an email, please check your junk folders or <a class="underline" href="/reset-pwd-request">request a new password reset email</a>`,
        username_does_not_exist:
          `The username you have entered has not been recognised. Please try again or contact ${this.$config.siteAdminEmail}`,
        password_reset_key_invalid: `Your password reset has expired. <a class="underline" href="/reset-pwd-request">Request a new password reset email</a>`,
        password_format_invalid: `Your new password is not strong enough. Please meet the requirements specified next to the 'New password' field`,
        success: `Your password has been updated. Please <a class="underline" href="/login?login=${this.$route.query.login}">log-in</a>`,
        error:
          `There has been a problem with resetting your password. Please try again or contact ${this.$config.siteAdminEmail}`,
      },
      formData: {
        newPassword: null,
        // confirmNewPassword: null,
      },
      form: {
        submitStatus: null,
        fields: {
          newPassword: {
            el: 'input',
            inputType: 'password',
            name: 'newPassword',
            label: 'New password',
            feedback: [],
            instructions: 'Passwords must be at least 8 characters long, and contain at least one each of upper and lower case letters, numbers and special characters (#?!@$%^&*-)',
          },
        },
      },
    }
  },
  computed: {
    passwordResetKey(){
      return this.$route.query.key ? this.$route.query.key : null
    },
    userName(){
      return this.$route.query.login ? this.$route.query.login : null
    },
    validQueryParams(){
      return this.userName && this.passwordResetKey
    },
    loginLink(){
      const lastStepVisited = this.$piTool.lastStepVisitedRoute()
      let loginLink = `${lastStepVisited}?action=reset-pwd`
      loginLink = this.userName ? `${loginLink}&login=${this.userName}` : loginLink
      return loginLink
    }
  },
  mounted() {
    if(!this.validQueryParams){
      this.setFormFeedbackMsg(this.formFeedbackMsgs.invalid_params, 'warning')
    }
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else if(this.validQueryParams){
          this.form.submitStatus = 'PENDING'
          this.resetPassword()
        }
    },
    async resetPassword() {
      try {
        await this.$axios.post(
          this.$config.siteUrl + '/.netlify/functions/pwd-reset/',
          {
            new_password: this.formData.newPassword,
            key: this.passwordResetKey,
            username: this.userName
          }
        )
        this.form.submitStatus = 'OK'
        this.$router.push(this.loginLink)

      } catch (error) {
        this.form.submitStatus = 'ERROR'
        if (error.response.data === 'username does not exist') {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.username_does_not_exist,
            'warning'
          )
        } else if(error.response.data === 'password reset key invalid') {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.password_reset_key_invalid,
            'warning'
          )
        } else if(error.response.data === 'password format is invalid') {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.password_format_invalid,
            'warning'
          )
        } else {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.error,
            'warning'
          )
        }
        
      }
    },
    setFormFeedbackMsg(msg = null, status = null) {
      this.formFeedback.msg = msg
      this.formFeedback.status = status
    },
  },
  validations: {
    formData: {
      newPassword: {
        required,
        minLength: minLength(8),
        validPassword(value) {
          const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return (
            containsUppercase &&
            containsLowercase &&
            containsNumber &&
            containsSpecial
          )
        },
      },
      // confirmNewPassword: {
      //   required,
      //   sameAsNewPassword: sameAs('newPassword')
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>