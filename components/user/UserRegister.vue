<template>
  <div class="flow relative">
    <UserComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback v-show="formFeedback.msg" :status="formFeedback.status">
      <p v-html="formFeedback.msg" />
    </UserFormFeedback>
    <p>
      Please complete all fields.
    </p>
    <form class="flow">
      </p><div v-for="(field, name, index) in form.fields" :key="index">
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
          Register
        </template>
      </LibBaseButton>
      <div class="flex">
        <LibBaseLink class="ml-auto" link="/login" link-class="underline">
          Log-in
        </LibBaseLink>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      formData: {
        userEmail: null,
        firstName: null,
        lastName: null,
        password: null,
        repeatPassword: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        registration_failed: `We have been unable to register you. Please try again or email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a> if the problem persists.`,
        registration_succeeded: `Your are registered on AFTER training and can now <a class="underline" href="/login">log in</a>`,
        email_already_taken: `The email you have entered is already registered. Please use a different email address or <a class="underline" href="/reset-pwd-request">change your password</a> if you have forgotten it.`
      },
      form: {
        submitStatus: null,
        fields: {
          userEmail: {
            el: 'input',
            inputType: 'email',
            name: 'userEmail',
            label: 'Email',
            feedback: [],
            instructions: 'Please use your NHS email if you have one.',
          },
          firstName: {
            el: 'input',
            inputType: 'text',
            name: 'firstName',
            label: 'First name',
            feedback: [],
            instructions: null,
          },
          lastName: {
            el: 'input',
            inputType: 'text',
            name: 'lastName',
            label: 'Last name',
            feedback: [],
            instructions: null,
          },
          password: {
            el: 'input',
            inputType: 'password',
            name: 'password',
            label: 'Password',
            feedback: [],
            instructions:
              'Passwords must be at least 8 characters long, contain at least one number, special character (#?!@$%^&*-), uppercase and lowercase letters.',
          },
          repeatPassword: {
            el: 'input',
            inputType: 'password',
            name: 'repeatPassword',
            label: 'Repeat Password',
            feedback: [],
            instructions: 'Please enter your password again',
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
        this.registerUser()
      }
    },
    async registerUser() {
      try {
        await this.$axios.post(
          this.$config.siteUrl + '/.netlify/functions/register-user/',
          {
            user_email: this.formData.userEmail,
            password: this.formData.password,
            roles: 'trainee',
            first_name: this.formData.firstName,
            last_name: this.formData.lastName,
            meta: {
              hospital_trust: 'Milnthorpe',
              clinical_grade_experience: 'FY3',
            },
          }
        )
        this.form.submitStatus = 'OK'
        this.formFeedbackMsg = this.setFormFeedbackMsg(
          this.formFeedbackMsgs.registration_succeeded,
          'success'
        )
      } catch (error) {
        this.form.submitStatus = 'ERROR'

        if (error.response.data === 'email taken') {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.email_already_taken,
            'warning'
          )
        // } else if(error.response.data === 'password reset key invalid') {
        //   this.formFeedbackMsg = this.setFormFeedbackMsg(
        //     this.formFeedbackMsgs.password_reset_key_invalid,
        //     'warning'
        //   )
        // } else if(error.response.data === 'password format is invalid') {
        //   this.formFeedbackMsg = this.setFormFeedbackMsg(
        //     this.formFeedbackMsgs.password_format_invalid,
        //     'warning'
        //   )
        } else {
          this.formFeedbackMsg = this.setFormFeedbackMsg(
            this.formFeedbackMsgs.registration_failed,
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
      userEmail: {
        required,
        email,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      password: {
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
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>