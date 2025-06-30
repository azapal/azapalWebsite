<script setup>
import {ref, onMounted, computed} from 'vue';
import StoreUtils from '../../../../utils/storeUtils.js';
// import BottomTab from "../../../components/BottomTab.vue";
import {BarChart3, Home, TruckIcon, HandCoins, MessageSquareDotIcon, HelpCircle} from "lucide-vue-next";
import router from "../../../../router/index.js";
import {DispatchSubscribe, DispatchUnSubscribe} from "../../../../model/request/business/businessRequest.js";

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const logistics = store.get('business', 'getSubscribe');
const loading = store.get('business', 'getLoading');
const activeTab = ref('logistics');
const showSidebar = ref(false);
const selectedTransaction = ref('#12345');
const selectedCompany = ref(null);
const subscribedCompanyId = ref(null);
const hoveredRating = ref(0);
const subscribeLoading = ref(false);

const subscribeLogistics = computed(() => {
  return logistics.value.filter(it => it.isSubscribed)
})

onMounted(() => {
  if (userBusiness !== 'null') {
    store.dispatch('business', 'readSubscribe');
    store.dispatch('business', 'readUserTransactions');
  }
  activeTab.value = router?.currentRoute?.value?.hash?.replace('#','') || router.currentRoute?.value?.meta?.hash?.replace('#','');

});

