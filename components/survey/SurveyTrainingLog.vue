<template>
  <div class="flow relative">
    <UserComponentLoading :show="form.submitStatus === 'PENDING'" />
    <UserFormFeedback v-show="formFeedback.msg" :status="formFeedback.status">
      <p v-html="formFeedback.msg" />
    </UserFormFeedback>
    <template v-if="surveyOneCompleted">
      <p>
        If you have not yet done so, we would be grateful if you could spare a minute to complete a <nuxt-link class="underline" to="/survey/training-feedback">
          short survey
        </nuxt-link> on your opinion of the training.
      </p>
      <LibBaseButtonLink class="block" link-url="/survey/training-feedback">
        <template #text>
          Complete feedback survey
        </template>
      </LibBaseButtonLink>
    </template>
    <template v-else>
      <p>
        Please complete all fields. After this form has been submitted, we will
        email you a copy of your training certificate in PDF format.
      </p>
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
            :hidden="field.hidden ? field.hidden() : false"
          />
          <!-- Form select group -->
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
          <!-- Form checkbox group -->
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
          <!-- Form radio group -->
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
          />
        </div>
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
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { required, requiredIf } from 'vuelidate/lib/validators'

import { dates } from '@/mixins/dates.js'

export default {
  mixins: [dates],
  data() {
    return {
      formData: {
        confirmCompletion: [],
        yearOfQualification: null,
        currentNhsGrade: null,
        currentNhsGradeOther: null,
        howManyPatients: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        survey_completed: `You have already completed the training log. If you have any questions please email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>.`,
        submission_failed: `Sorry, we have been unable to process this form. Please try again or email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a> if the problem persists.`,
      },
      form: {
        submitStatus: null,
        fields: {
          confirmCompletion: {
            el: 'checkbox',
            name: 'confirmCompletion',
            label: 'I confirm that I have completed the AFTER training session',
            options: [
              {
                value: 'true',
                label: 'Yes',
              },
            ],
            feedback: [],
            instructions: null,
          },
          yearOfQualification: {
            el: 'input',
            inputType: 'text',
            name: 'yearOfQualification',
            label: 'Year of qualification as a physiotherapist',
            feedback: [],
            instructions: null,
          },
          currentNhsGrade: {
            el: 'select',
            name: 'currentNhsGrade',
            label: 'Current NHS Grade/Band',
            options: [
              {
                value: 'Band 5',
                label: 'Band 5',
              },
              {
                value: 'Band 6',
                label: 'Band 6',
              },
              {
                value: 'Band 7',
                label: 'Band 7',
              },
              {
                value: 'Band 8a',
                label: 'Band 8a',
              },
              {
                value: 'Band 8b',
                label: 'Band 8b',
              },
              {
                value: 'Other',
                label: 'Other',
              },
            ],
            feedback: [],
            instructions: null,
          },
          currentNhsGradeOther: {
            el: 'input',
            inputType: 'text',
            name: 'currentNhsGradeOther',
            label: 'If other, please specify',
            feedback: [],
            instructions: null,
            hidden: () => {
              return this.formData.currentNhsGrade !== 'Other'
            },
          },
          howManyPatients: {
            el: 'radio',
            name: 'howManyPatients',
            label:
              'How many ankle fracture patients do you see during a usual week on average?',
            options: [
              {
                value: 'none',
                label: 'None',
              },
              {
                value: '1+',
                label: 'At least 1',
              },
              {
                value: '2-4',
                label: '2-4',
              },
              {
                value: '5+',
                label: '5 or more',
              },
            ],
            feedback: [],
            instructions: null,
          },
        },
      },
    }
  },
  computed: {
    ...mapState({
      surveyOneCompleted: (state) => state.trainee.surveyOneCompleted,
    }),
    traineeId() {
      return this.$auth.user.id
    },
  },
  mounted(){
    if(this.surveyOneCompleted){
        this.formFeedbackMsg = this.setFormFeedbackMsg(
          this.formFeedbackMsgs.survey_completed,
          'success'
        )
    }
  },
  methods: {
    ...mapActions('trainee', ['setSurveyOneCompleted']),
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.form.submitStatus = 'PENDING'
        this.submitTrainingLog()
      }
    },
    async submitTrainingLog() {
      try {
        await this.$axios.post(
          this.$config.wpHeadlessUrl +
            `/wp-json/digitrial/v1/user/${this.traineeId}/survey/update`,
          {
            survey_one: {
              confirm_completion: true,
              how_did_training_take_place: 'online',
              year_of_qualification: this.formData.yearOfQualification,
              current_nhs_grade: this.formData.currentNhsGrade,
              current_nhs_grade_other: this.formData.currentNhsGradeOther,
              ankle_fracture_patients_per_week: this.formData.howManyPatients,
              date_of_completion: this.currentDate,
            },
          }
        )
        this.setSurveyOneCompleted(true)
        
        this.form.submitStatus = 'OK'

        this.$router.push({
          path: `/survey/training-feedback?action=certificate_sent`,
        })
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
      confirmCompletion: {
        required,
      },
      yearOfQualification: {
        required,
      },
      currentNhsGrade: {
        required,
      },
      currentNhsGradeOther: {
        required: requiredIf((formData) => {
          return formData.currentNhsGrade === 'Other'
        }),
      },
      howManyPatients: {
        required,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>