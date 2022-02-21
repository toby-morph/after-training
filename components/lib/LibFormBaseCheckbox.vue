<template>
  <div class="flex flex-row gap-x-2 mb-2 items-center">
    <input
      :id="fieldId"
      v-bind="$attrs"
      class="BaseInputControl BaseCheckbox"
      type="checkbox"
      :name="fieldName"
      :value="value"
      :disabled="disabled"
      :checked="checked"
      autocomplete="off"
      @change="onChange"
      @blur="$emit('blur')"
    >
    <label :for="fieldId">{{ label }}</label>
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
      const isChecked = !!e.target.checked
      const checkedObj = {}
      checkedObj[e.target.value] = isChecked
      this.$emit('change', JSON.stringify(checkedObj))
    },
  },
}
</script>

<style lang="scss">
// https://css-tricks.com/custom-styling-form-inputs-with-modern-css-features/
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
  @include baseFormInputs;
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>