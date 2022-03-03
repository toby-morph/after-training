<template>
  <div class="pt-8 border-t border-grey-mid-light">
    <fieldset class="flow block">
      <legend class="font-bold">
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