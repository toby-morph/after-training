<template>
  <div class="flow" style="--flow-space:3rem">
    <div class="flex flex-wrap gap-4">
      <slot />
    </div>
    <p>
      If you are having difficulties logging in, please contact <LibBaseLink :link="`mailto:${$config.siteAdminEmail}`" class="underline">
        {{ $config.siteAdminEmail }}
      </LibBaseLink>
    </p>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>