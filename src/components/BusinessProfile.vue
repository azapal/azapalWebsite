<script setup>
import { ArrowLeft } from 'lucide-vue-next';
import { ref, onMounted, computed } from 'vue';
import SendMoney from '../components/forms/SendMoney.vue';
import HeaderNav from '../components/HeaderNav.vue';
// import { LineChart, BarChart, PieChart, AreaChart } from 'recharts';
import Dispatch from './Dispatch.vue';
import formatAmount from '../utils/formatAmount';
// Store utilities
import StoreUtils from '../utils/storeUtils'
const store = StoreUtils
const userBusiness = store.get('business', 'getBusiness')

// Active tab state
const profileTab = ref('dashboard');

// Pagination for transactions
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');

// Dummy transactions data
const transactionsData = ref([
    { id: 'TX12345', date: '2025-04-05', amount: 1250.00, status: 'success', customer: 'John Smith', method: 'Credit Card' },
    { id: 'TX12346', date: '2025-04-05', amount: 785.50, status: 'success', customer: 'Sarah Johnson', method: 'Bank Transfer' },
    { id: 'TX12347', date: '2025-04-04', amount: 2500.00, status: 'success', customer: 'Tech Innovations Inc.', method: 'ACH' },
    { id: 'TX12348', date: '2025-04-04', amount: 199.99, status: 'failed', customer: 'Michael Brown', method: 'Credit Card' },
    { id: 'TX12349', date: '2025-04-03', amount: 5000.00, status: 'success', customer: 'Enterprise Solutions', method: 'Wire Transfer' },
    { id: 'TX12350', date: '2025-04-03', amount: 349.99, status: 'pending', customer: 'Amanda Wilson', method: 'PayPal' },
    { id: 'TX12351', date: '2025-04-02', amount: 1800.00, status: 'success', customer: 'Global Traders Ltd', method: 'Credit Card' },
    { id: 'TX12352', date: '2025-04-02', amount: 920.75, status: 'success', customer: 'Robert Chen', method: 'Bank Transfer' },
    { id: 'TX12353', date: '2025-04-01', amount: 3750.00, status: 'success', customer: 'Digital Platforms Inc', method: 'ACH' },
    { id: 'TX12354', date: '2025-04-01', amount: 250.00, status: 'failed', customer: 'Patricia Lopez', method: 'Credit Card' },
    { id: 'TX12355', date: '2025-03-31', amount: 1275.50, status: 'success', customer: 'Emily Davis', method: 'Bank Transfer' },
    { id: 'TX12356', date: '2025-03-31', amount: 4500.00, status: 'success', customer: 'Innovative Startups Co', method: 'Wire Transfer' },
    { id: 'TX12357', date: '2025-03-30', amount: 899.99, status: 'pending', customer: 'Thomas Wilson', method: 'PayPal' },
    { id: 'TX12358', date: '2025-03-30', amount: 650.25, status: 'success', customer: 'Jessica Martinez', method: 'Credit Card' },
    { id: 'TX12359', date: '2025-03-29', amount: 2250.00, status: 'success', customer: 'David Lee', method: 'Bank Transfer' },
    { id: 'TX12360', date: '2025-03-29', amount: 399.99, status: 'failed', customer: 'Sandra Miller', method: 'Credit Card' },
    { id: 'TX12361', date: '2025-03-28', amount: 1750.00, status: 'success', customer: 'Tech Solutions Group', method: 'ACH' },
]);

const activeTab = ref('ongoing');

// Mock business data - in a real app, this might come from props or API
const businessData = {
    name: "Acme Corporation",
    balance: 24850.75,
    logo: "https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png", // Replace with your actual logo path
    handle: "@quantum_solutions",
    description: "Innovative payment solutions for modern businesses",
    analytics: {
        totalAmount: 258750.45,
        successfulTransactions: 1247,
        failedTransactions: 36,
        pendingTransactions: 12,
        conversionRate: 97.2
    }
};

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

// Filter and paginate transactions
const filteredTransactions = computed(() => {
    return transactionsData.value.filter(tx => {
        const query = searchQuery.value.toLowerCase();
        return tx.id.toLowerCase().includes(query) ||
            tx.customer.toLowerCase().includes(query) ||
            tx.status.toLowerCase().includes(query) ||
            tx.method.toLowerCase().includes(query);
    });
});

const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredTransactions.value.length / itemsPerPage.value);
});

// Navigation methods
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToPage = (page) => {
    currentPage.value = page;
};

// Status color helpers
const getStatusColor = (status) => {
    if (status === 'success') return 'bg-green-100 text-green-800';
    if (status === 'failed') return 'bg-red-100 text-red-800';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
};

onMounted(() => {
    store.dispatch('business', 'readSubscribe')
})
</script>

