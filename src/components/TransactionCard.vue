<template>
  <div class="bg-white rounded-lg  overflow-hidden border border-gray-200 mb-3" v-for="(transaction, index) in props.data" :key="index">
    <!-- Card Header (Always visible - acts as accordion trigger) -->
    <div 
      @click="isExpanded = !isExpanded, currentIndex = index" 
      class="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div class="flex items-center">
        <div class="transform transition-transform" :class="isExpanded && currentIndex === index ? 'rotate-90' : ''">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-2">
          <span class="text-gray-500 text-sm">Settlement Code:</span>
          <span class="font-semibold ml-1">{{ transaction.sender_settlement_code }}</span>
        </div>
      </div>
      <div :class="getStatusClasses(transaction.status)" class="flex items-center px-2 py-1 rounded-md text-sm font-medium">
        <component :is="getStatusIcon(transaction.status)" class="w-4 h-4 mr-1" />
        <span>{{ transaction.status }}</span>
      </div>
    </div>
    
    <!-- Collapsible Content -->
    <div v-if="isExpanded && currentIndex === index" class="transition-all duration-300 ease-in-out">
      <!-- Card Body -->
      <div class="p-4 space-y-3">
        <!-- Dispatch Rider -->
        <div class="flex justify-between items-center">
          <span class="text-gray-500 text-sm">Dispatch Rider:</span>
          <span class="font-medium">{{ transaction.dispatch_code }}</span>
        </div>
        
        <!-- Seller -->
        <div class="flex justify-between items-center">
          <span class="text-gray-500 text-sm">Seller:</span>
          <span class="font-medium">{{ transaction.business_id }}</span>
        </div>
        
        <!-- Date -->
        <div class="flex justify-between items-center">
          <span class="text-gray-500 text-sm">Date:</span>
          <span class="font-medium">{{ formatDate(transaction.created_at) }}</span>
        </div>
        
        <!-- Amount -->
        <div class="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
          <span class="text-gray-500 text-sm">Total Amount:</span>
          <span class="text-lg font-bold">${{ transaction.total_amount.toFixed(2) }}</span>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CheckCircle, AlertCircle, Truck } from 'lucide-vue-next';

const props = defineProps({
  data:Array
})

const currentIndex = ref()

// Control accordion state
const isExpanded = ref(false);

// Sample transaction data
const transaction = ref({
  settlementCode: 'TRX-29384',
  dispatchRider: 'John Doe',
  seller: 'Tech Store Inc.',
  amount: 149.99,
  status: 'In Transit', // Could be: 'Pending', 'In Transit', 'Delivered', 'Disputed', 'Resolved'
  date: '2025-04-05'
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getStatusClasses = (status) => {
  switch(status) {
    case 'Delivered': 
      return 'bg-green-100 text-green-800';
    case 'Disputed': 
      return 'bg-red-100 text-red-800';
    case 'In Transit': 
      return 'bg-blue-100 text-blue-800';
    case 'Resolved': 
      return 'bg-emerald-100 text-emerald-800';
    default: 
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'Delivered': return CheckCircle;
    case 'Disputed': return AlertCircle;
    case 'In Transit': return Truck;
    case 'Resolved': return CheckCircle;
    default: return null;
  }
};

const canResolve = computed(() => {
  return ['Disputed', 'In Transit', 'Delivered'].includes(transaction.value.status);
});

const canDispute = computed(() => {
  return ['In Transit', 'Delivered'].includes(transaction.value.status) && transaction.value.status !== 'Disputed';
});

const handleResolve = () => {
  console.log('Resolving transaction:', transaction.value.settlementCode);
  // Add your resolve logic here - could update transaction status to 'Resolved'
  // transaction.value.status = 'Resolved';
};

const handleDispute = () => {
  console.log('Disputing transaction:', transaction.value.settlementCode);
  // Add your dispute logic here - could update transaction status to 'Disputed'
  // transaction.value.status = 'Disputed';
};
</script>