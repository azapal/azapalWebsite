<template>
    <div>
        <!-- Modal container with backdrop -->
        <div class="modal-backdrop" @click="closeModal">
            <!-- Modal content -->
            <div class="modal-content" @click.stop>
                <!-- Modal header with title and close button -->
                <div class="modal-header">
                    <button @click="closeModal" class="close-button">
                        &times;
                    </button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="relative flex justify-center animate-fade-in" :style="{ animationDelay: '0.3s' }">
                        <div class="absolute w-full max-w-lg aspect-square md:aspect-auto">
                            <div
                                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md rounded-full bg-purple/10 blur-3xl">
                            </div>
                            <!-- bg-gradient-to-br from-gray-100 to-gray-200 -->
                            <div
                                class="relative bg-white rounded-2xl overflow-hidden">
                                <div class="w-full h-full rounded-lg">
                                    <!-- Tabs -->
                                    <div class="flex border-b justify-between border-gray-200 mb-4">
                                        <button @click="activeTab = 'single'"
                                            class="lg:py-3 lg:px-4 flex flex-col lg:flex-row items-center lg:space-x-2"
                                            :class="activeTab === 'single' ? 'border-b-2 border-[#F97316] text-[#F97316]' : 'text-gray-500'">
                                            <CreditCard class="w-4 h-4" />
                                            <span>Single Payment</span>
                                        </button>
                                        <button @click="activeTab = 'multiple'"
                                            class="lg:py-3 lg:px-4 flex flex-col lg:flex-row items-center lg:space-x-2"
                                            :class="activeTab === 'multiple' ? 'border-b-2 border-[#F97316] text-[#F97316]' : 'text-gray-500'">
                                            <SendToBack class="w-4 h-4" />
                                            <span>Multiple Payments</span>
                                        </button>
                                    </div>

                                    <form class="lg:p-4 p-2" @submit.prevent="submitForm">
                                        <!-- Single Transfer Tab -->
                                        <div v-if="activeTab === 'single'">
                                            <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
                                                <div class="w-full">
                                                    <label for="single_vendor"
                                                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                                                        <span
                                                            class="text-xs font-medium text-gray-700 dark:text-gray-200">Vendor/Business</span>
                                                        <input type="text" id="single_vendor" required
                                                            placeholder="Search Vendor/business"
                                                            v-model="singleTransfer.vendor"
                                                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                                                    </label>
                                                    <label for="single_amount"
                                                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                                                        <span
                                                            class="text-xs font-medium text-gray-700 dark:text-gray-200">Amount</span>
                                                        <input type="text" required id="single_amount"
                                                            placeholder="Enter amount" v-model="singleTransfer.amount"
                                                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Multiple Transfers Tab -->
                                        <div v-if="activeTab === 'multiple'">
                                            <div v-for="(transfer, index) in multipleTransfers" :key="index"
                                                class="bg-white rounded-lg shadow-sm p-4 mb-4">
                                                <div class="flex justify-between items-start mb-2">
                                                    <h3 class="text-sm font-medium text-gray-700">Payment #{{ index + 1
                                                        }}</h3>
                                                    <button v-if="multipleTransfers.length > 1"
                                                        @click="removeTransfer(index)" type="button"
                                                        class="text-red-500 hover:text-red-700">
                                                        <X class="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div class="w-full">
                                                    <label :for="'vendor_' + index"
                                                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                                                        <span
                                                            class="text-xs font-medium text-gray-700 dark:text-gray-200">Vendor/Business</span>
                                                        <input type="text" :id="'vendor_' + index" required
                                                            placeholder="Search Vendor/business"
                                                            v-model="transfer.vendor"
                                                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                                                    </label>
                                                    <label :for="'amount_' + index"
                                                        class="block mb-5 w-full overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                                                        <span
                                                            class="text-xs font-medium text-gray-700 dark:text-gray-200">Amount</span>
                                                        <input type="text" required :id="'amount_' + index"
                                                            placeholder="Enter amount" v-model="transfer.amount"
                                                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                                                    </label>
                                                </div>
                                            </div>

                                            <!-- Add new transfer button -->
                                            <div class="mb-4">
                                                <button @click="addTransfer" type="button"
                                                    class="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F97316] hover:text-[#F97316] transition-colors">
                                                    <PlusCircle class="w-5 h-5 mr-2" />
                                                    <span>Add Another Transfer</span>
                                                </button>
                                            </div>

                                            <!-- Total amount display for multiple transfers -->
                                            <div v-if="multipleTransfers.length > 1"
                                                class="bg-white rounded-lg shadow-sm p-4 mb-4">
                                                <div class="flex justify-between items-center">
                                                    <span class="font-medium">Total Amount</span>
                                                    <span class="font-bold text-lg">${{ calculateTotal() }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-full flex justify-end">
                                            <Button type="submit"
                                                class="bg-[#F97316] hover:bg-[#EA580C] text-white py-3 px-6 rounded-lg font-medium transition-colors"
                                                v-slot:child>
                                                Pay Securely
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowRight, Shield, Users, Truck, CreditCard, SendToBack, PlusCircle, X } from "lucide-vue-next";
import Button from "./ui/button.vue";
import { ref, computed } from 'vue';
import { defineEmits } from 'vue'

const emit = defineEmits(['close'])

// Props
const props = defineProps({
    title: {
        type: String,
        default: 'Modal Title'
    }
});

const activeTab = ref('single');
const singleTransfer = ref({
  vendor: '',
  amount: ''
});

const multipleTransfers = ref([
  {
    vendor: '',
    amount: ''
  }
]);

const addTransfer = () => {
  multipleTransfers.value.push({
    vendor: '',
    amount: ''
  });
};

const removeTransfer = (index) => {
  multipleTransfers.value.splice(index, 1);
};

const calculateTotal = () => {
  return multipleTransfers.value
    .reduce((total, transfer) => {
      const amount = parseFloat(transfer.amount) || 0;
      return total + amount;
    }, 0)
    .toFixed(2);
};

const submitForm = () => {
  if (activeTab.value === 'single') {
    console.log('Single Transfer:', singleTransfer.value);
    // Process single transfer
  } else {
    console.log('Multiple Transfers:', multipleTransfers.value);
    console.log('Total Amount:', calculateTotal());
    // Process multiple transfers
  }
};

// State
const isModalOpen = ref(false);

// Methods
const closeModal = () => {
    emit('close', false)
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    min-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
}

.modal-body {
    padding: 20px;
}

.modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.close-button:hover {
    color: #000;
}

.open-button,
.modal-button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.open-button:hover,
.modal-button:hover {
    background-color: #45a049;
}
</style>