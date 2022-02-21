<template>
  <div class="flow">
    <div class="rounded-lg p-4 bg-grey-mid-light flow">
      <LibBaseHtmlHeader
        level="3"
      >
        <slot name="action-header">
          Header
        </slot>
      </LibBaseHtmlHeader>
      <slot name="action-feedback" />
      <div class="flex flex-col justify-between sm:flex-row sm:items-center">
        <div class="flow">
          <slot name="action-text">
            Action Text
          </slot>
        </div>
        <div class="flex-shrink-0 ml-auto sm:ml-4 mt-4 sm:mt-0">
          <slot name="action-button">
            Action Button
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
