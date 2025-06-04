<script setup>
import { ref, onMounted } from 'vue';
import HeaderNav from '../../../components/HeaderNav.vue';
import BottomTabNavigation from '../../../components/BottomTab.vue';
import StoreUtils from '../../../utils/storeUtils.js';
import {BarChart3, Home, TruckIcon} from "lucide-vue-next";
import Analytics from "../../../components/AnalyticsComponent.vue";
import DispatchServices from "../../../components/DispatchServices.vue";
import BusinessDashboard from "../../../components/BusinessDashboard.vue";

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const loading = store.get('business', 'getLoading');
// Active tab state
const activeTab = ref('dashboard');

// Toggle active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};


onMounted( () => {
    // if (userBusiness !== 'null') {
    //      store.dispatch('business', 'readSubscribe');
    //     // await store.dispatch('business', 'readUserTransactions');
    // }
});
</script>

<template>
    <div class="w-full">

        <div v-if="loading" class="flex justify-center items-center h-[40vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

      <div v-else class="min-h-screen flex bg-gray-100  relative">
        <!-- Main content area -->
        <div class="lg:w-24 md:w-24 bg-white fixed lg:static md:static bottom-0 w-full justify-center shadow-lg border-t border-gray-200">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center lg:flex-col md:flex-col lg:justify-start md:justify-start justify-center  lg:h-screen">
              <button
                  @click="setActiveTab('dashboard')"
                  class="flex flex-col items-center py-3 px-6"
                  :class="activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-500'"
              >
                <Home :size="24" />
                <span class="mt-1 text-xs font-medium">Dashboard</span>
              </button>

              <button
                  @click="setActiveTab('dispatch')"
                  class="flex flex-col items-center py-3 px-6"
                  :class="activeTab === 'dispatch' ? 'text-blue-600' : 'text-gray-500'"
              >
                <TruckIcon :size="24" />
                <span class="mt-1 text-xs font-medium">Dispatch</span>
              </button>

              <button
                  @click="setActiveTab('analytics')"
                  class="flex flex-col items-center py-3 px-6"
                  :class="activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-500'"
              >
                <BarChart3 :size="24" />
                <span class="mt-1 text-xs font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col gap-4 max-w-7xl mx-auto overflow-hidden px-4 md:px-6 pb-20 mt-5">
          <!-- Render the active component based on tab selection -->
          <BusinessDashboard v-if="activeTab === 'dashboard'" />
          <DispatchServices v-else-if="activeTab === 'dispatch'" />
          <Analytics v-else-if="activeTab === 'analytics'" />
        </div>

      </div>
    </div>
</template>