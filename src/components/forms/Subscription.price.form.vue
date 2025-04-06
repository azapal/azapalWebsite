<script setup>
import HeaderNav from '../HeaderNav.vue';
import Button from '../ui/button.vue';

</script>
<template>

    <HeaderNav />

    <form class="p-3">
        <label for="Price per month"
                class="block mb-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Price per month </span>

                <input type="email" id="Username" placeholder="$ Free"
                    class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />

                    <span class="text-xs text-gray-400">Minimum 5000 Naira or free</span>
            </label>


            <div class="mt-3">
                <p class="text-xs">You must <router-link to="/identity-verification" class="text-blue-500">Add a Bank Information</router-link> before you can set your price ot accept tips</p>
                <div class="flex gap-3 mt-3 items-center justify-end w-full">
                    <Button variant="outline" v-slot:child>Cancle</Button>

                    <Button  variant="outline" v-slot:child>Save</Button>
                </div>


            </div>
    </form>

</template>
<style scoped></style>