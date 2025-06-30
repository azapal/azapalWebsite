<script setup>
import {ref, onMounted, computed} from 'vue';
import StoreUtils from '../../../utils/storeUtils.js';
import BottomTab from "../../../components/BottomTab.vue";
import {BarChart3, Home, TruckIcon, HandCoins, MessageSquareDotIcon, HelpCircle} from "lucide-vue-next";
import router from "../../../router/index.js";
import {DispatchSubscribe, DispatchUnSubscribe} from "../../../model/request/business/businessRequest.js";
import Layout from "../../dashboard/vendor/layout/Layout.vue"

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

      <!-- Chat Area -->
      <div class="flex flex-col flex-1 min-w-0">

        <div v-if="activeTab==='payments'" class="h-[100%]">
        <!-- Desktop Header -->
        <div class="hidden md:flex items-center justify-between bg-white px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="text-lg font-semibold text-gray-800">Transaction {{ selectedTransaction }}</div>
            <span class="inline-block px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
              Pending
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"></path>
              </svg>
            </button>
          </div>
        </div>


        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 h-[80%]">
          <!-- Message 1 -->
          <div class="flex items-start gap-3">
            <img src="https://via.placeholder.com/32" class="w-8 h-8 rounded-full flex-shrink-0" />
            <div class="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
              <div class="bg-white rounded-2xl rounded-tl-md p-3">
                <p class="text-sm text-gray-700">Hi, I just initiated the transaction! Can you confirm the details?</p>
              </div>
              <div class="text-xs text-gray-500 mt-1 ml-3">2:34 PM</div>
            </div>
          </div>

          <!-- Message 2 -->
          <div class="flex items-start gap-3 justify-end">
            <div class="flex-1 max-w-xs sm:max-w-md lg:max-w-lg flex flex-col items-end">
              <div class="bg-blue-500 text-white rounded-2xl rounded-tr-md p-3">
                <p class="text-sm">Great! I've received your payment and updated the status. Everything looks good on my end.</p>
              </div>
              <div class="text-xs text-gray-500 mt-1 mr-3">2:35 PM</div>
            </div>
            <img src="https://via.placeholder.com/32" class="w-8 h-8 rounded-full flex-shrink-0" />
          </div>

          <!-- Image Message -->
          <div class="flex items-start gap-3 justify-end">
            <div class="flex-1 max-w-xs sm:max-w-md lg:max-w-lg flex flex-col items-end">
              <div class="bg-blue-500 rounded-2xl rounded-tr-md p-2">
                <img src="https://via.placeholder.com/200x150" class="rounded-lg max-w-full h-auto" />
              </div>
              <div class="text-xs text-gray-500 mt-1 mr-3">2:36 PM</div>
            </div>
            <img src="https://via.placeholder.com/32" class="w-8 h-8 rounded-full flex-shrink-0" />
          </div>

          <!-- System Message -->
          <div class="flex justify-center">
            <div class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
              Transaction status updated to "Pending"
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="bg-white shadow-sm p-4">
          <div class="flex items-end gap-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 shadow-sm focus-within:shadow-md focus-within:ring-1 focus-within:ring-blue-300 transition-all">
                <textarea
                    rows="1"
                    class="flex-1 bg-transparent resize-none focus:outline-none text-sm placeholder-gray-500 max-h-32"
                    placeholder="Type your message..."
                    style="min-height: 20px;"
                ></textarea>

                <input type="file" id="fileUpload" class="hidden" multiple accept="image/*,document/*">
                <label for="fileUpload" class="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors p-1">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </label>
              </div>
            </div>

            <button class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors shadow-md">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
        </div>

        <div v-if="activeTab==='logistics'" class="h-[95%] transition-transform duration-300 w-full flex justify-center overflow-auto">
          <div v-if="selectedCompany" class="p-6  w-[100%] lg:w-[40%] "   :class="{ 'translate-x-0': selectedCompany, 'translate-x-full': !selectedCompany }">
            <div class="flex flex-col items-center mb-6 pt-4">
              <div class="mb-4">
                <img :src="`http://127.0.0.1:9000/${selectedCompany?.business_logo}`" :alt="selectedCompany?.name + ' logo'"
                     class="w-24 h-24 object-contain rounded-full bg-white  shadow-sm" />
              </div>
              <h3 class="text-xl font-semibold text-center">{{ selectedCompany?.name }}</h3>
              <p class="text-gray-500 italic text-center">"{{ selectedCompany?.motto }}"</p>

              <!-- Rating system with user interaction -->
              <div class="flex flex-col items-center mt-3">
                <p class="text-sm text-gray-600 mb-1">Rate this company:</p>
                <div class="flex">
                  <template v-for="i in 5" :key="i">
                    <svg
                        @click="rateCompany(selectedCompany, i)"
                        :class="[
                  i <= (hoveredRating || selectedCompany?.userRating || Math.floor(selectedCompany?.rating))
                    ? 'text-yellow-400'
                    : 'text-gray-300',
                  'cursor-pointer'
                ]"
                        @mouseover="hoveredRating = i"
                        @mouseleave="hoveredRating = 0"
                        class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </template>
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  <span>Community rating: {{ selectedCompany?.rating?.toFixed(1) }}</span>
                  <span v-if="selectedCompany?.userRating"> | Your rating: {{ selectedCompany?.userRating }}</span>
                </div>
              </div>

              <!-- Like/Dislike functionality -->
              <div class="flex items-center mt-4 space-x-4">
                <button
                    @click="likeCompany(selectedCompany)"
                    class="flex items-center px-3 py-1 rounded-full transition-colors"
                    :class="selectedCompany?.userLiked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                       :stroke="selectedCompany?.userLiked ? 'currentColor' : 'currentColor'" :stroke-width="selectedCompany?.userLiked ? 2 : 1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{{ selectedCompany?.likes || 0 }}</span>
                </button>
                <button
                    @click="dislikeCompany(selectedCompany)"
                    class="flex items-center px-3 py-1 rounded-full transition-colors"
                    :class="selectedCompany?.userDisliked ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                       :stroke="selectedCompany?.userDisliked ? 'currentColor' : 'currentColor'" :stroke-width="selectedCompany?.userDisliked ? 2 : 1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                  </svg>
                  <span>{{ selectedCompany?.dislikes || 0 }}</span>
                </button>
              </div>

              <p class="text-gray-600 text-center mt-3">{{ selectedCompany?.location }}</p>

              <!-- Subscription buttons -->
              <div class="mt-4 flex space-x-3">
                <button
                    v-if="!selectedCompany?.isSubscribed"
                    @click="subscribe()"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Subscribe to Company
                </button>
                <button
                    v-else
                    @click="unsubscribe()"
                    class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  Unsubscribe
                </button>
              </div>
            </div>

            <!-- Branches Section -->
            <div class="mb-6">
              <h4 class="text-lg font-medium mb-3 border-b pb-2">Branches</h4>
              <div v-for="branch in selectedCompany?.branches" :key="branch.id"
                   class="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div class="flex justify-between items-center mb-2">
                  <h5 class="font-medium">{{ branch.name }}</h5>
                  <button
                      @click="toggleBranchSubscription(branch)"
                      class="px-3 py-1 text-sm rounded-full font-medium transition-colors"
                      :class="branch.isSubscribed ?
                'bg-red-100 text-red-700 hover:bg-red-200' :
                'bg-blue-600 text-white hover:bg-blue-700'">
                    {{ branch?.isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
                  </button>
                </div>

                <div class="mb-2">
                  <span class="text-gray-700 text-sm font-medium">Manager:</span>
                  <span class="text-gray-700 text-sm ml-1">{{ branch?.manager }}</span>
                </div>

                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span class="text-gray-700 text-sm">{{ branch?.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Delivery Coverage Section -->
            <div class="mb-6">
              <h4 class="text-lg font-medium mb-3 border-b pb-2">Delivery Coverage</h4>
              <div class="flex flex-wrap gap-2 mt-2">
          <span v-for="(area, index) in selectedCompany?.deliveryAreas" :key="index"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {{ area }}
          </span>
              </div>
            </div>

            <!-- About Section -->
            <div class="mb-6">
              <h4 class="text-lg font-medium mb-2 border-b pb-2">About</h4>

              <v-html class="text-gray-700" v-html="selectedCompany?.about"></v-html>
            </div>

            <!-- Features Section -->
            <div class="mb-6">
              <h4 class="text-lg font-medium mb-2 border-b pb-2">Features</h4>
              <ul class="list-disc pl-5 text-gray-700">
                <li v-for="(feature, index) in selectedCompany?.features" :key="index" class="mb-2">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full h-full">
            <!-- Desktop Header -->
            <div class="hidden md:flex items-center justify-between bg-white px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="text-lg font-semibold text-gray-800">Spoonel Service Men</div>
              </div>
              <div class="flex items-center gap-2">
                <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </div>
            </div>


            <!-- Messages Area -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4 h-[80%]">
              <!-- System Message -->
              <div class="flex justify-center">
                <div class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                   Welcome to {{}} notification and response unit
                </div>
              </div>

              <!-- Message 1 -->
              <div class="flex items-start gap-3">
                <img src="https://via.placeholder.com/32" class="w-8 h-8 rounded-full flex-shrink-0" />
                <div class="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
                  <div class="bg-white rounded-2xl rounded-tl-md p-3">
                    <p class="text-sm text-gray-700">Hi there,</p>
                    <p class="text-sm text-gray-700">Thank you for relying on us. This page is dedicated to notifying you
                    on updates and promotions we offer and also, you can reach out to our customer representative if
                    need arises and we would response to you as quickly as possible.</p>

                    <div class="bg-white pt-4 space-y-4">
                      <div>
                        <p class="text-sm text-gray-500 font-medium">Branch:</p>
                        <p class="text-sm text-gray-900 font-semibold">Ajah Branch</p>
                      </div>

                      <div>
                        <p class="text-sm text-gray-500 font-medium">Manager:</p>
                        <ul class="  text-sm  text-gray-900 font-semibold space-y-1">
                          <li>Mr Azubuike Omenaala</li>
                          <li>Mrs Jane Doe</li>
                        </ul>
                      </div>

                      <div>
                        <p class="text-sm text-gray-500 font-medium">Email:</p>
                        <ul class="  text-sm  text-blue-600 font-semibold space-y-1">
                          <li>spoonelservicementajah@gmail.com</li>
                          <li>support@spoonel.com</li>
                        </ul>
                      </div>

                      <div>
                        <p class="text-sm text-gray-500 font-medium">Contact:</p>
                        <ul class="text-sm  text-gray-900 font-semibold space-y-1">
                          <li>+234 801 234 5678</li>
                          <li>+234 802 345 6789</li>
                        </ul>
                      </div>

                      <div class="flex gap-2 rounded-[8px] cursor-pointer hover:opacity-85 bg-[#F97316] items-center justify-center p-2">
                        <MessageSquareDotIcon class="w-5 h-5 text-white" />
                        <p class="text-white">Chat with a customer representative</p>
                      </div>
                    </div>


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