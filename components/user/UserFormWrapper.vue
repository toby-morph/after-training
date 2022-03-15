<template>
  <div class="bg-white rounded-lg p-4 md:p-8 mx-auto flow">
    <LibBaseHtmlHeader level="1" header-font-size="3">
      <slot name="title">
        Form title
      </slot>
    </LibBaseHtmlHeader>
    <slot name="form" />
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>