<template>
  <LibFormLayoutWrapper class="sm:w-5/6 max-w-lg">
    <template #title>
      Reset password request
    </template>
    <template #form>
      <div class="flow">
        <LibWidgetComponentLoading :show="form.submitStatus === 'PENDING'" />
        <LibFormLayoutFeedback
          v-show="resetPwdFeedback.msg"
          :status="resetPwdFeedback.status"
        >
          <p v-html="resetPwdFeedback.msg" />
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
              Request new password
            </template>
          </LibBaseButton>
        </form>
        <LibFormLayoutFooter>
          <template #actions>
            <LibBaseLink
              :is-nuxt-link="true"
              link="/register"
              link-class="underline"
            >
              Register
            </LibBaseLink>
            <LibBaseLink
              class="ml-auto"
              :is-nuxt-link="true"
              link="/login"
              link-class="underline"
            >
              Log in
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      resetPwdFeedback: {
        msg: null,
        status: null,
      },
      resetPwdFeedbackMsgs: {
        instructions: `Please enter the email you registered with. You will receive an email with instructions on resetting your password`,
        username_does_not_exist: `The username you have entered has not been recognised. Please try again or contact <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>`,
        success:
          'You have been sent an email containing instructions on resetting your password',
        error: `There has been a problem with sending your password reset email. Please try again or contact <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>`,
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
              'Username is the email with which you were registered on this site',
          },
        },
      },
    }
  },
  mounted() {
    this.formFeedbackMsg = this.setResetPwdFeedbackMsg(
      this.resetPwdFeedbackMsgs.instructions,
      'success'
    )
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