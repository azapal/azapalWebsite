<script setup>
import { ref, onMounted } from 'vue';
import formatAmount from '../utils/formatAmount';
import StoreUtils from '../utils/storeUtils';

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');

// Chart data for monthly transactions
const monthlyData = ref([
  { name: 'Nov', transactions: 850, amount: 145000, predicted: 145000 },
  { name: 'Dec', transactions: 940, amount: 168000, predicted: 168000 },
  { name: 'Jan', transactions: 920, amount: 172000, predicted: 172000 },
  { name: 'Feb', transactions: 1050, amount: 201000, predicted: 201000 },
  { name: 'Mar', transactions: 1150, amount: 223000, predicted: 223000 },
  { name: 'Apr', transactions: 1283, amount: 258750, predicted: 258750 },
  { name: 'May', transactions: null, amount: null, predicted: 275000 },
  { name: 'Jun', transactions: null, amount: null, predicted: 295000 },
]);

// Pie chart data for transaction methods
const methodDistribution = ref([
  { name: 'Credit Card', value: 45 },
  { name: 'Bank Transfer', value: 28 },
  { name: 'ACH', value: 15 },
  { name: 'PayPal', value: 8 },
  { name: 'Wire Transfer', value: 4 }
]);

// Active period for analytics
const activePeriod = ref('month');

onMounted(() => {
  // Initialize any analytics data needed
});
</script>

<template>
  <div v-if="userBusiness" class="w-full">
    <!-- Analytics Header -->
    <div class="shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-6 mb-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">Business Analytics</h2>
        
        <!-- Time period selector -->
        <div class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button @click="activePeriod = 'week'" :class="[
            'px-3 py-1 text-sm',
            activePeriod === 'week' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          ]">
            Week
          </button>
          <button @click="activePeriod = 'month'" :class="[
            'px-3 py-1 text-sm',
            activePeriod === 'month' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          ]">
            Month
          </button>
          <button @click="activePeriod = 'year'" :class="[
            'px-3 py-1 text-sm',
            activePeriod === 'year' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
          ]">
            Year
          </button>
        </div>
      </div>

      <!-- Analytics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Total Amount Card -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount Received</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                ₦{{ formatAmount(258750) }}
              </h3>
              <p class="text-sm text-green-600 dark:text-green-400 mt-2">+12.5% from last month</p>
            </div>
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-blue-600 dark:text-blue-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Successful Transactions -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Successful Transactions</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ userBusiness?.success_transation_rate_count || '1,283' }}
              </h3>
              <p class="text-sm text-green-600 dark:text-green-400 mt-2">+8.3% from last month</p>
            </div>
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-green-600 dark:text-green-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Failed Transactions -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Failed Transactions</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ userBusiness?.failed_transaction_rate_count || '127' }}
              </h3>
              <p class="text-sm text-red-600 dark:text-red-400 mt-2">-2.1% from last month</p>
            </div>
            <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-red-600 dark:text-red-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Conversion Rate -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                91%
              </h3>
              <p class="text-sm text-green-600 dark:text-green-400 mt-2">+0.4% from last month</p>
            </div>
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-purple-600 dark:text-purple-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <!-- Monthly Transactions Chart -->
        <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Transactions</h3>
          <div class="w-full h-64">
            <!-- Chart placeholder -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-12 h-12 mx-auto mb-2 opacity-50">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <p>Transaction trend would appear here</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Methods Chart -->
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Methods</h3>
          <div class="w-full h-64">
            <!-- Chart placeholder -->
            <div class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-12 h-12 mx-auto mb-2 opacity-50">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
                <p>Payment distribution would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transaction Analysis -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Transaction Analysis</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Peak Transaction Times -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Peak Transaction Times</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Weekday</span>
                <span class="font-medium">Thursday</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Time of Day</span>
                <span class="font-medium">2PM - 4PM</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Monthly</span>
                <span class="font-medium">End of Month</span>
              </div>
            </div>
          </div>
          
          <!-- Popular Products/Services -->
          <div>
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Top Transaction Sources</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Mobile App</span>
                <span class="font-medium">64%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">Website</span>
                <span class="font-medium">28%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600 dark:text-gray-400">In-Store</span>
                <span class="font-medium">8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>