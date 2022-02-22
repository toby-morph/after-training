<template>
  <div class="flow relative">
    <UserComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback v-show="formFeedback.msg" :status="formFeedback.status">
      <p v-html="formFeedback.msg" />
    </UserFormFeedback>
    <form class="flow">
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
        :disabled="$v.$invalid"
        @click.prevent="submit"
      >
        <template #text>
          Log In
        </template>
      </LibBaseButton>
      <div class="flex">
        <LibBaseLink
          class="ml-auto"
          link="/reset-pwd-request"
          link-class="underline"
        >
          Forgotten password?
        </LibBaseLink>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

const notTempPassword = (value) => value !== 'temp'

export default {
  data() {
    return {
      formData: {
        userName: null,
        password: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        user_not_recognised: `Your username and password have not been recognised. Please try again or <a class="underline" href="/reset-pwd-request">reset your password</a>.`,
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
          password: {
            el: 'input',
            inputType: 'password',
            name: 'password',
            label: 'Password',
            feedback: [],
            instructions: 'Passwords must be at least 8 characters long',
          },
        },
      },
    }
  },
  computed: {
    userNameFromUrl() {
      return this.$route.query.login ? this.$route.query.login : null
    },
    fromPasswordReset() {
      return this.$route.from && this.$route.from.name === 'reset-pwd'
    },
  },
  mounted() {
    if (this.userNameFromUrl) {
      this.formData.userName = this.userNameFromUrl
    }
  },
  methods: {
    ...mapActions('steps', [
      'setCompletedSteps',
      'setStartedSteps',
      'setCurrentStepsVersion',
    ]),
    fieldAutoComplete(inputType) {
      // :auto-complete="fieldAutoComplete(field.inputType)"
      // removing auto-complete let browser handle this
      return inputType === 'password' && this.fromPasswordReset
        ? 'new-password'
        : 'on'
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.form.submitStatus = 'PENDING'
        this.userLogin()
      }
    },
    async userLogin() {
      //   this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.formData.userName,
            password: this.formData.password,
          },
        })

        this.updateLastLogin(this.$auth.user.id)
        this.presetCompletedSteps(this.$auth.user.meta.last_step)

        this.form.submitStatus = 'OK'

        this.$router.push({ path: '/get-started' })

      } catch (error) {
        this.setFormFeedbackMsg(
          this.formFeedbackMsgs.user_not_recognised,
          'warning'
        )
        this.form.submitStatus = 'ERROR'
      }
    },
    closeLoginModal() {
      this.form.submitStatus = null
    },
    presetCompletedSteps(userLastStep) {
      const completedSteps = []
      for (let i = 0; i <= parseInt(userLastStep); i++) {
        completedSteps.push(i)
      }
      this.setCompletedSteps(completedSteps)
      // define if user has started steps
      if (parseInt(userLastStep) > 0) {
        this.setStartedSteps(true)
      }
    },
    async updateLastLogin(userId) {
      const loginDateTime = this.getLoginDateTime()
      try {
        await this.$axios.post(
          this.$config.wpHeadlessUrl + `/wp-json/digitrial/v1/user/${userId}/last-login`,
          {
            meta: {
              last_login: loginDateTime,
            },
          }
        )
        // console.log(response)
      } catch (error) {
        // console.error(error)
        this.$nuxt.error({
          statusCode: 400,
          message: 'Failed to save log in time',
        })
      }
    },
    getLoginDateTime() {
      const currentdate = new Date()
      // php equiv: Y-m-d H:i:s
      const loginDateTime =
        currentdate.getFullYear() +
        '-' +
        String(currentdate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(currentdate.getDate()).padStart(2, '0') +
        ' ' +
        String(currentdate.getHours()).padStart(2, '0') +
        ':' +
        String(currentdate.getMinutes()).padStart(2, '0') +
        ':' +
        String(currentdate.getSeconds()).padStart(2, '0')
      return loginDateTime
    },
    setFormFeedbackMsg(msg = null, status = null) {
      this.formFeedback.msg = msg
      this.formFeedback.status = status
    },
  },
  validations: {
    formData: {
      userName: {
        required,
        email,
      },
      password: {
        required,
        notTempPassword,
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
    },
  },
}
</script>

<style lang="scss" scoped>
</style>