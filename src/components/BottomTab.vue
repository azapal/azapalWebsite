<script setup>
import { ref, onMounted } from 'vue';
import { Home, TruckIcon, BarChart3 } from 'lucide-vue-next';
import BusinessDashboard from './BusinessDashboard.vue';
import DispatchServices from './DispatchServices.vue';
import Analytics from './AnalyticsComponent.vue';

// Active tab state
const activeTab = ref('dashboard');

// Toggle active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

onMounted(() => {
  // Any initialization logic can go here
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 pt-2">
    <!-- Main content area -->
    <div class="w-full flex flex-col gap-4 max-w-7xl mx-auto dark:bg-gray-800 overflow-hidden px-4 md:px-6 pb-20">
      <!-- Render the active component based on tab selection -->
      <BusinessDashboard v-if="activeTab === 'dashboard'" />
      <DispatchServices v-else-if="activeTab === 'dispatch'" />
      <Analytics v-else-if="activeTab === 'analytics'" />
    </div>

    <!-- Bottom Tab Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-around">
          <button
            @click="setActiveTab('dashboard')"
            class="flex flex-col items-center py-3 px-6"
            :class="activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'"
          >
            <Home :size="24" />
            <span class="mt-1 text-xs font-medium">Dashboard</span>
          </button>
          
          <button
            @click="setActiveTab('dispatch')"
            class="flex flex-col items-center py-3 px-6"
            :class="activeTab === 'dispatch' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'"
          >
            <TruckIcon :size="24" />
            <span class="mt-1 text-xs font-medium">Dispatch</span>
          </button>
          
          <button
            @click="setActiveTab('analytics')"
            class="flex flex-col items-center py-3 px-6"
            :class="activeTab === 'analytics' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'"
          >
            <BarChart3 :size="24" />
            <span class="mt-1 text-xs font-medium">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>