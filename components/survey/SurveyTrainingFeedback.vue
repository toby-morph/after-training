<template>
  <LibFormLayoutWrapper class="sm:w-5/6 max-w-2xl">
    <template #title>
      AFTER training feedback
    </template>
    <template #form>
      <div class="flow">
        <LibWidgetPageLoading :show="form.submitStatus === 'PENDING'" loading-message="Submitting feedback. Please wait..." />
        <LibFormLayoutFeedback v-show="formFeedback.msg" :status="formFeedback.status">
          <p v-html="formFeedback.msg" />
        </LibFormLayoutFeedback>
        <template v-if="!surveyTwoCompleted">
          <p>
            We would appreciate it if you could complete a short survey on your training experience.
            Please rate the following aspects of the training, selecting one option for each question.
          </p>
          <form>
            <div class="flow flex flex-col gap-4 py-8">
              <LibBaseHtmlHeader level="2" header-font-size="4">
                1: Sections of training
              </LibBaseHtmlHeader>

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

              <SurveyFormFieldset>
                <template #legend>
                  Education and advice
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.educationContent.$model"
                    :field-name="form.fields.educationContent.name"
                    :label="form.fields.educationContent.label"
                    :disabled="form.fields.educationContent.disabled"
                    :instructions="form.fields.educationContent.instructions"
                    :required="form.fields.educationContent.required"
                    :feedback="form.fields.educationContent.feedback"
                    :options="form.fields.educationContent.options"
                    :auto-focus="true"
                    :v="$v.formData.educationContent"
                    :layout="form.fields.educationContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.educationDelivery.$model"
                    :field-name="form.fields.educationDelivery.name"
                    :label="form.fields.educationDelivery.label"
                    :disabled="form.fields.educationDelivery.disabled"
                    :instructions="form.fields.educationDelivery.instructions"
                    :required="form.fields.educationDelivery.required"
                    :feedback="form.fields.educationDelivery.feedback"
                    :options="form.fields.educationDelivery.options"
                    :v="$v.formData.educationDelivery"
                    :layout="form.fields.educationDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>

              <SurveyFormFieldset>
                <template #legend>
                  Exercises
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.exercisesContent.$model"
                    :field-name="form.fields.exercisesContent.name"
                    :label="form.fields.exercisesContent.label"
                    :disabled="form.fields.exercisesContent.disabled"
                    :instructions="form.fields.exercisesContent.instructions"
                    :required="form.fields.exercisesContent.required"
                    :feedback="form.fields.exercisesContent.feedback"
                    :options="form.fields.exercisesContent.options"
                    :auto-focus="true"
                    :v="$v.formData.exercisesContent"
                    :layout="form.fields.exercisesContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.exercisesDelivery.$model"
                    :field-name="form.fields.exercisesDelivery.name"
                    :label="form.fields.exercisesDelivery.label"
                    :disabled="form.fields.exercisesDelivery.disabled"
                    :instructions="form.fields.exercisesDelivery.instructions"
                    :required="form.fields.exercisesDelivery.required"
                    :feedback="form.fields.exercisesDelivery.feedback"
                    :options="form.fields.exercisesDelivery.options"
                    :v="$v.formData.exercisesDelivery"
                    :layout="form.fields.exercisesDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>

              <SurveyFormFieldset>
                <template #legend>
                  Exercise adherence techniques
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.techniquesContent.$model"
                    :field-name="form.fields.techniquesContent.name"
                    :label="form.fields.techniquesContent.label"
                    :disabled="form.fields.techniquesContent.disabled"
                    :instructions="form.fields.techniquesContent.instructions"
                    :required="form.fields.techniquesContent.required"
                    :feedback="form.fields.techniquesContent.feedback"
                    :options="form.fields.techniquesContent.options"
                    :auto-focus="true"
                    :v="$v.formData.techniquesContent"
                    :layout="form.fields.techniquesContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.techniquesDelivery.$model"
                    :field-name="form.fields.techniquesDelivery.name"
                    :label="form.fields.techniquesDelivery.label"
                    :disabled="form.fields.techniquesDelivery.disabled"
                    :instructions="form.fields.techniquesDelivery.instructions"
                    :required="form.fields.techniquesDelivery.required"
                    :feedback="form.fields.techniquesDelivery.feedback"
                    :options="form.fields.techniquesDelivery.options"
                    :v="$v.formData.techniquesDelivery"
                    :layout="form.fields.techniquesDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>

              <SurveyFormFieldset>
                <template #legend>
                  AFTER workbooks
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.workbooksContent.$model"
                    :field-name="form.fields.workbooksContent.name"
                    :label="form.fields.workbooksContent.label"
                    :disabled="form.fields.workbooksContent.disabled"
                    :instructions="form.fields.workbooksContent.instructions"
                    :required="form.fields.workbooksContent.required"
                    :feedback="form.fields.workbooksContent.feedback"
                    :options="form.fields.workbooksContent.options"
                    :auto-focus="true"
                    :v="$v.formData.workbooksContent"
                    :layout="form.fields.workbooksContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.workbooksDelivery.$model"
                    :field-name="form.fields.workbooksDelivery.name"
                    :label="form.fields.workbooksDelivery.label"
                    :disabled="form.fields.workbooksDelivery.disabled"
                    :instructions="form.fields.workbooksDelivery.instructions"
                    :required="form.fields.workbooksDelivery.required"
                    :feedback="form.fields.workbooksDelivery.feedback"
                    :options="form.fields.workbooksDelivery.options"
                    :v="$v.formData.workbooksDelivery"
                    :layout="form.fields.workbooksDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>

              <SurveyFormFieldset>
                <template #legend>
                  AFTER website
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.websiteContent.$model"
                    :field-name="form.fields.websiteContent.name"
                    :label="form.fields.websiteContent.label"
                    :disabled="form.fields.websiteContent.disabled"
                    :instructions="form.fields.websiteContent.instructions"
                    :required="form.fields.websiteContent.required"
                    :feedback="form.fields.websiteContent.feedback"
                    :options="form.fields.websiteContent.options"
                    :auto-focus="true"
                    :v="$v.formData.websiteContent"
                    :layout="form.fields.websiteContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.websiteDelivery.$model"
                    :field-name="form.fields.websiteDelivery.name"
                    :label="form.fields.websiteDelivery.label"
                    :disabled="form.fields.websiteDelivery.disabled"
                    :instructions="form.fields.websiteDelivery.instructions"
                    :required="form.fields.websiteDelivery.required"
                    :feedback="form.fields.websiteDelivery.feedback"
                    :options="form.fields.websiteDelivery.options"
                    :v="$v.formData.websiteDelivery"
                    :layout="form.fields.websiteDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>

              <SurveyFormFieldset>
                <template #legend>
                  Trial reporting and documentation
                </template>
                <template #fields>
                  <LibFormGroupRadioButton
                    v-model="$v.formData.documentationContent.$model"
                    :field-name="form.fields.documentationContent.name"
                    :label="form.fields.documentationContent.label"
                    :disabled="form.fields.documentationContent.disabled"
                    :instructions="form.fields.documentationContent.instructions"
                    :required="form.fields.documentationContent.required"
                    :feedback="form.fields.documentationContent.feedback"
                    :options="form.fields.documentationContent.options"
                    :auto-focus="true"
                    :v="$v.formData.documentationContent"
                    :layout="form.fields.documentationContent.layout"
                  />
                  <LibFormGroupRadioButton
                    v-model="$v.formData.documentationDelivery.$model"
                    :field-name="form.fields.documentationDelivery.name"
                    :label="form.fields.documentationDelivery.label"
                    :disabled="form.fields.documentationDelivery.disabled"
                    :instructions="form.fields.documentationDelivery.instructions"
                    :required="form.fields.documentationDelivery.required"
                    :feedback="form.fields.documentationDelivery.feedback"
                    :options="form.fields.documentationDelivery.options"
                    :v="$v.formData.documentationDelivery"
                    :layout="form.fields.documentationDelivery.layout"
                  />
                </template>
              </SurveyFormFieldset>
            </div>
            <div class="flow flex flex-col gap-4 py-8">
              <LibBaseHtmlHeader level="2" header-font-size="4">
                2: Overall opinion of training
              </LibBaseHtmlHeader>

              <LibFormGroupRadioButton
                v-model="$v.formData.sessionWellOrganised.$model"
                :field-name="form.fields.sessionWellOrganised.name"
                :label="form.fields.sessionWellOrganised.label"
                :disabled="form.fields.sessionWellOrganised.disabled"
                :instructions="form.fields.sessionWellOrganised.instructions"
                :required="form.fields.sessionWellOrganised.required"
                :feedback="form.fields.sessionWellOrganised.feedback"
                :options="form.fields.sessionWellOrganised.options"
                :v="$v.formData.sessionWellOrganised"
                :layout="form.fields.sessionWellOrganised.layout"
              />

              <LibFormGroupRadioButton
                v-model="$v.formData.sessionDurationAppropriate.$model"
                :field-name="form.fields.sessionDurationAppropriate.name"
                :label="form.fields.sessionDurationAppropriate.label"
                :disabled="form.fields.sessionDurationAppropriate.disabled"
                :instructions="form.fields.sessionDurationAppropriate.instructions"
                :required="form.fields.sessionDurationAppropriate.required"
                :feedback="form.fields.sessionDurationAppropriate.feedback"
                :options="form.fields.sessionDurationAppropriate.options"
                :v="$v.formData.sessionDurationAppropriate"
                :layout="form.fields.sessionDurationAppropriate.layout"
              />

              <LibFormGroupRadioButton
                v-model="$v.formData.satisfiedWithQuality.$model"
                :field-name="form.fields.satisfiedWithQuality.name"
                :label="form.fields.satisfiedWithQuality.label"
                :disabled="form.fields.satisfiedWithQuality.disabled"
                :instructions="form.fields.satisfiedWithQuality.instructions"
                :required="form.fields.satisfiedWithQuality.required"
                :feedback="form.fields.satisfiedWithQuality.feedback"
                :options="form.fields.satisfiedWithQuality.options"
                :v="$v.formData.satisfiedWithQuality"
                :layout="form.fields.satisfiedWithQuality.layout"
              />

              <LibFormGroupRadioButton
                v-model="$v.formData.feelConfidentToDeliver.$model"
                :field-name="form.fields.feelConfidentToDeliver.name"
                :label="form.fields.feelConfidentToDeliver.label"
                :disabled="form.fields.feelConfidentToDeliver.disabled"
                :instructions="form.fields.feelConfidentToDeliver.instructions"
                :required="form.fields.feelConfidentToDeliver.required"
                :feedback="form.fields.feelConfidentToDeliver.feedback"
                :options="form.fields.feelConfidentToDeliver.options"
                :v="$v.formData.feelConfidentToDeliver"
                :layout="form.fields.feelConfidentToDeliver.layout"
              />

              <LibFormGroupTextarea
                v-model.trim="$v.formData.anyOtherComments.$model"
                :field-name="form.fields.anyOtherComments.name"
                :label="form.fields.anyOtherComments.label"
                :disabled="form.fields.anyOtherComments.disabled"
                :instructions="form.fields.anyOtherComments.instructions"
                :placeholder="form.fields.anyOtherComments.placeholder"
                :required="form.fields.anyOtherComments.required"
                :feedback="form.fields.anyOtherComments.feedback"
                :v="$v.formData.anyOtherComments"
              />
            </div>
            <LibFormLayoutFooter>
              <template #actions>
                <LibBaseButton
                  class="ml-auto"
                  btn-class="btn-dark"
                  @click.prevent="submit"
                >
                  <template #text>
                    Submit
                  </template>
                </LibBaseButton>
              </template>
            </LibFormLayoutFooter>
          </form>
        </template>
      </div>
    </template>
  </LibFormLayoutWrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { required } from 'vuelidate/lib/validators'

