<template>
  <LibFormLayoutWrapper class="sm:w-5/6 max-w-lg">
    <template #title>
      Log-in
    </template>
    <template #form>
      <div class="flow">
        <LibWidgetComponentLoading :show="form.submitStatus === 'PENDING'" />
        <LibFormLayoutFeedback v-show="formFeedback.msg" :status="formFeedback.status">
          <p v-html="formFeedback.msg" />
        </LibFormLayoutFeedback>
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
              Log In
            </template>
          </LibBaseButton>
        </form>
        <LibFormLayoutFooter>
          <template #actions>
            <LibBaseLink link="/register" link-class="underline">
              Register
            </LibBaseLink>
            <LibBaseLink
              class="ml-auto"
              link="/reset-pwd-request"
              link-class="underline"
            >
              Forgotten password?
            </LibBaseLink>
          </template>
          <template #additional>
            <p>
              If you are having difficulties logging in, please contact <LibBaseLink :link="`mailto:${$config.siteAdminEmail}`" class="underline">
                {{ $config.siteAdminEmail }}
              </LibBaseLink>
            </p>
          </template>
        </LibFormLayoutFooter>
      </div>
    </template>
  </LibFormLayoutWrapper>
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
        user_new_pwd: `You password has been updated. If you have any problems logging in please email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>`,
        new_user_register: `If you are a new user, please <a class="underline" href="/register">register</a> to create an account`,
        new_registered_trainee: `Thank you for registering, you can now log in. If you have any problems contact <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>`,
        user_not_recognised: `Your username and password have not been recognised. Please try again or <a class="underline" href="/reset-pwd-request">reset your password</a>`,
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
              'Username is the email with which you registered on this site.',
          },
          password: {
            el: 'input',
            inputType: 'password',
            name: 'password',
            label: 'Password',
            feedback: [],
            instructions:
              'Passwords must be at least 8 characters long, contain at least one number, special character (#?!@$%^&*-), uppercase and lowercase letters',
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
      return (
        this.$route.query.action && this.$route.query.action === 'reset-pwd'
      )
    },
    newTrainee() {
      return (
        this.$route.query.action && this.$route.query.action === 'new-trainee'
      )
    },
    userStatus() {
      // default, new-trainee, new-pwd
      let userStatus = 'default'
      if (this.newTrainee) {
        userStatus = 'new-trainee'
      } else if (this.fromPasswordReset) {
        userStatus = 'new-pwd'
      }
      return userStatus
    },
  },
  mounted() {
    if (this.userNameFromUrl) {
      this.formData.userName = this.userNameFromUrl
    }
    switch (this.userStatus) {
      case 'new-trainee':
        this.setFormFeedbackMsg(
          this.formFeedbackMsgs.new_registered_trainee,
          'success'
        )
        break
      case 'new-pwd':
        this.setFormFeedbackMsg(this.formFeedbackMsgs.user_new_pwd, 'success')
        break
      default:
        this.setFormFeedbackMsg(
          this.formFeedbackMsgs.new_user_register,
          'success'
        )
    }
  },
  methods: {
    ...mapActions('steps', [
      'setCompletedSteps',
      'setStartedSteps',
      'setCurrentStepsVersion',
    ]),
    ...mapActions('trainee', ['setSurveyOneCompleted', 'setSurveyTwoCompleted']),
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
        this.presetUserSurveyStatus(this.$auth.user.meta)

        this.form.submitStatus = 'OK'

        const lastStepVisited = this.$piTool.lastStepVisitedRoute()
        this.$router.push({ path: lastStepVisited })
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
    presetUserSurveyStatus(userMeta) {
      this.setSurveyOneCompleted(userMeta.survey_one_completed)
      this.setSurveyTwoCompleted(userMeta.survey_two_completed)
    },
    async updateLastLogin(userId) {
      const loginDateTime = this.getLoginDateTime()
      try {
        await this.$axios.post(
          this.$config.wpHeadlessUrl +
            `/wp-json/digitrial/v1/user/${userId}/last-login`,
          {
            meta: {
              last_login: loginDateTime,
            },
          }
        )
      } catch (error) {
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