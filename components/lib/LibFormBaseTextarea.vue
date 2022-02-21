<template>
  <textarea
    :id="fieldId"
    :ref="fieldId"
    :name="fieldName"
    :disabled="disabled"
    class="
      w-full
      bg-white
      border border-grey-mid
      hover:border-primary
      text-xs-base
      leading-xs-base
      md:text-base
      md:leading-base
      p-2
      rounded
      focus:shadow-outline-on-light
      focus-visible:shadow-outline-on-light focus-visible:outline-none
    "
    :rows="rows"
    :cols="cols"
    :value="value"
    @input="onInput"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
  <!-- v-model="currentValue" -->
</template>

<script>
export default {
  props: {
    fieldName: {
      type: String,
      required: true,
    },
    fieldId: {
      type: String,
      required: true,
    },
    rows: {
      type: Number,
      default: 5,
    },
    cols: {
      type: Number,
      default: 33,
    },
    value: {
      type: String,
      default: '',
    },
    validationStatus: {
      type: String,
      default: 'clean',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.getDefaultValue(),
    }
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
      // console.log(e.target.value)
      this.$emit('input', e.target.value)
    },
    // https://liamhammett.com/textarea-slots-in-vue-components-DqzaN6o4
    getDefaultValue() {
      if (this.$slots.default && this.$slots.default.length) {
        return this.$slots.default[0].text
      }

      return this.value
    },
  },
}
</script>

<style lang="scss" scoped>
</style>