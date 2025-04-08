<script setup>
import { ArrowLeft } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import SendMoney from '../../components/forms/SendMoney.vue';
import HeaderNav from '../../components/HeaderNav.vue';
import TransactionCard from '../../components/TransactionCard.vue';
import router from '../../router';
import SuccessModal from '../../components/SuccessModal.vue';

let currentRoute;

currentRoute = router?.currentRoute?.value?.query.reference

// Uncomment these when you're ready to use the store
import StoreUtils from '../../utils/storeUtils'
const store = StoreUtils
const userBusiness = store.get('business', 'getBusiness')
const user = store.get('auth', 'getCurrentUser')
const transactions = store.get('pay', 'getTransactions')
const sessionCode = store.get('pay', 'getSessionCode')



const profileTab = ref('send_money');

const isBusiness = Object?.keys(userBusiness)?.length === 0

function handleModalClose(){}

function handleConfirmation(){}

onMounted(() => {
    console.log(currentRoute)
    store.dispatch('business', 'readBusiness')
    store.dispatch('pay', 'getInitializePayment')

    if (currentRoute) return store.dispatch('pay', 'verifyTransaction', { reference: currentRoute });
})
</script>

<template>
    <HeaderNav v-slot:el>
        <router-link to="/create-business"
                    class="flex items-center justify-center gap-2 px-4 py-2.5 border hover:text-white border-gray-300 hover:bg-green-700 rounded-lg transition-colors text-sm font-medium">
                    
                    Create Business
                </router-link>
    </HeaderNav>

    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 lg:pt-2">
        <!-- Main container with responsive width -->
        <div class="flex  flex-col  gap-2  max-w-4xl mx-auto dark:bg-gray-800 overflow-hidden">
            <div class="shadow-sm bg-white rounded">
                <!-- Tab Navigation -->
                <div class="px-4 mt-4">
                    <div class="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                        <button @click="profileTab = 'send_money'" :class="[
                            'inline-flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap focus:outline-none',
                            profileTab === 'send_money'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-gray-300'
                        ]">
                            Send Money
                        </button>

                        <button @click="profileTab = 'transaction'" :class="[
                            'inline-flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap focus:outline-none',
                            profileTab === 'transaction'
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-gray-300'
                        ]">
                            Transactions
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="p-4">
                    <div v-if="profileTab === 'send_money'" class="w-full">
                        <SendMoney />
                    </div>
                    <div v-if="profileTab === 'transaction'" class="w-full">
                        <!-- <Post /> -->
                        <div class="text-center text-gray-500 dark:text-gray-400">
                            <TransactionCard :data="transactions" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>
/* Add any additional component-specific styles here */
</style>