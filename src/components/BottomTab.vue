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

</template>

<style scoped>
/* Add any custom styles here */
</style>