<template>
  <div class="flex flex-row mb-2 items-center">
    <input
      :id="fieldId"
      v-bind="$attrs"
      type="radio"
      :name="fieldName"
      :value="value"
      :disabled="disabled"
      :checked="checked ? 'checked' : false"
      autocomplete="off"
      @change="onChange"
      @blur="$emit('blur')"
    >
    <label :for="fieldId" class="ml-2" :class="hiddenLabel ? 'sr-only' : ''">{{ label }}</label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    fieldName: {
      type: String,
      required: true,
    },
    fieldId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    hiddenLabel: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: 'on',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    validationStatus: {
      type: String,
      default: 'clean',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classList() {
      const classList = []
      switch (this.validationStatus) {
        case 'warning':
          classList.push('border-warning')
          break
        case 'success':
          classList.push('border-success')
          break
      }
      return classList.join(' ')
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style lang="scss">
// https://css-tricks.com/custom-styling-form-inputs-with-modern-css-features/
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  @include baseFormInputs;
  input[type='radio'] {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, 0.7));
    }
    &:checked {
      --s: 0.5;
    }
  }
}
</style>