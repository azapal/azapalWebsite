<script setup lang="ts">

</script>

<template>

  <section class="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden  items-center">

    <div class="mx-auto px-4 flex items-center h-full">

      <div class="flex flex-col lg:flex-row items-center relative justify-around w-full">
        <slot name="content" />
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>