<template>
  <div class="BaseProse flow">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.BaseProse {
  h2 {
    @apply text-color-h2 text-xs-h2 leading-xs-h2;
    @screen md {
      @apply text-h2 leading-h2;
    }
  }
  h3 {
    @apply text-color-h3 text-xs-h3 leading-xs-h3;
    @screen md {
      @apply text-h3 leading-h3;
    }
  }
  h4 {
    @apply text-color-h4 text-xs-h4 leading-xs-h4;
    @screen md {
      @apply text-h4 leading-h4;
    }
  }
  h5 {
    @apply text-color-h5 text-xs-h5 leading-xs-h5;
    @screen md {
      @apply text-h4 leading-h4;
    }
  }
  ul {
    @apply list-outside;
  }
  ul li {
    @apply text-color-body relative pl-4;
    &:before {
      @apply bg-color-bullets block w-2 h-2 rounded-full mr-2 absolute top-0 left-0;
      content: '';
      margin-top: 0.5em;
    }
  }
  ol {
    @apply list-decimal list-outside pl-6;
  }
  a {
    @apply underline;
  }
  p {
    @apply text-color-body;
  }
  p + h1,
  p + h2,
  p + h3,
  p + h4,
  p + h5,
  p + .lead {
    @apply pt-4;
  }
  p + p.lead {
    @apply pt-4;
  }
  table {
    @apply bg-primary-light;
  }
  table th,
  table td {
    @apply text-left p-2;
  }
  .lead,
  strong {
    @apply text-color-lead font-weight-lead;
  }
}
</style>
