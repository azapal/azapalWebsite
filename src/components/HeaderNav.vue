<script setup lang="ts">
import { Bell, Settings, LogOut, ChevronDown, LucideUserRoundCheck, HandCoins } from 'lucide-vue-next';
import { ref } from 'vue';
import router from '../router';
import StoreUtils from '../utils/storeUtils';

const store = StoreUtils;

const user = store.get('auth', 'getCurrentUser');
const dropdownOpen = ref(false);
const dropdownNotificationOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
    closeNotificationDropdown()
};

const closeDropdown = () => {
    dropdownOpen.value = false;
};

const toggleNotificationDropdown = () => {
    dropdownNotificationOpen.value = !dropdownNotificationOpen.value;
    closeDropdown()
};

const closeNotificationDropdown = () => {
    dropdownNotificationOpen.value = false;
};

const logout = () => {
    // Add your logout logic here
    // Example: store.dispatch('auth', 'logout');
    // Then redirect to login page
    localStorage.clear()
    location.reload()
};

const goToSettings = () => {
    router.push('/settings');
    closeDropdown();
};
</script>

<template>
    <div class="w-full sticky top-0 z-[20]">
        <div class="p-2 text-gray-900 bg-white flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f2f2f2] px-10 py-3">
            <div class="px-2 py-2 mr-2 flex items-center gap-3">
                <!-- Always show company logo -->
                <router-link to="/business/vendor"
                    class="text-2xl h-8 font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">
                    Aza-pal
                </router-link>
            </div>

            <div class="flex items-center  gap-2">
                <slot name="el"></slot>

              <div class="relative">

                <div @click="toggleNotificationDropdown" class="bg-[#f2f2f2] p-2 rounded-lg relative hover:scale-105 cursor-pointer">
                  <span class="text-xs absolute z-40 top-0 right-0 text-white bg-[#2563EB] rounded-full w-5 h-5 flex items-center justify-center">5</span>
                  <Bell />
                </div>
                <!-- Dropdown menu -->
                <div
                    v-if="dropdownNotificationOpen"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                >

                  <router-link
                      to="/settings"
                      @click="goToSettings"
                  >
                    <div class="flex relative text-xs items-center justify-start px-4 gap-1 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >

                      <LucideUserRoundCheck />
                   Account Notification
                      <span class="text-xs  z-40 top-0 right-4 text-white bg-[#EA580C] rounded-full w-4 h-4 flex items-center justify-center">2</span>

                    </div>
                  </router-link >

                  <router-link
                      to="/settings"
                      @click="goToSettings"
                  >
                  <div

                      class="flex relative items-center gap-1 px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                  >

                    <HandCoins />
                    Payment Notification
                    <span class="text-xs z-40 top-0 right-4 text-white bg-[#2563EB] rounded-full w-4 h-4 flex items-center justify-center">3</span>

                  </div>
                  </router-link>
                </div>
              </div>

              <!-- User dropdown menu -->
              <div class="relative">
                  <div
                      @click="toggleDropdown"
                      class="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-100"
                  >
                      <img
                          v-if="user.avatar_url"
                          class="h-10 w-10 rounded-full object-contain"
                          :src="user?.avatar_url"
                          alt="Profile Picture"
                      />
                     <img
                         v-else
                          class="h-10 w-10 rounded-full object-contain"
                          src="../assets/images/happydog.jpg"
                          alt="Profile Picture"
                      />
                      <div class="hidden md:block">
                          <div class="text-sm font-medium">{{ user?.first_name }}</div>
                          <div class="text-xs text-gray-500">{{ user?.email}}</div>
                      </div>
                      <ChevronDown class="h-4 w-4 text-gray-500" />
                  </div>

                  <!-- Dropdown menu -->
                  <div
                      v-if="dropdownOpen"
                      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                  >
                      <div class="px-4 py-2 border-b border-gray-100 md:hidden">
                          <div class="font-medium">{{ user?.first_name }}</div>
                          <div class="text-xs text-gray-500 truncate">{{ user?.email }}</div>
                      </div>

                      <router-link
                          to="/settings"
                          @click="goToSettings"
                          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                          <Settings class="mr-2 h-4 w-4" />
                          Settings
                      </router-link >

                      <a
                          @click="logout"
                          class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                      >
                          <LogOut class="mr-2 h-4 w-4" />
                          Logout
                      </a>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>