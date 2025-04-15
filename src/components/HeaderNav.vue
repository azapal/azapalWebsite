<script setup lang="ts">
import { ArrowLeft, Settings, LogOut, ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';
import router from '../router';
import StoreUtils from '../utils/storeUtils';

// Get current route name
const currentRoute = router?.currentRoute?.value?.name;
const isDashboardRoute = currentRoute === 'Dashboard';
const store = StoreUtils;

const user = store.get('auth', 'getCurrentUser');
const dropdownOpen = ref(false);

const goBack = () => {
    router.go(-1);
};

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
    dropdownOpen.value = false;
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
    <div class="w-full sticky top-0 z-[20] shadow-sm">
        <div class="p-2 text-gray-900 bg-white flex justify-between items-center font-medium capitalize">
            <div class="px-2 py-2 mr-2 flex items-center gap-3">
                <!-- Show back arrow and route name only when not on dashboard -->
                <template v-if="!isDashboardRoute">
                    <ArrowLeft class="cursor-pointer" @click="goBack" />
                    <span class="font-bold">{{ currentRoute }}</span>
                </template>

                <!-- Always show company logo -->
                <div v-if="isDashboardRoute"
                    class="text-2xl h-8 font-bold bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">
                    Azapal
                </div>
            </div>

            <div class="flex items-center gap-2">
                <slot name="el"></slot>
                
                <!-- User dropdown menu -->
                <div class="relative">
                    <div 
                        @click="toggleDropdown" 
                        class="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-100"
                    >
                        <img 
                            class="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
                            :src="user?.avatar_url" 
                            alt="Profile Picture" 
                        />
                        <div class="hidden md:block">
                            <div class="text-sm font-medium">{{ user?.name || 'User' }}</div>
                            <div class="text-xs text-gray-500">{{ user?.email }}</div>
                        </div>
                        <ChevronDown class="h-4 w-4 text-gray-500" />
                    </div>
                    
                    <!-- Dropdown menu -->
                    <div 
                        v-if="dropdownOpen" 
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30"
                    >
                        <div class="px-4 py-2 border-b border-gray-100 md:hidden">
                            <div class="font-medium">{{ user?.name || 'User' }}</div>
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