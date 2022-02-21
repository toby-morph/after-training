<template>
  <LibFormGroup
    :field-id="fieldId"
    field-el="checkbox"
    :field-wrapper-classes="fieldWrapperClasses"
    :required="formGroupRequired"
    :validation-status="validationStatus"
    :label="label"
    :label-id="labelId"
    :instructions="instructions"
    :instructions-id="instructionsId"
    :feedback="formGroupFeedback"
    :feedback-id="feedbackId"
  >
    <div v-for="(option, index) in options" :key="fieldId + '_' + index">
      <LibFormBaseCheckbox
        :field-name="fieldName"
        :field-id="fieldId + '_' + index"
        :label="option.label"
        :value="option.value"
        :checked="isChecked(option.value)"
        :disabled="disabled"
        :auto-focus="autoFocus"
        :validation-status="validationStatus"
        @change="onChange"
        @blur="onBlur"
      />
    </div>
  </LibFormGroup>
</template>

<script>
import { formGroup } from '@/mixins/formGroup.js'

export default {
  mixins: [formGroup],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkedOptions: this.v.$model,
    }
  },
  methods: {
    isChecked(value) {
      return this.checkedOptions.includes(value)
    },
    onChange(value) {
      const checkboxValue = JSON.parse(value)
      for (const checkedOption in checkboxValue) {
        // does checkedOptions array already contain this value?
        if (this.checkedOptions.includes(checkedOption)) {
          if (!checkboxValue[checkedOption]) {
            // the checked option is set to false, so remove from array
            this.checkedOptions = this.checkedOptions.filter(
              (option) => option !== checkedOption
            )
          }
        } else if (checkboxValue[checkedOption]) {
          this.checkedOptions.push(checkedOption)
        }
      }

      this.$emit('input', this.checkedOptions)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>