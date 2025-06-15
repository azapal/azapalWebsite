<script setup>
import { ref, computed, onMounted } from 'vue';
import formatAmount from '../utils/formatAmount';
import StoreUtils from '../utils/storeUtils';
import {FileCheck, FileCheck2, BookCheck} from "lucide-vue-next"
import Dispatch from "./Dispatch.vue";
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

      </div>
    </div>

    <Dispatch />

    <div class="shadow-sm bg-white rounded-lg overflow-hidden p-6 mb-4 ">
      <p>Tools to help your business succed</p>

      <div>
        <div>
          <FileCheck />
          <p>Invoice</p>
        </div>

        <div>
          <BookCheck />
          <p>Customer book</p>
        </div>

        <div>
          <FileCheck2 />
          <p>Automated Reciepts</p>
        </div>
      </div>

    </div>

  </div>
</template>