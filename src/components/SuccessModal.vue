<script setup>
import { ref } from 'vue';
import HeaderNav from './HeaderNav.vue';

</script>

<template>
    <HeaderNav />
    <div class=" bg-white bg-opacity-50 flex items-start justify-center z-50 lg:p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div class="flex justify-center w-full">
                <img src="../assets/images/success.png" class="w-38" />
            </div>
            <!-- Header -->
            <div class="px-6 pt-5 relative">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900">{{ orderName || 'Ndubuisi' }}</h2>
                    <p class="text-gray-600 text-sm mt-1">Your Payment was completed. A dispatch again will
                        contact you shortly</p>
                </div>

                <!-- <button 
        @click="handleClose" 
        class="absolute top-4 right-4 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-200"
    >
        &times;
    </button>
        -->
            </div>

            <!-- Content -->
            <div class="p-6 relative">
                <!-- Close button -->

                <h3 class="text-xl font-semibold text-gray-900">Meet your rider and say "{{ pin || '6690' }}"</h3>
                <p class="text-gray-600 text-sm mt-1 mb-6">Here's how it works</p>

                <!-- Steps -->
                <div class="flex flex-col space-y-2 mb-6">
                    <!-- Step 1 -->
                    <div class="flex items-center bg-gray-50 rounded-xl p-4">
                        <div
                            class="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center mr-4 flex-shrink-0">
                            1
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-gray-800">Rider arrives at your location</span>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="flex items-center bg-gray-50 rounded-xl p-4">
                        <div
                            class="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center mr-4 flex-shrink-0">
                            2
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-gray-800">Meet your rider and say your PIN</span>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="flex items-center bg-gray-50 rounded-xl p-4">
                        <div
                            class="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center mr-4 flex-shrink-0">
                            3
                        </div>
                        <div class="flex justify-between items-center w-full">
                            <span class="text-gray-800">Rider confirms your delivery</span>
                        </div>
                    </div>

                </div>

                <!-- Security Note -->
                <div
                    class="mt-6 flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div class="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 dark:text-blue-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Bank Account Security</h3>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Your bank account details are securely encrypted and protected. We comply with
                            financial industry standards to ensure your data remains safe.
                        </p>
                    </div>
                </div>

                <!-- Button -->
                <!-- <button 
        @click="handleConfirm" 
        class="w-full py-4 bg-green-800 hover:bg-green-900 text-white font-medium rounded-lg transition-colors"
    >
        I Understand
    </button> -->
            </div>
        </div>
    </div>
       
</template>