import { dates } from '@/mixins/dates.js'

const sectionOneFieldPresets = {
  el: 'radio',
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
  layout: 'horizontal',
  instructions: null,
}
const sectionTwoFieldPresets = {
  el: 'radio',
  options: [
    {
      value: 'strongly-agree',
      label: 'Strongly agree',
    },
    {
      value: 'agree',
      label: 'Agree',
    },
    {
      value: 'neutral',
      label: 'Neutral',
    },
    {
      value: 'disagree',
      label: 'Disagree',
    },
    {
      value: 'strongly-disagree',
      label: 'Strongly disagree',
    },
  ],
  layout: 'vertical',
  instructions: null,
}

export default {
  mixins: [dates],
  data() {
    return {
      formData: {
        backgroundContent: null,
        backgroundDelivery: null,
        educationContent: null,
        educationDelivery: null,
        exercisesContent: null,
        exercisesDelivery: null,
        techniquesContent: null,
        techniquesDelivery: null,
        workbooksContent: null,
        workbooksDelivery: null,
        websiteContent: null,
        websiteDelivery: null,
        documentationContent: null,
        documentationDelivery: null,
        sessionWellOrganised: null,
        sessionDurationAppropriate: null,
        satisfiedWithQuality: null,
        feelConfidentToDeliver: null,
        anyOtherComments: null,
      },
      formFeedback: {
        msg: null,
        status: null,
      },
      formFeedbackMsgs: {
        certificate_sent: `Thank you, we have sent you a personalised training certificate (in PDF format) as an email attachment.`,
        survey_completed: `You have already completed the training feedback form. If you have any questions please email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a>.`,
        submission_failed: `Sorry, we have been unable to process this form. Please try again or email <a class="underline" href="mailto:${this.$config.siteAdminEmail}">${this.$config.siteAdminEmail}</a> if the problem persists.`,
        submission_succeeded: `Thank you for providing feedback on your AFTER intervention training experience.`,
      },
      form: {
        submitStatus: null,
        fields: {
          backgroundContent: {
            ...sectionOneFieldPresets,
            name: 'backgroundContent',
            label: 'Content',
            feedback: [],
          },
          backgroundDelivery: {
            ...sectionOneFieldPresets,
            name: 'backgroundDelivery',
            label: 'Delivery',
            feedback: [],
          },
          educationContent: {
            ...sectionOneFieldPresets,
            name: 'educationContent',
            label: 'Content',
            feedback: [],
          },
          educationDelivery: {
            ...sectionOneFieldPresets,
            name: 'educationDelivery',
            label: 'Delivery',
            feedback: [],
          },
          exercisesContent: {
            ...sectionOneFieldPresets,
            name: 'exercisesContent',
            label: 'Content',
            feedback: [],
          },
          exercisesDelivery: {
            ...sectionOneFieldPresets,
            name: 'exercisesDelivery',
            label: 'Delivery',
            feedback: [],
          },
          techniquesContent: {
            ...sectionOneFieldPresets,
            name: 'techniquesContent',
            label: 'Content',
            feedback: [],
          },
          techniquesDelivery: {
            ...sectionOneFieldPresets,
            name: 'techniquesDelivery',
            label: 'Delivery',
            feedback: [],
          },
          workbooksContent: {
            ...sectionOneFieldPresets,
            name: 'workbooksContent',
            label: 'Content',
            feedback: [],
          },
          workbooksDelivery: {
            ...sectionOneFieldPresets,
            name: 'workbooksDelivery',
            label: 'Delivery',
            feedback: [],
          },
          websiteContent: {
            ...sectionOneFieldPresets,
            name: 'websiteContent',
            label: 'Content',
            feedback: [],
          },
          websiteDelivery: {
            ...sectionOneFieldPresets,
            name: 'websiteDelivery',
            label: 'Delivery',
            feedback: [],
          },
          documentationContent: {
            ...sectionOneFieldPresets,
            name: 'documentationContent',
            label: 'Content',
            feedback: [],
          },
          documentationDelivery: {
            ...sectionOneFieldPresets,
            name: 'documentationDelivery',
            label: 'Delivery',
            feedback: [],
          },
          sessionWellOrganised: {
            ...sectionTwoFieldPresets,
            name: 'sessionWellOrganised',
            label: 'The session was well organised and structured',
            feedback: [],
          },
          sessionDurationAppropriate: {
            ...sectionTwoFieldPresets,
            name: 'sessionDurationAppropriate',
            label: 'The session duration was appropriate',
            feedback: [],
          },
          satisfiedWithQuality: {
            ...sectionTwoFieldPresets,
            name: 'satisfiedWithQuality',
            label: 'I feel satisfied with the quality of the training session',
            feedback: [],
          },
          feelConfidentToDeliver: {
            ...sectionTwoFieldPresets,
            name: 'feelConfidentToDeliver',
            label: 'I feel confident to deliver AFTER intervention',
            feedback: [],
          },
          anyOtherComments: {
            el: 'textarea',
            name: 'anyOtherComments',
            label:
              'Do you have any other additional comments or feedback on the training?',
            feedback: [],
            instructions: null,
          },
        },
      },
    }
  },
  computed: {
    ...mapState({
      surveyTwoCompleted: (state) => state.trainee.surveyTwoCompleted,
    }),
    traineeId() {
      return this.$auth.user.id
    },
    certificateSent() {
      return (
        this.$route.query.action &&
        this.$route.query.action === 'certificate_sent'
      )
    },
  },
  mounted() {
    if (this.surveyTwoCompleted) {
      this.formFeedbackMsg = this.setFormFeedbackMsg(
        this.formFeedbackMsgs.survey_completed,
        'success'
      )
    } else if (this.certificateSent) {
      this.formFeedbackMsg = this.setFormFeedbackMsg(
        this.formFeedbackMsgs.certificate_sent,
        'success'
      )
    }
  },
  methods: {
    ...mapActions('trainee', ['setSurveyTwoCompleted']),
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$nextTick(() => {	
          const firstErrorField = document.querySelector('.form-group-error')
          if(firstErrorField){
            this.$scrollTo(firstErrorField, 500, {})
          }
        })
      } else {
        this.form.submitStatus = 'PENDING'
        this.submitTrainingFeedback()
      }
    },
    async submitTrainingFeedback() {
      try {
        await this.$axios.post(
          this.$config.wpHeadlessUrl +
            `/wp-json/digitrial/v1/user/surveys/${this.traineeId}/update`,
          {
            survey_two: {
              ...this.formData,
            },
          }
        )
        this.setSurveyTwoCompleted(true)

        this.formFeedbackMsg = this.setFormFeedbackMsg(
          this.formFeedbackMsgs.submission_succeeded,
          'success'
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
      educationContent: {
        required,
      },
      educationDelivery: {
        required,
      },
      exercisesContent: {
        required,
      },
      exercisesDelivery: {
        required,
      },
      techniquesContent: {
        required,
      },
      techniquesDelivery: {
        required,
      },
      workbooksContent: {
        required,
      },
      workbooksDelivery: {
        required,
      },
      websiteContent: {
        required,
      },
      websiteDelivery: {
        required,
      },
      documentationContent: {
        required,
      },
      documentationDelivery: {
        required,
      },
      sessionWellOrganised: {
        required,
      },
      sessionDurationAppropriate: {
        required,
      },
      satisfiedWithQuality: {
        required,
      },
      feelConfidentToDeliver: {
        required,
      },
      anyOtherComments: {},
    },
  },
}
</script>

<style lang="scss" scoped>
</style>