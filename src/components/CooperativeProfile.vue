<script setup>
import { ref, computed, onMounted } from 'vue';
import {BadgeInfo} from 'lucide-vue-next'
import formatAmount from '../utils/formatAmount';
import StoreUtils from '../utils/storeUtils';

const store = StoreUtils;
const cooperative = ref(store.get('business', 'getUserCooperative'));
const transactionsData = store.get('business', 'getTransactions');

// Active tab state for payments section
const activePaymentTab = ref('Users');

// Pagination for transactions
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');

// Filtered transaction data
const newPayments = computed(() => {
  return transactionsData?.value?.filter(transaction =>
      transaction.status === 'pending'
  );
});

const ongoing = computed(() => {
  return transactionsData?.value?.filter(transaction =>
      transaction.status === 'approved'
  );
});

const completed = computed(() => {
  return transactionsData?.value?.filter(transaction =>
      transaction.status === 'completed'
  );
});

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


</script>

<template>
    <!-- Business Profile Card -->
    <div class="bg-white  py-6">

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">{{ cooperative?.corporative_name }}</h1>
            <p class="mt-1 text-sm text-gray-500">{{ cooperative.description }}</p>
          </div>
          <div class="flex gap-1 text-sm">
            <BadgeInfo />
            <button class="bg-[#fafafa] hover:shadow p-1 rounded">Add Coordinators</button>
          </div>

        </div>

        <!-- Overview Statistics -->
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Total Savings Card -->
          <div class="bg-white max-h-auto shadow rounded-lg">
            <div v-if="cooperative?.is_verified">
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div  class="ml-5 w-0 flex-1">
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Total Savings
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">
                        $100,000
                      </div>
                    </dd>
                  </div>

                </div>
              </div>
              <div class="bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <router-link to="/members" class="font-medium text-indigo-600 hover:text-indigo-500">
                    View Cooperative Details
                  </router-link>
                </div>
              </div>
            </div>
            <div class="items-center justify-center flex flex-col h-full gap-2 text-sm">
              <p class="text-md text-center">Complete verification process to activate wallet</p>
              <button class="p-2 bg-gray-900 text-white rounded cursor-pointer hover:bg-[#F97316]">Complete Verification</button>
            </div>

          </div>

          <!-- Members Card -->
          <div class="bg-white  max-h-auto shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Members
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                     0
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
</template>