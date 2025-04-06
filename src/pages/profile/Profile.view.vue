<!-- <script setup>
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import SendMoney from '../../components/forms/SendMoney.vue'
import StoreUtils from '../../utils'

const store = StoreUtils

const profileTab = ref('send_money')
const userBusiness = store.get('business', 'getBusiness')

</script> -->
<!-- <template>

    <div class="w-full lg:w-1/2 absolute top-0 z-[40]">
      
    </div>
    <div class="h-screen bg-gray-200  dark:bg-gray-800 flex flex-wrap relative">
        <div
            class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 relative bg-white  shadow-lg transform   duration-200 easy-in-out">

            <div class="h-32 overflow-hidden relative">
                <div class="absolute w-full h-full bg-black/70"></div>

                <img class="w-full"
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt="" />
            </div>

            <div class="flex w-full">
                <div class="w-[300px]">
                    <div class="flex justify-center px-5 -mt-12">
                        <img class="h-32 w-32 bg-white p-2 rounded-full z-[40]"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="" />

                    </div>
                    <div class="">
                        <div class="text-center px-14">
                            <h2 class="text-gray-800 text-md font-bold">Mohit Dhiman</h2>
                            <a class="text-gray-400 mt-2 hover:text-blue-500"
                                href="https://www.instagram.com/immohitdhiman/" target="BLANK()">@immohitdhiman</a>

                        </div>
                      

                    </div>
                </div>

                <div class="w-full m-3 flex flex-col gap-3 items-start">
                    <router-link to="/edit-profile" type="button"
                        class="w-full flex items-center text-xs justify-center gap-2 border border-gray-300  py-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="cog" style="width: 18px;">
                            <path fill="#000000" d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path></svg>
                        EDIT PROFILE
                    </router-link>
                    <router-link v-if="!userBusiness" to="/create-business" type="button"
                        class="w-full p-1 flex items-center text-xs justify-center gap-2 bg-green-700 hover:bg-green-500 text-white border border-gray-300  py-2 rounded-full">
                        
                        CREATE BUSINESS 
                    </router-link>
                    
                </div>
            </div>
            <hr class="mt-6" />

            <div
                class="flex overflow-x-auto justify-around overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                <button @click="profileTab = 'send_money'" class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
                    Send Money
                </button>

                <button @click="profileTab = 'transaction'" class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                    Transactions
                </button>


            </div>
            <div class="w-full">
                <div v-if="profileTab==='send_money'" class="flex items-center w-full h-full broder border-red-500">
                    <SendMoney />
                </div>
                <div v-if="profileTab==='transaction'">
                </div>
            </div>
        </div>
    </div>
</template>
<style></style> -->

<script setup>
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';
import SendMoney from '../../components/forms/SendMoney.vue';

// Uncomment these when you're ready to use the store
// import StoreUtils from '../../utils'
// const store = StoreUtils
// const userBusiness = store.get('business', 'getBusiness')

const profileTab = ref('send_money');
</script>

<template>
    <div class="min-h-screen dark:bg-gray-900">
        <!-- Main container with responsive width -->
        <div class="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 overflow-hidden">
            <!-- Profile header with banner -->
            <div class="relative h-36 sm:h-48 md:h-56 overflow-hidden">
                <div class="absolute inset-0 bg-black/60"></div>
                <img class="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt="Profile Banner" />
                
                <!-- Back button - positioned at top left -->
                <!-- <button class="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <ArrowLeft size="20" class="text-white" />
                </button> -->
            </div>

            <!-- Profile content section -->
            <div class="flex flex-col md:flex-row w-full">
                <!-- Profile Info Column -->
                <div class="w-full md:w-64 flex flex-col items-center px-4">
                    <!-- Profile Image -->
                    <div class="flex justify-center -mt-16 mb-4 relative z-10">
                        <img class="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-md"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="Profile Picture" />
                    </div>
                    
                    <!-- Profile Name and Handle -->
                    <div class="text-center mb-6">
                        <h2 class="text-gray-800 dark:text-white text-xl font-bold">Mohit Dhiman</h2>
                        <a class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            href="https://www.instagram.com/immohitdhiman/" target="_blank">@immohitdhiman</a>
                    </div>
                </div>

                <!-- Actions Column -->
                <div class="w-full md:flex-1 px-4 md:px-6 py-2 md:py-4 flex flex-col gap-3">
                    <!-- Action Buttons -->
                    <router-link to="/edit-profile" 
                        class="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
                            <path fill="currentColor" d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"></path>
                        </svg>
                        Edit Profile
                    </router-link>
                    
                    <!-- Conditionally show Create Business button -->
                    <router-link v-if="true" to="/create-business" 
                        class="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create Business
                    </router-link>
                </div>
            </div>

            <!-- Tab Navigation -->
            <div class="px-4 mt-4">
                <div class="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
                    <button @click="profileTab = 'send_money'" 
                        :class="[
                            'inline-flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap focus:outline-none',
                            profileTab === 'send_money' 
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-gray-300'
                        ]">
                        Send Money
                    </button>

                    <button @click="profileTab = 'transaction'" 
                        :class="[
                            'inline-flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap focus:outline-none',
                            profileTab === 'transaction' 
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-gray-300'
                        ]">
                        Active Transactions
                    </button>
                </div>
            </div>

            <!-- Tab Content -->
            <div class="p-4">
                <div v-if="profileTab === 'send_money'" class="w-full">
                    <SendMoney />
                </div>
                <div v-if="profileTab === 'transaction'" class="w-full">
                    <!-- <Post /> -->
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        No transaction history available
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add any additional component-specific styles here */
</style>