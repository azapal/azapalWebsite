<script setup>
import HeaderNav from '../../components/HeaderNav.vue';
import Button from '../../components/ui/button.vue';
import { Check, Trash, ArrowLeft, ChevronsUpDown, Loader2 } from 'lucide-vue-next';
import { onMounted, ref, computed, watch } from 'vue';
import StoreUtils from "../../utils/storeUtils";

const store = StoreUtils;
const banks = store.get('pay', 'getBanks');
const resolvedBank = store.get('pay', 'getResolvedAccount');
const isLoading = store.get('pay', 'getLoading');
const formValid = ref(false);
const searchTerm = ref('');
const showBankDropdown = ref(false);
const filteredBanks = computed(() => {
  if (!banks.value) return [];
  return searchTerm.value 
    ? banks.value.filter(bank => bank.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    : banks.value;
});

const createBankModel = ref({
  bank_account_number: "",
  bank_account_name: "",
  bank_name: "",
  bank_code: ""
});

// Check if form is valid for submission
watch([() => createBankModel.value.bank_code, () => resolvedBank.value], () => {
  formValid.value = !!createBankModel.value.bank_code && !!resolvedBank.value;
}, { deep: true });

const createBank = () => {
  if (!formValid.value) return;
  
  createBankModel.value.bank_account_name = resolvedBank.value.account_name;
  createBankModel.value.bank_name = banks.value.find(it => it.code === createBankModel.value.bank_code)?.name || '';
  
  store.dispatch('business', 'addBank', createBankModel.value);;
};

const selectBank = (bank) => {
  createBankModel.value.bank_code = bank.code;
  createBankModel.value.bank_name = bank.name;
  searchTerm.value = bank.name;
  showBankDropdown.value = false;
  console.log(createBankModel.value)
};

// const resolve = () => {
//   if (createBankModel.value.bank_account_number.length === 10 && createBankModel.value.bank_code) {
//     isLoading.value = true;
    
//     // Simulate API request
//     setTimeout(() => {
//       store.dispatch('pay', 'resolve', { 
//         account_number: createBankModel.value.bank_account_number, 
//         bank_code: createBankModel.value.bank_code 
//       });
//       isLoading.value = false;
//     }, 800);
//   }
// };

const resolve = (obj) => {
    if(obj.length === 10)
        store.dispatch('pay', 'resolve', { account_number: createBankModel.value.bank_account_number, bank_code:createBankModel.value.bank_code })

}

const clear = () => {
  createBankModel.value.bank_account_number = '';
  store.commit('pay', 'resolvedAccount', null);
};

onMounted(() => {
  store.dispatch('pay', 'readbank');
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <HeaderNav>
      <template v-slot:title>
        <div class="flex items-center gap-2">
          <router-link to="/profile" class="flex items-center">
            <ArrowLeft class="w-5 h-5" />
          </router-link>
          <h1 class="text-lg font-medium">Add Bank Account</h1>
        </div>
      </template>
      <template v-slot:others>
        <Button 
          @click="createBank" 
          :disabled="!formValid" 
          variant="outline" 
          class="w-24 sm:w-28 lg:hidden" 
          v-slot:child>
          <span v-if="!isLoading">Save</span>
          <Loader2 v-else class="w-4 h-4 animate-spin" />
        </Button>
      </template>
    </HeaderNav>

    <div class="max-w-md mx-auto px-4 py-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <!-- Progress indicator -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <span class="text-sm font-medium">1</span>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-900 dark:text-white">Bank Details</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">Add your bank account information</p>
            </div>
          </div>
          <div class="flex-1 max-w-[100px] mx-4 h-1 bg-gray-200 dark:bg-gray-700 rounded">
            <div :class="`h-full rounded bg-blue-600 dark:bg-blue-400 ${formValid ? 'w-full' : 'w-0'} transition-all duration-300`"></div>
          </div>
        </div>

        <form @submit.prevent="createBank" class="space-y-6">
          <!-- Bank Selection -->
          <div class="space-y-2">
            <label for="bank" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Bank</label>
            <div class="relative">
              <div 
                @click="showBankDropdown = !showBankDropdown" 
                class="flex items-center justify-between w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 cursor-pointer">
                <span :class="createBankModel.bank_code ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
                  {{ createBankModel.bank_name || 'Select your bank' }}
                </span>
                <ChevronsUpDown class="w-4 h-4 text-gray-500" />
              </div>
              
              <!-- Dropdown -->
              <div v-if="showBankDropdown" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div class="p-2 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <input 
                    v-model="searchTerm" 
                    type="text" 
                    placeholder="Search banks..." 
                    class="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700" 
                  />
                </div>
                <div class="py-1">
                  <button 
                    v-for="bank in filteredBanks" 
                    :key="bank.code" 
                    @click.prevent="selectBank(bank)" 
                    class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    :class="{'text-blue-600 dark:text-blue-400 font-medium': bank.code === createBankModel.bank_code}"
                  >
                    {{ bank.name }}
                    <Check v-if="bank.code === createBankModel.bank_code" class="w-4 h-4" />
                  </button>
                  <div v-if="filteredBanks.length === 0" class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No banks found
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Number -->
          <div class="space-y-2">
            <label for="accountNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Account Number
            </label>
            <div class="relative">
              <input 
                type="text" 
                id="accountNumber"
                v-model="createBankModel.bank_account_number" 
                @input="resolve(createBankModel.bank_account_number)"
                :disabled="!!resolvedBank"
                maxlength="10"
                placeholder="Enter 10-digit account number" 
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button 
                v-if="resolvedBank" 
                @click.prevent="clear" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                Edit
              </button>
            </div>
          </div>

          <!-- Account Name (Read Only) -->
          <div v-if="resolvedBank" class="space-y-2">
            <label for="accountName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Account Holder
            </label>
            <div class="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <Check v-if="resolvedBank" class="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
              <span class="text-gray-900 dark:text-white font-medium">{{ resolvedBank.account_name }}</span>
            </div>
          </div>

          <!-- Loading state for account resolution -->
          <div v-if="isLoading && !resolvedBank" class="flex items-center justify-center py-4">
            <Loader2 class="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Verifying account...</span>
          </div>

          <!-- Submit Button (only visible on mobile) -->
          <div class="hidden lg:flex">
            <Button 
              @click="createBank" 
              :disabled="!formValid" 
              variant="outline" 
              class="w-full" 
              v-slot:child>
              <span v-if="!isLoading">Save Bank Account</span>
              <Loader2 v-else class="w-4 h-4 animate-spin mr-2" />
            </Button>
          </div>
        </form>
      </div>

      <!-- Security Note -->
      <div class="mt-6 flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">Bank Account Security</h3>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Your bank account details are securely encrypted and protected. We comply with financial industry standards to ensure your data remains safe.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom scrollbar for dropdowns */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>