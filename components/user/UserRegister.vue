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
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      formData: {
        userEmail: null,
        firstName: null,
        lastName: null,
        password: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        registration_failed: 'Registration failed. Please contact...',
        registration_succeeded: 'Your are now registered. Please log in...',
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
            instructions:
              'Please use your NHS email if you have one, otherwise your work email.',
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
            instructions: 'Passwords must be at least 8 characters long',
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
        // this.userLogin()
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
    },
  },
}
</script>

<style lang="scss" scoped>
</style>