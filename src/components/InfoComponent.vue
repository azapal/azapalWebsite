<script setup lang="ts">
const props = defineProps({
  content: String,
  title:Screen
})
</script>

<template>
  <div class="flex items-start space-x-3 p-4 bg-white  rounded-xl border border-gray-200 ">
    <div class="p-1 bg-blue-100  rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h3 class="text-sm font-medium text-gray-900 ">{{ props.title }}</h3>
      <p class="mt-1 text-xs text-gray-500 ">
        {{props.content}}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>