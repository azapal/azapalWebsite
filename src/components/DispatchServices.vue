<script setup>
import { ref, onMounted, computed } from 'vue';
import StoreUtils from '../utils/storeUtils';
import Dispatch from './Dispatch.vue';

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const dispatchUsers = ref([]);
const loading = ref(false);
const activeView = ref('pending');

// Functions to manage dispatch services
const fetchDispatchUsers = async () => {
  loading.value = true;
  try {
    // Mock data since actual implementation is not visible in the provided code
    // In your actual implementation, you would fetch real data from your API
    dispatchUsers.value = [
      { id: 1, name: 'John Doe', status: 'pending', location: 'Lagos', phone: '+234123456789' },
      { id: 2, name: 'Jane Smith', status: 'active', location: 'Abuja', phone: '+234987654321' },
      { id: 3, name: 'Mark Johnson', status: 'completed', location: 'Port Harcourt', phone: '+234555666777' }
    ];
  } catch (error) {
    console.error('Error fetching dispatch users:', error);
  } finally {
    loading.value = false;
  }
};

const getStatusBadgeClass = (status) => {
  if (status === 'active') return 'bg-green-100 text-green-800';
  if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (status === 'completed') return 'bg-blue-100 text-blue-800';
  return 'bg-gray-100 text-gray-800';
};

const filteredUsers = computed(() => {
  if (activeView.value === 'all') return dispatchUsers.value;
  return dispatchUsers.value.filter(user => user.status === activeView.value);
});

onMounted(() => {
  fetchDispatchUsers();
});
</script>

<template>
  <div v-if="userBusiness" class="w-full">
    <Dispatch />
    <div class="shadow-sm mt-5 bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-6 mb-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Dispatch Services</h2>
       
      </div>

      <!-- View filters -->
      <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button @click="activeView = 'pending'" :class="[
          'px-4 py-2 font-medium text-sm',
          activeView === 'pending'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        ]">
          Pending
        </button>
        <button @click="activeView = 'active'" :class="[
          'px-4 py-2 font-medium text-sm',
          activeView === 'active'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        ]">
          Active
        </button>
        <button @click="activeView = 'completed'" :class="[
          'px-4 py-2 font-medium text-sm',
          activeView === 'completed'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        ]">
          Completed
        </button>
        <button @click="activeView = 'all'" :class="[
          'px-4 py-2 font-medium text-sm',
          activeView === 'all'
            ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        ]">
          All
        </button>
      </div>

      <!-- Dispatch list -->
      <div v-if="loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="filteredUsers.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        No dispatch services found for this filter
      </div>
      
      <div v-else class="space-y-4">
        <div v-for="user in filteredUsers" :key="user.id" 
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-gray-800 dark:text-white">{{ user.name }}</div>
              <div class="text-sm text-gray-500">{{ user.location }}</div>
              <div class="text-sm text-gray-500">{{ user.phone }}</div>
            </div>
            <div>
              <span :class="[
                'px-3 py-1 rounded-full text-xs',
                getStatusBadgeClass(user.status)
              ]">
                {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end space-x-2">
            <button class="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded text-sm">
              Details
            </button>
            <button class="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded text-sm">
              {{ user.status === 'pending' ? 'Approve' : (user.status === 'active' ? 'Complete' : 'Reopen') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>