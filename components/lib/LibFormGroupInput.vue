<template>
  <LibFormGroup
    :field-id="fieldId"
    field-el="input"
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
    <LibFormBaseInput
      :ref="fieldId"
      v-model="input"
      :auto-focus="autoFocus"
      :autocomplete="autoComplete"
      :field-id="fieldId"
      :field-name="fieldName"
      :input-type="inputType"
      :aria-describedby="fieldAriaDescribedBy"
      :aria-labelledby="labelId"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
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
    placeholder: {
      type: String,
      default: null,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    input: {
      get() {
        return this.value
      },
      set(value) {
        // this.v.$touch()
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    // validate field immediately if value is pre-filled
    if (this.value) {
      this.v.$touch()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>