<template>
    <HeaderNav />

    <div v-if="userBusiness" class="min-h-screen bg-gray-100 dark:bg-gray-900 pt-2 ">
        <!-- Main container with responsive width -->
        <div class="w-full flex flex-col gap-4 max-w-7xl mx-auto dark:bg-gray-800 overflow-hidden px-4 md:px-6 pb-8">
            <!-- Business Profile Card -->
            <div class="shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden p-6">
                <!-- Business Info Section - Logo, Name and Balance -->
                <div class="flex flex-col items-center mb-8">
                    <!-- Business Logo -->
                    <div class="mb-4">
                        <img class="h-24 w-24 rounded-full border-4 border-white dark:border-gray-700 object-cover shadow-md"
                            :src="businessData.logo" alt="Business Logo" />
                    </div>

                    <!-- Business Name -->
                    <h2 class="text-gray-800 dark:text-white text-xl font-bold mb-2">
                        {{ userBusiness?.name }}
                    </h2>

                    <!-- Account Balance -->
                    <div class="flex items-center gap-2">

                        <div class="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                            <span class="text-gray-800 dark:text-white font-semibold">
                                ₦{{ formatAmount(userBusiness?.balance) }}
                            </span>
                        </div>

                        <router-link to="/business/users"
                            v-if="userBusiness?.category == 'dispatch'"
                            class="flex items-center justify-center gap-2 px-4 py-2.5 border hover:text-white border-gray-300 hover:bg-green-700 rounded-lg transition-colors text-sm font-medium">

                            manage users
                        </router-link>
                    </div>
                </div>

                <!-- Tabs Section -->
                <div class="w-full">
                    <!-- Tab Headers -->
                    <div class="flex border-b border-gray-200 dark:border-gray-700">
                        <button @click="activeTab = 'ongoing'" :class="[
                            'px-4 py-2 font-medium text-sm',
                            activeTab === 'ongoing'
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        ]">
                            Ongoing
                        </button>
                        <button @click="activeTab = 'completed'" :class="[
                            'px-4 py-2 font-medium text-sm',
                            activeTab === 'completed'
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        ]">
                            Completed
                        </button>
                        <button @click="activeTab = 'dispute'" :class="[
                            'px-4 py-2 font-medium text-sm',
                            activeTab === 'dispute'
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        ]">
                            Dispute
                        </button>
                    </div>

                    <!-- Tab Content -->
                    <div class="py-4">
                        <div v-if="activeTab === 'ongoing'" class="text-gray-600 dark:text-gray-300">
                            <!-- Ongoing tab content would go here -->
                            <p class="text-center text-sm">Ongoing transactions will appear here</p>
                        </div>
                        <div v-else-if="activeTab === 'completed'" class="text-gray-600 dark:text-gray-300">
                            <!-- Completed tab content would go here -->
                            <p class="text-center text-sm">Completed transactions will appear here</p>
                        </div>
                        <div v-else-if="activeTab === 'dispute'" class="text-gray-600 dark:text-gray-300">
                            <!-- Dispute tab content would go here -->
                            <p class="text-center text-sm">Disputes will appear here</p>
                        </div>
                    </div>
                </div>
            </div>

            <Dispatch  v-if="userBusiness?.category == 'seller'" />

            <!-- Tab Navigation -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">


                <!-- Tab Content -->
                <div class="p-4">
                    <!-- Dashboard Tab Content -->
                    <div v-if="profileTab === 'dashboard'" class="w-full">
                        <!-- Analytics Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <!-- Total Amount Card -->
                            <div
                                class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount Received</p>
                                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            ₦{{ businessData.analytics.totalAmount.toLocaleString() }}
                                        </h3>
                                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">+12.5% from last
                                            month</p>
                                    </div>
                                    <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="w-6 h-6 text-blue-600 dark:text-blue-300">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Successful Transactions -->
                            <div
                                class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Successful
                                            Transactions</p>
                                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {{ userBusiness?.success_transation_rate_count }}
                                        </h3>
                                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">+8.3% from last month
                                        </p>
                                    </div>
                                    <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="w-6 h-6 text-green-600 dark:text-green-300">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Failed Transactions -->
                            <div
                                class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Failed
                                            Transactions</p>
                                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {{ userBusiness?.failed_transaction_rate_count }}
                                        </h3>
                                        <p class="text-sm text-red-600 dark:text-red-400 mt-2">-2.1% from last month</p>
                                    </div>
                                    <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="w-6 h-6 text-red-600 dark:text-red-300">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Conversion Rate -->
                            <div
                                class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate
                                        </p>
                                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {{ businessData.analytics.conversionRate }}%
                                        </h3>
                                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">+0.4% from last month
                                        </p>
                                    </div>
                                    <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor"
                                            class="w-6 h-6 text-purple-600 dark:text-purple-300">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Charts Section -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                            <!-- Monthly Transactions Chart -->
                            <div
                                class="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Monthly Transactions
                                </h3>
                                <div class="w-full h-64">
                                    <!-- Chart placeholder -->
                                    <div
                                        class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <div class="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor"
                                                class="w-12 h-12 mx-auto mb-2 opacity-50">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                            </svg>
                                            <p>Transaction trend would appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods Chart -->
                            <div
                                class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Methods</h3>
                                <div class="w-full h-64">
                                    <!-- Chart placeholder -->
                                    <div
                                        class="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                        <div class="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor"
                                                class="w-12 h-12 mx-auto mb-2 opacity-50">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                            </svg>
                                            <p>Payment distribution would appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Transactions -->
                        <!-- <div
                            class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
                                <router-link to="/transactions"
                                    class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    View All
                                </router-link>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style></style>