<script setup>
import { ref, onMounted } from 'vue';
import HeaderNav from '../components/HeaderNav.vue';
import BottomTabNavigation from './BottomTab.vue';
import StoreUtils from '../utils/storeUtils';

const store = StoreUtils;
const userBusiness = store.get('business', 'getBusiness');
const loading = ref(true);

onMounted(async () => {
    if (userBusiness !== 'null') {
        await store.dispatch('business', 'readSubscribe');
        // await store.dispatch('business', 'readUserTransactions');
    }
    loading.value = false;
});
</script>

<template>
    <HeaderNav />

    <div class="w-full">

        <div v-if="loading" class="flex justify-center items-center h-[40vh]">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

    

        <BottomTabNavigation v-else />
    </div>
</template>