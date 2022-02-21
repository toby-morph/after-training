<template>
  <LibFormGroup
    :field-id="fieldId"
    field-el="textarea"
    :required="formGroupRequired"
    :label="label"
    :validation-status="validationStatus"
    :label-id="labelId"
    :instructions="instructions"
    :instructions-id="instructionsId"
    :feedback="formGroupFeedback"
    :feedback-id="feedbackId"
  >
    <LibFormBaseTextarea
      v-model="input"
      :field-id="fieldId"
      :field-name="fieldName"
      :value="value"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :aria-describedby="fieldAriaDescribedBy"
      :aria-labelledby="labelId"
      :validation-status="validationStatus"
      @input="delayTouch(v)"
      @blur="onBlur"
    />
  </LibFormGroup>
</template>

<script>
import { formGroup } from '@/mixins/formGroup.js'

export default {
  mixins: [formGroup],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    // passing value up to parent from child input component
    input: {
      get() {
        return this.value
      },
      set(value) {
        this.v.$touch()
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>