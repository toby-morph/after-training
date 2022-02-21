<template>
  <div class="w-full">
    <div class="flex items-center mb-2">
      <legend v-if="fieldEl === 'checkbox'" class="block font-bold mr-2">
        {{ label }}
      </legend>
      <label
        v-else
        :id="labelId"
        :for="fieldId"
        :class="labelClassList"
        class="font-bold mr-2"
      >
        {{ label }}
        <span v-if="!required">(optional)</span>
      </label>
      <TickIcon
        v-show="validationStatus === 'success'"
        class="h-4 w-auto fill-success"
      />
      <CloseIcon
        v-show="validationStatus === 'warning'"
        class="h-4 w-auto fill-warning"
      />
      <!-- absolute top-1 right-0  -->
    </div>
    <div>
      <div
        :class="
          fieldWrapperClasses.length > 0 ? fieldWrapperClasses.join(' ') : false
        "
      >
        <slot />
      </div>
    </div>
    <div
      v-show="validationStatus === 'warning' && feedback.length > 0"
      :id="feedbackId"
      :class="feedbackClassList"
      class="p-2"
    >
      <ul>
        <li v-for="(feedbackMsg, index) in feedback" :key="index" v-html="feedbackMsg" />
      </ul>
    </div>
    <div
      v-if="instructions"
      :id="instructionsId"
      class="text-xs-small text-color-body"
    >
      <p>{{ instructions }}</p>
    </div>
  </div>
</template>

<script>
import TickIcon from '@/assets/icons/tick.svg?inline'
import CloseIcon from '@/assets/icons/close.svg?inline'
export default {
  components: {
    TickIcon,
    CloseIcon,
  },
  props: {
    fieldEl: {
      type: String,
      required: true,
    },
    fieldId: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    instructions: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    labelId: {
      type: String,
      required: true,
    },
    instructionsId: {
      type: String,
      required: true,
    },
    feedback: {
      type: Array,
      default() {
        return []
      },
    },
    feedbackId: {
      type: String,
      required: true,
    },
    validationStatus: {
      type: String,
      default: 'clean',
    },
    fieldWrapperClasses: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    feedbackClassList() {
      const classList = []
      switch (this.validationStatus) {
        case 'warning':
          classList.push('bg-warning-light')
          break
        case 'success':
          classList.push('bg-success-light')
          break
        default:
        // classList.push()
      }
      return classList.join(' ')
    },
    labelClassList() {
      const classList = []
      switch (this.validationStatus) {
        case 'warning':
          classList.push('text-warning')
          break
        case 'success':
          classList.push('text-success')
          break
        default:
        // classList.push()
      }
      return classList.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>