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
      <LibFormBaseRadioButton
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
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    isChecked(value) {
      return this.value === value
    },
    onChange(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>