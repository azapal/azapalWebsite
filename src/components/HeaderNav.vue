<script setup>
import { ArrowLeft } from 'lucide-vue-next';
import router from '../router';

let currentRoute;

currentRoute = router?.currentRoute?.value?.name

</script>
<template>
    <div class="w-full sticky top-0 z-[40] shadow mb-3">

        <!--light mode - text and icons-->
        <div class="p-2 text-gray-900 bg-white flex justify-between items-center font-medium capitalize">
            <div class="px-2 py-2 mr-2 flex items-center gap-3">
                <ArrowLeft class="cursor-pointer"  @click="router.go(-1)"/>
                <span class="font-bold"> {{currentRoute}}</span>
            </div>

            <div>
                <slot name="others"></slot>
            </div>
        </div>
    </div>
</template>
<style></style>