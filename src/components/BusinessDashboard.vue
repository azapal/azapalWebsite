<script setup>
import { ref, computed, onMounted } from 'vue';
import formatAmount from '../utils/formatAmount';
import StoreUtils from '../utils/storeUtils';

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const transactionsData = store.get('business', 'getTransactions');

// Active tab state for payments section
const activePaymentTab = ref('NewPayments');

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
  <div v-if="userBusiness" class="w-full">
    <!-- Business Profile Card -->
    <div class="shadow-sm bg-white rounded-lg overflow-hidden p-6 mb-4 ">
      <!-- Business Info Section - Logo, Name and Balance -->
      <div class="flex flex-col items-center mt-2 mb-8">
        <!-- Business Logo -->
        <div class="mb-4">
          <img class="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
            :src="userBusiness.logo" alt="Business Logo" />
        </div>

        <!-- Business Name -->
        <h2 class="text-gray-800  text-xl font-bold mb-2">
          {{ userBusiness?.name }}
        </h2>

        <!-- Account Balance -->
        <div class="flex items-center gap-2">
          <div class="bg-gray-100  px-4 py-2 rounded-lg">
            <span class="text-gray-800  font-semibold">
              ₦{{ formatAmount(userBusiness?.balance) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="w-full">
        <!-- Tab Headers -->
        <div class="flex border-b border-gray-200">
          <button @click="activePaymentTab = 'NewPayments'" :class="[
            'px-4 py-2 font-medium text-sm',
            activePaymentTab === 'NewPayments'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            New Payments
          </button>
          <button @click="activePaymentTab = 'ongoing'" :class="[
            'px-4 py-2 font-medium text-sm',
            activePaymentTab === 'ongoing'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Ongoing
          </button>
          <button @click="activePaymentTab = 'completed'" :class="[
            'px-4 py-2 font-medium text-sm',
            activePaymentTab === 'completed'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          ]">
            Completed
          </button>
        </div>

        <!-- Tab Content -->
        <div class="py-4">
          <div v-if="activePaymentTab === 'NewPayments'" class="text-gray-600">
            <div v-if="newPayments?.length === 0" class="text-center text-sm">
              No pending payments available
            </div>
            <div v-else class="space-y-3">
              <div v-for="payment in newPayments" :key="payment.id"
                class="border border-gray-200 p-3 rounded-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">Amount: ₦{{ formatAmount(payment.total_amount) }}</p>
                    <p class="text-sm text-gray-500">Ref: {{ payment.reference }}</p>
                    <p class="text-sm text-gray-500">Date: {{ formatDate(payment.created_at) }}</p>
                    <p v-if="payment.remarks" class="text-sm">Remarks: {{ payment.remarks }}</p>
                  </div>
                  <div class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="activePaymentTab === 'ongoing'" class="text-gray-600">
            <div v-if="ongoing?.length === 0" class="text-center text-sm">
              No ongoing transactions available
            </div>
            <div v-else class="space-y-3">
              <div v-for="payment in ongoing" :key="payment.id"
                class="border border-gray-200 p-3 rounded-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">Amount: ₦{{ formatAmount(payment.total_amount) }}</p>
                    <p class="text-sm text-gray-500">Ref: {{ payment.reference }}</p>
                    <p class="text-sm text-gray-500">Paid on: {{ formatDate(payment.paid_at) }}</p>
                    <p class="text-sm text-gray-500">Channel: {{ payment.channel }}</p>
                    <p v-if="payment.remarks" class="text-sm">Remarks: {{ payment.remarks }}</p>
                  </div>
                  <div class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Approved
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else-if="activePaymentTab === 'completed'" class="text-gray-600">
            <div v-if="completed?.length === 0" class="text-center text-sm">
              No completed transactions available
            </div>
            <div v-else class="space-y-3">
              <div v-for="payment in completed" :key="payment.id"
                class="border border-gray-200 p-3 rounded-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-medium">Amount: ₦{{ formatAmount(payment.total_amount) }}</p>
                    <p class="text-sm text-gray-500">Ref: {{ payment.reference }}</p>
                    <p class="text-sm text-gray-500">Date: {{ formatDate(payment.completed_at || payment.paid_at) }}</p>
                    <p v-if="payment.remarks" class="text-sm">Remarks: {{ payment.remarks }}</p>
                  </div>
                  <div class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>