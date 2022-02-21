<template>
  <div class="relative w-full">
    <!-- {{ value }} -->
    <select
      :id="fieldId"
      :ref="fieldId"
      :name="fieldName"
      :class="classList"
      v-bind="$attrs"
      class="
        w-full
        block
        appearance-none
        w-full
        bg-white
        border border-grey-mid
        hover:border-primary
        text-xs-base
        leading-xs-base
        md:text-base
        md:leading-base
        p-2
        pr-8
        rounded
        focus:shadow-outline-on-light
        focus-visible:shadow-outline-on-light focus-visible:outline-none
      "
      :disabled="disabled"
      @change="$emit('change', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
      <option :value="null">
        Please select one
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="value === option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div
      class="
        pointer-events-none
        absolute
        inset-y-0
        right-0
        flex
        items-center
        px-2
        text-grey
      "
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
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
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    classList() {
      const classList = []
      switch (this.status) {
        case 'warning':
          classList.push('border-warning')
          break
        case 'success':
          classList.push('border-success')
          break
        default:
        // classList.push()
      }
      return classList
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
    onChange(e) {
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>