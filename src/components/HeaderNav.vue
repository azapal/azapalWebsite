<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import router from '../router';
import StoreUtils from '../utils/storeUtils';

// Get current route name
const currentRoute = router?.currentRoute?.value?.name;
const isDashboardRoute = currentRoute === 'Dashboard';
const store = StoreUtils;

const user = store.get('auth', 'getCurrentUser');


const goBack = () => {
    router.go(-1);
};
</script>

<template>
    <div class="w-full sticky top-0 z-[40] shadow-sm">
        <div class="p-2 text-gray-900 bg-white flex justify-between items-center font-medium capitalize">
            <div class="px-2 py-2 mr-2 flex items-center gap-3">
                <!-- Show back arrow and route name only when not on dashboard -->
                <template v-if="!isDashboardRoute">
                    <ArrowLeft class="cursor-pointer" @click="goBack" />
                    <span class="font-bold">{{ currentRoute }}</span>
                </template>

                <!-- Always show company logo -->
                <div v-if="isDashboardRoute" src="/path-to-your-logo.png"
                    class="text-2xl h-8 font-bold  bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">

                    Azapal
                </div>

            </div>

            <div class="flex items-center gap-2">
                <slot name="el"></slot>
                <div>
                    <img class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
                        :src="user?.avatar_url" alt="Profile Picture" />
                </div>
            </div>
        </div>
    </div>
</template>