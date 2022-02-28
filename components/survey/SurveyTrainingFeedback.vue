<template>
  <div class="flow relative">
    <UserComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback v-show="formFeedback.msg" :status="formFeedback.status">
      <p v-html="formFeedback.msg" />
    </UserFormFeedback>
    <p>
      Please complete all fields.
    </p>
    <form class="flow flex flex-col">
      <SurveyFormFieldset>
        <template #legend>
          Background and overview of AFTER study
        </template>
        <template #fields>
          <LibFormGroupRadioButton
            v-model="$v.formData.backgroundContent.$model"
            :field-name="form.fields.backgroundContent.name"
            :label="form.fields.backgroundContent.label"
            :disabled="form.fields.backgroundContent.disabled"
            :instructions="form.fields.backgroundContent.instructions"
            :required="form.fields.backgroundContent.required"
            :feedback="form.fields.backgroundContent.feedback"
            :options="form.fields.backgroundContent.options"
            :auto-focus="true"
            :v="$v.formData.backgroundContent"
            :layout="form.fields.backgroundContent.layout"
          />
          <LibFormGroupRadioButton
            v-model="$v.formData.backgroundDelivery.$model"
            :field-name="form.fields.backgroundDelivery.name"
            :label="form.fields.backgroundDelivery.label"
            :disabled="form.fields.backgroundDelivery.disabled"
            :instructions="form.fields.backgroundDelivery.instructions"
            :required="form.fields.backgroundDelivery.required"
            :feedback="form.fields.backgroundDelivery.feedback"
            :options="form.fields.backgroundDelivery.options"
            :v="$v.formData.backgroundDelivery"
            :layout="form.fields.backgroundDelivery.layout"
          />
        </template>
      </SurveyFormFieldset>

      <!-- <div v-for="(field, name, index) in form.fields" :key="index">
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
          :hidden="field.hidden ? field.hidden() : false"
        />
        <LibFormGroupSelect
          v-if="field.el === 'select'"
          v-model="$v.formData[field.name].$model"
          :field-name="field.name"
          :label="field.label"
          :disabled="field.disabled"
          :instructions="field.instructions"
          :required="field.required"
          :feedback="field.feedback"
          :options="field.options"
          :auto-focus="index === 0"
          :v="$v.formData[field.name]"
        />
        <LibFormGroupCheckbox
          v-if="field.el === 'checkbox'"
          v-model="$v.formData[field.name].$model"
          :field-name="field.name"
          :label="field.label"
          :disabled="field.disabled"
          :instructions="field.instructions"
          :required="field.required"
          :feedback="field.feedback"
          :options="field.options"
          :auto-focus="index === 0"
          :v="$v.formData[field.name]"
        />
        <LibFormGroupRadioButton
          v-if="field.el === 'radio'"
          v-model="$v.formData[field.name].$model"
          :field-name="field.name"
          :label="field.label"
          :disabled="field.disabled"
          :instructions="field.instructions"
          :required="field.required"
          :feedback="field.feedback"
          :options="field.options"
          :auto-focus="index === 0"
          :v="$v.formData[field.name]"
          :layout="field.layout"
        />
      </div> -->
      <LibBaseButton
        class="ml-auto"
        btn-class="btn-dark"
        :disabled="$v.$invalid"
        @click.prevent="submit"
      >
        <template #text>
          Submit
        </template>
      </LibBaseButton>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import { dates } from '@/mixins/dates.js'

export default {
  mixins: [dates],
  data() {
    return {
      formData: {
        backgroundContent: null,
        backgroundDelivery: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        submission_failed: `Sorry, we have been unable to process this form. Please try again or email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a> if the problem persists.`,
      },
      form: {
        submitStatus: null,
        fields: {
          backgroundContent: {
            el: 'radio',
            name: 'backgroundContent',
            label:
              'Content',
            options: [
              {
                value: 'excellent',
                label: 'Excellent',
              },
              {
                value: 'good',
                label: 'Good',
              },
              {
                value: 'ok',
                label: 'OK',
              },
              {
                value: 'poor',
                label: 'Poor',
              },
            ],
            feedback: [],
            instructions: null,
            layout: 'horizontal'
          },
          backgroundDelivery: {
            el: 'radio',
            name: 'backgroundDelivery',
            label:
              'Delivery',
            options: [
              {
                value: 'excellent',
                label: 'Excellent',
              },
              {
                value: 'good',
                label: 'Good',
              },
              {
                value: 'ok',
                label: 'OK',
              },
              {
                value: 'poor',
                label: 'Poor',
              },
            ],
            feedback: [],
            instructions: null,
            layout: 'horizontal'
          },
        },
      },
    }
  },
  computed: {
    traineeId() {
      return this.$auth.user.id
    },
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.form.submitStatus = 'PENDING'
        this.submitTrainingFeedback()
      }
    },
    async submitTrainingFeedback() {
      try {
        await this.$axios.post(
          this.$config.wpHeadlessUrl +
            `/wp-json/digitrial/v1/user/${this.traineeId}/survey/update`,
          {
            section_two: {
              sections_of_training: {
                background_and_overview: {
                  content: this.formData.backgroundContent,
                  delivery: this.formData.backgroundDelivery
                }
              }
            },
          }
        )
        this.form.submitStatus = 'OK'

      } catch (error) {
        this.form.submitStatus = 'ERROR'

        this.formFeedbackMsg = this.setFormFeedbackMsg(
          this.formFeedbackMsgs.submission_failed,
          'warning'
        )
      }
    },
    setFormFeedbackMsg(msg = null, status = null) {
      this.formFeedback.msg = msg
      this.formFeedback.status = status
    },
  },
  validations: {
    formData: {
      backgroundContent: {
        required,
      },
      backgroundDelivery: {
        required,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>