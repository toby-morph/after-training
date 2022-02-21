<template>
  <LibFormGroup
    :field-id="fieldId"
    field-el="select"
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
    <LibFormBaseSelect
      :ref="fieldId"
      :auto-focus="autoFocus"
      :field-id="fieldId"
      :field-name="fieldName"
      :aria-describedby="fieldAriaDescribedBy"
      :aria-labelledby="labelId"
      :disabled="disabled"
      :options="options"
      :validation-status="validationStatus"
      :value="value"
      @change="onChange"
      @blur="delayTouch(v)"
    />
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
    selected: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
  },
  // computed: {
  //   input: {
  //     get() {
  //       return this.value
  //     },
  //     set(value) {
  //       this.v.$touch()
  //       this.$emit('input', value)
  //     },
  //   },
  // },
  methods: {
    onChange(value) {
      // this.v.$touch()
      // this.delayTouch(this.v)
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>