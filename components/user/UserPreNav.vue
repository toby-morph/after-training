<template>
  <LibPreNav v-if="$auth.loggedIn">
    <template #title>
      AFTER intervention
    </template><template #nav>
      <div
        class="flex justify-between items-center"
      >
        <nav class="ml-auto space-x-4">
          <LibBaseLink link="/login">
            Log out
          </LibBaseLink>
        </nav>
      </div>
    </template>
  </LibPreNav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>