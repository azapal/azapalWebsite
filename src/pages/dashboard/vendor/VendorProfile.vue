<script setup>
import { ref, onMounted } from 'vue';
import HeaderNav from '../../../components/HeaderNav.vue';
import BottomTabNavigation from '../../../components/BottomTab.vue';
import StoreUtils from '../../../utils/storeUtils.js';
import {BarChart3, Home, TruckIcon} from "lucide-vue-next";
import Analytics from "../../../components/AnalyticsComponent.vue";
import DispatchServices from "../../../components/DispatchServices.vue";
import BusinessDashboard from "../../../components/BusinessDashboard.vue";

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const loading = store.get('business', 'getLoading');
// Active tab state
const activeTab = ref('dashboard');

// Toggle active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};


onMounted( () => {
    // if (userBusiness !== 'null') {
    //      store.dispatch('business', 'readSubscribe');
    //     // await store.dispatch('business', 'readUserTransactions');
    // }
});
</script>

<template>
    <div class="w-full">

        <div v-if="loading" class="flex justify-center items-center h-[40vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

      <div v-else class="min-h-screen flex bg-gray-100  relative">
        <!-- Main content area -->
<!--        <div class="lg:w-24 md:w-24 bg-white fixed lg:static md:static bottom-0 w-full justify-center shadow-lg border-t border-gray-200">-->
<!--          <div class="max-w-7xl mx-auto px-4">-->
<!--            <div class="flex items-center lg:flex-col md:flex-col lg:justify-start md:justify-start justify-center  lg:h-screen">-->
<!--              <button-->
<!--                  @click="setActiveTab('dashboard')"-->
<!--                  class="flex flex-col items-center py-3 px-6"-->
<!--                  :class="activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-500'"-->
<!--              >-->
<!--                <Home :size="24" />-->
<!--                <span class="mt-1 text-xs font-medium">Dashboard</span>-->
<!--              </button>-->

<!--              <button-->
<!--                  @click="setActiveTab('dispatch')"-->
<!--                  class="flex flex-col items-center py-3 px-6"-->
<!--                  :class="activeTab === 'dispatch' ? 'text-blue-600' : 'text-gray-500'"-->
<!--              >-->
<!--                <TruckIcon :size="24" />-->
<!--                <span class="mt-1 text-xs font-medium">Dispatch</span>-->
<!--              </button>-->

<!--              <button-->
<!--                  @click="setActiveTab('analytics')"-->
<!--                  class="flex flex-col items-center py-3 px-6"-->
<!--                  :class="activeTab === 'analytics' ? 'text-blue-600' : 'text-gray-500'"-->
<!--              >-->
<!--                <BarChart3 :size="24" />-->
<!--                <span class="mt-1 text-xs font-medium">Analytics</span>-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="w-full flex flex-col gap-4 overflow-hidden p-2 bg-white">-->
<!--          <div class="max-w-7xl flex mx-auto shadow-sm w-full h-[90%] bg-gray-100">-->
<!--            <div class="transactions w-[30%] bg-orange-600 h-full "></div>-->

<!--            <div class="relative w-[70%] bg-yellow-500 h-full">-->
<!--              <div class="profile-area relative bg-green-500 w-full h-[5%]"></div>-->
<!--              <div class="messages relative bg-red-500 w-full h-[85%]"></div>-->
<!--              <div class="input bg-cyan-600 w-full h-[10%]">-->

<!--                <div class="w-full flex items-center h-full">-->
<!--                  <textarea class="w-full" />-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->


<!--          </div>-->
<!--&lt;!&ndash;          &lt;!&ndash; Render the active component based on tab selection &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <BusinessDashboard v-if="activeTab === 'dashboard'" />&ndash;&gt;-->
<!--&lt;!&ndash;          <DispatchServices v-else-if="activeTab === 'dispatch'" />&ndash;&gt;-->
<!--&lt;!&ndash;          <Analytics v-else-if="activeTab === 'analytics'" />&ndash;&gt;-->
<!--        </div>-->

<!--        <div class="w-full h-screen flex flex-col bg-white">-->
<!--          &lt;!&ndash; Chat Header &ndash;&gt;-->
<!--          <div class="flex items-center justify-between bg-gray-100 shadow-sm px-4 py-2">-->
<!--            <div class="font-semibold text-lg">Transaction Chat</div>-->
<!--            <div class="flex gap-2">-->
<!--              <button class="text-blue-600">Call</button>-->
<!--              <button class="text-green-600">Voice Note</button>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Main Chat Body &ndash;&gt;-->
<!--          <div class="flex flex-1 overflow-hidden">-->
<!--            &lt;!&ndash; Transaction list (hidden on small screens) &ndash;&gt;-->
<!--            <div class="hidden md:block w-1/3 lg:w-1/4 bg-orange-600 overflow-y-auto">-->
<!--              &lt;!&ndash; Replace with transaction list items &ndash;&gt;-->
<!--              <div class="p-4 text-white">Transaction #1</div>-->
<!--              <div class="p-4 text-white">Transaction #2</div>-->
<!--              <div class="p-4 text-white">Transaction #3</div>-->
<!--            </div>-->

