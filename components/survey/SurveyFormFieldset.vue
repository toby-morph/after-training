<template>
  <div class="bg-grey-light p-4 rounded-lg">
    <fieldset class="flow block">
      <legend>
        <slot name="legend">
          Legend
        </slot>
      </legend>
      <slot name="fields" />
      </legend>
    </fieldset>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>