const setActiveTab = (tab) => {
  activeTab.value = tab;
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const selectTransaction = (id) => {
  selectedTransaction.value = id;
  showSidebar.value = false; // Close sidebar on mobile after selection
};

// Company selection
function selectCompany(company) {
  selectedCompany.value = company;
}

// Company subscription functions
async function subscribe() {
  DispatchSubscribe.business_dispatch_id_no = selectedCompany.value.id
  DispatchSubscribe.business_id_no = userBusiness.value.business_id_no
  subscribeLoading.value = true;
  await store.dispatch('business', 'dispatchSubscribe', DispatchSubscribe)
  await store.dispatch('notification', 'readSystemNotificationById')
  subscribeLoading.value = false;
  // In a real app, you would update the store here
}

async function unsubscribe() {
  DispatchUnSubscribe.business_dispatch_id_no = selectedCompany.value.id
  DispatchUnSubscribe.business_id_no = userBusiness.value.business_id_no
  subscribeLoading.value = true;
  if (selectedCompany.value.isSubscribed) {
    subscribedCompanyId.value = null;
    await store.dispatch('business', 'dispatchUnSubscribe', DispatchUnSubscribe)
    await store.dispatch('notification', 'readSystemNotificationById')
    subscribeLoading.value = false;
    // In a real app, you would update the store here
  }
}

// Rating function
function rateCompany(company, rating) {
  company.userRating = rating;

  // Calculate new average rating (simplified)
  // In a real app, this would be handled by the backend
  const oldTotal = company.rating * 100; // Assuming we had 100 ratings
  const newTotal = oldTotal + rating;
  company.rating = parseFloat((newTotal / 101)?.toFixed(1));
}

// Like/Dislike functions
function likeCompany(company) {
  if (company.userLiked) {
    // Unlike
    company.likes--;
    company.userLiked = false;
  } else {
    // Like
    if (company.userDisliked) {
      // Remove dislike first if it exists
      company.dislikes--;
      company.userDisliked = false;
    }
    company.likes++;
    company.userLiked = true;
  }
}

function dislikeCompany(company) {
  if (company.userDisliked) {
    // Undislike
    company.dislikes--;
    company.userDisliked = false;
  } else {
    // Dislike
    if (company.userLiked) {
      // Remove like first if it exists
      company.likes--;
      company.userLiked = false;
    }
    company.dislikes++;
    company.userDisliked = true;
  }
}

// Branch subscription toggle
const toggleBranchSubscription = (branch) => {
  // Find if any branch in any company is already subscribed
  const alreadySubscribedBranch = findSubscribedBranch();

  // If trying to subscribe and another branch is already subscribed
  if (!branch.isSubscribed && alreadySubscribedBranch) {
    // Here you could implement a confirmation dialog or notification
    if (confirm(`You are already subscribed to ${getCompanyAndBranchName(alreadySubscribedBranch)}. Would you like to switch your subscription?`)) {
      // Unsubscribe from the current branch
      alreadySubscribedBranch.isSubscribed = false;
      // Subscribe to the new branch
      branch.isSubscribed = true;
    }
  } else {
    // Toggle subscription status
    branch.isSubscribed = !branch.isSubscribed;
  }
};

// Helper function to find any subscribed branch across all companies
const findSubscribedBranch = () => {
  for (const company of companies.value) {
    for (const branch of company.branches) {
      if (branch.isSubscribed) {
        return branch;
      }
    }
  }
  return null;
};

// Helper function to get company and branch name as a string
const getCompanyAndBranchName = (branch) => {
  for (const company of companies.value) {
    const foundBranch = company.branches.find(b => b.id === branch.id);
    if (foundBranch) {
      return `${company.name} - ${foundBranch.name}`;
    }
  }
  return "another branch";
};

// Utility function to check if a company is subscribed
const isCompanySubscribed = (companyId) => {
  return subscribedCompanyId.value === companyId;

};
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Content -->
    <div v-else class="flex flex-col md:flex-row h-screen">
      <div class="lg:w-24 md:w-24 bg-white fixed lg:static md:static bottom-0 w-full justify-center shadow-lg border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center lg:flex-col md:flex-col lg:justify-start md:justify-start justify-center  lg:h-screen">


            <router-link
                @click="setActiveTab('logistics')"
                class="flex flex-col items-center py-3 px-6"
                :class="activeTab === 'logistics' ? 'text-blue-600' : 'text-gray-500'"
                to="#logistics"
            >
              <TruckIcon :size="18" />
              <span class="mt-1 text-[12px] font-medium">Logistics</span>
            </router-link>

            <router-link
                @click="setActiveTab('payments')"
                class="flex flex-col items-center py-3 px-6"
                :class="activeTab === 'payments' ? 'text-blue-600' : 'text-gray-500'"
                to="#payments"
            >
              <HandCoins :size="18" />
              <span class="mt-1 text-[12px] font-medium">Payments</span>
            </router-link>

            <router-link
                @click="setActiveTab('analytics')"
                class="flex flex-col items-center py-3 px-6"
                :class="activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-500'"
                to="#analytics"

            >
              <BarChart3 :size="18" />
              <span class="mt-1 text-[12px] font-medium">Analytics</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Header -->
      <div class="md:hidden bg-white px-4 py-3 flex items-center justify-between">
        <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-gray-700">{{ selectedTransaction }}</span>
          <span class="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">Pending</span>
        </div>
      </div>

      <!-- Sidebar/Transaction List -->
      <div class="relative">
        <!-- Mobile Backdrop -->
        <div
            v-if="showSidebar"
            @click="toggleSidebar"
            class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>

        <!-- Sidebar -->
        <div
            :class="[
            'fixed md:relative z-50 md:z-auto',
            'w-80 md:w-80 lg:w-96 h-full bg-white',
            'transform transition-transform duration-300 ease-in-out',
            'md:transform-none',
            showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          ]"
        >
          <!-- Business Header -->
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="relative">
                <img :src="`http://127.0.0.1:9000${userBusiness?.business_logo}`" alt="Business Logo"
                     class="w-12 h-12 rounded-full object-cover shadow-md" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-base font-semibold text-gray-800 truncate">{{userBusiness?.name}}</div>
                <div class="text-sm font-medium text-green-600 mb-1">₦{{ userBusiness?.balance }}</div>
                <div class="flex gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">

                    {{ userBusiness?.followers }} Followers
                  </span>
                  <span class="flex items-center gap-1">

                   {{userBusiness?.following }} Following
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>

            <div v-if="activeTab==='payments'">
              <!-- Transactions Header -->
              <div class="px-4 py-3 bg-gray-50">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-gray-700">Recent Transactions</h3>
                  <span class="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">24</span>
                </div>
              </div>

              <!-- Transaction List -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-2 space-y-1">
                  <div
                      @click="selectTransaction('#12345')"
                      :class="[
                    'p-3 rounded-lg cursor-pointer transition-all duration-200',
                    selectedTransaction === '#12345'
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50 hover:shadow-md'
                  ]"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-semibold text-gray-800">#12345</div>
                      <span class="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
                      Pending
                    </span>
                    </div>
                    <div class="text-xs text-gray-500 mb-1">Product Purchase • ₦2,500</div>
                    <div class="text-xs text-gray-400">Updated 2 minutes ago</div>
                  </div>

                  <div
                      @click="selectTransaction('#67890')"
                      :class="[
                    'p-3 rounded-lg cursor-pointer transition-all duration-200',
                    selectedTransaction === '#67890'
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50 hover:shadow-md'
                  ]"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-semibold text-gray-800">#67890</div>
                      <span class="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      Completed
                    </span>
                    </div>
                    <div class="text-xs text-gray-500 mb-1">Service Payment • ₦1,200</div>
                    <div class="text-xs text-gray-400">Yesterday at 3:24 PM</div>
                  </div>

                  <div
                      @click="selectTransaction('#11223')"
                      :class="[
                    'p-3 rounded-lg cursor-pointer transition-all duration-200',
                    selectedTransaction === '#11223'
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-50 hover:shadow-md'
                  ]"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-sm font-semibold text-gray-800">#11223</div>
                      <span class="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                      Failed
                    </span>
                    </div>
                    <div class="text-xs text-gray-500 mb-1">Refund Request • ₦850</div>
                    <div class="text-xs text-gray-400">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeTab==='logistics'">
              <!-- Transactions Header -->
              <div class="px-4 py-3 bg-gray-50">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-gray-700">Active Logistics Partners</h3>
                </div>
              </div>


              <!-- Transaction List -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-2 space-y-1">
                  <div
                      v-for="(i, index) in subscribeLogistics"
                      :key="index"
                      :class="['flex flex-row items-center gap-2 justify-between p-3 rounded-lg transition-all duration-200']"
                  >
                    <div class="flex flex-row items-center gap-2">
                      <div class="relative">
                        <img :src="`http://127.0.0.1:9000${i?.business_logo}`" alt="Business Logo"
                             class="w-12 h-12 rounded-full object-cover shadow-md" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-base font-semibold text-gray-800 truncate">{{i?.name}}</div>
                      </div>
                    </div>
                    <button  @click="selectCompany(i)" class="flex items-center justify-center h-8 w-8  cursor-pointer text-xs rounded-full  text-black font-medium">
                      <HelpCircle />
                    </button>

                  </div>
                </div>
              </div>


              <div class="px-4 py-3 bg-gray-50">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-semibold text-gray-700">Explore Logistics</h3>
                  <span class="text-xs text-gray-500  px-2 py-1 rounded-full">See All</span>
                </div>
              </div>
              <!-- Transaction List -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-2 space-y-1">
                  <div
                      v-for="(i, index) in logistics"
                      :key="index"
                      :class="['flex flex-row items-center gap-2 justify-between p-3 rounded-lg transition-all duration-200']"
                  >
                    <div class="flex flex-row items-center gap-2">
                      <div class="relative">
                        <img :src="`http://127.0.0.1:9000${i?.business_logo}`" alt="Business Logo"
                             class="w-12 h-12 rounded-full object-cover shadow-md" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-base font-semibold text-gray-800 truncate">{{i?.name}}</div>
                      </div>
                    </div>
                    <button  @click="selectCompany(i)" class="inline-block px-2 py-1 cursor-pointer text-xs rounded-full bg-[#2563EB] hover:bg-[#F97316] text-white font-medium">
                      Details
                    </button>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <slot name="chat-area"></slot>

    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Auto-resize textarea */
textarea {
  field-sizing: content;
}
</style>