<!--            &lt;!&ndash; Chat Area &ndash;&gt;-->
<!--            <div class="flex flex-col w-full md:w-2/3 lg:w-3/4 bg-gray-50">-->
<!--              &lt;!&ndash; Profile/Transaction Info &ndash;&gt;-->
<!--              <div class="flex items-center bg-green-500 px-4 py-2 text-white">-->
<!--                <div class="font-medium">Transaction #12345</div>-->
<!--                <div class="ml-auto text-sm">Status: Pending</div>-->
<!--              </div>-->

<!--              &lt;!&ndash; Messages &ndash;&gt;-->
<!--              <div class="flex-1 overflow-y-auto p-4 space-y-2">-->
<!--                &lt;!&ndash; Example message bubbles &ndash;&gt;-->
<!--                <div class="bg-white rounded-lg p-2 shadow max-w-xs">Hi, transaction initiated!</div>-->
<!--                <div class="bg-blue-100 rounded-lg p-2 shadow max-w-xs ml-auto">Great, noted!</div>-->
<!--              </div>-->

<!--              &lt;!&ndash; Input & Actions &ndash;&gt;-->
<!--              <div class="bg-white border-t p-2">-->
<!--                <div class="flex items-center gap-2">-->
<!--          <textarea-->
<!--              class="flex-1 border rounded p-2 resize-none focus:outline-none focus:ring focus:border-blue-300"-->
<!--              rows="1"-->
<!--              placeholder="Type a message..."-->
<!--          ></textarea>-->
<!--                  <input type="file" class="hidden" id="fileUpload" multiple>-->
<!--                  <label for="fileUpload" class="cursor-pointer text-blue-600">📎</label>-->
<!--                  <button class="bg-blue-500 text-white px-3 py-1 rounded">Send</button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="w-full h-screen flex flex-col bg-gray-50">
          <!-- Chat Header -->
          <div class="flex items-center justify-between bg-white shadow px-4 py-3">
            <div class="font-semibold text-lg text-gray-700">Transaction Chat</div>
            <div class="flex gap-3">
              <button class="text-blue-500 hover:text-blue-700">📞 Call</button>
              <button class="text-green-500 hover:text-green-700">🎤 Voice Note</button>
            </div>
          </div>

          <!-- Main Body -->
          <div class="flex flex-1 overflow-hidden">
            <!-- Transaction List (hidden on mobile) -->
            <div class="hidden md:block w-1/4 bg-white border-r overflow-y-auto">
              <div class="p-3 border-b">
                <div class="font-medium text-gray-600">Transactions</div>
              </div>
              <!-- Example transactions -->
              <div class="hover:bg-gray-100 cursor-pointer p-3">
                <div class="text-sm font-medium text-gray-700">Transaction #12345</div>
                <div class="text-xs text-gray-500">Pending</div>
              </div>
              <div class="hover:bg-gray-100 cursor-pointer p-3">
                <div class="text-sm font-medium text-gray-700">Transaction #67890</div>
                <div class="text-xs text-gray-500">Completed</div>
              </div>
            </div>

            <!-- Chat Area -->
            <div class="flex flex-col w-full md:w-3/4">
              <!-- Chat Info -->
              <div class="flex items-center bg-white border-b px-4 py-2">
                <div class="font-medium text-gray-700">Transaction #12345</div>
                <div class="ml-auto text-xs text-gray-500">Status: Pending</div>
              </div>

              <!-- Messages -->
              <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                <!-- Example messages -->
                <div class="max-w-sm bg-white p-3 rounded-lg shadow-sm">
                  <div class="text-sm text-gray-700">Hi, transaction initiated!</div>
                </div>
                <div class="max-w-sm ml-auto bg-blue-100 p-3 rounded-lg shadow-sm">
                  <div class="text-sm text-gray-700">Great, noted!</div>
                </div>
                <!-- Continue mapping actual messages -->
              </div>

              <!-- Input Area -->
              <div class="bg-white border-t p-3">
                <div class="flex gap-2 items-center">
          <textarea
              rows="1"
              class="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Type your message..."
          ></textarea>

                  <input type="file" id="fileUpload" class="hidden" multiple>
                  <label for="fileUpload" class="cursor-pointer text-gray-500 hover:text-blue-500">📎</label>

                  <button class="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
</template>