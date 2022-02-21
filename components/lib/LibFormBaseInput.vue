<template>
  <div class="relative">
    <input
      :id="fieldId"
      :ref="fieldId"
      v-bind="$attrs"
      :name="fieldName"
      :class="classList"
      class="
        w-full
        bg-white
        text-black
        border border-grey-mid
        text-base
        leading-base
        p-2
        rounded
        focus:shadow-outline-on-light
        focus-visible:shadow-outline-on-light focus-visible:outline-none
      "
      :type="displayInputType"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
    <button
      v-if="inputType === 'password'"
      class="
        absolute
        inset-y-0
        right-2
        flex
        items-center
        justify-center
        focus:shadow-outline-on-light
        focus-visible:shadow-outline-on-light focus-visible:outline-none
      "
      @click.prevent="revealPassword"
    >
      <div v-show="displayInputType === 'password'">
        <span class="sr-only">Show password</span>
        <CircleEye class="fill-primary h-8 w-8" />
      </div>
      <div v-show="displayInputType === 'text'">
        <span class="sr-only">Hide password</span>
        <CircleEyeLine class="fill-primary h-8 w-8" />
      </div>
    </button>
  </div>
</template>

<script>
import CircleEye from '@/assets/icons/circle-eye.svg?inline'
import CircleEyeLine from '@/assets/icons/circle-eye-line.svg?inline'

export default {
  components: {
    CircleEye,
    CircleEyeLine,
  },
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
    inputType: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    validationStatus: {
      type: String,
      default: 'clean',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayInputType: this.inputType,
    }
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
  mounted() {
    this.$nextTick(() => {
      if (this.autoFocus) {
        this.$refs[this.fieldId].focus()
      }
    })
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    revealPassword() {
      this.displayInputType =
        this.displayInputType === 'text' ? 'password' : 'text'
    },
  },
}
</script>