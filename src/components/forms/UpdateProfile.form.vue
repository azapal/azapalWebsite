<!-- <script setup>
import HeaderNav from '../../components/HeaderNav.vue';
import Button from '../ui/button.vue';
import { Camera, ArrowRightCircle } from 'lucide-vue-next';

</script>
<template>
    <div>
        <HeaderNav>
            <template v-slot:others>
                <Button class="w-[100px]" variant="outline" v-slot:child>Save</Button>
            </template>
        </HeaderNav>

        <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 relative">

            <div class="overflow-hidden relative">
                <div class="absolute w-full h-full bg-black/50 flex items-center justify-center">
                    <Camera color="white" class="hover:scale-105 cursor-pointer" />
                </div>

                <img class="w-full"
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt="" />
            </div>

            <div class="flex w-full">
                <div class="">
                    <div class="flex justify-center px-5 -mt-12 relative">
                        <div class="absolute h-32 w-32 bg-black/50 p-2 rounded-full bg-black/50 flex items-center justify-center">
                            <Camera color="white" class="hover:scale-105 cursor-pointer" />
                        </div>
                        <img class="h-32 w-32 bg-white p-2 rounded-full"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="" />

                    </div>
                </div>
            </div>


        </div>

        <form class="p-3">
        

            <label for="Username"
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Username </span>

                <input type="email" id="Username" placeholder="anthony@rhcp.com"
                    class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
            </label>

            <label for="Displayname"
                class="block overflow-hidden mb-5 rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Display name </span>

                <input type="email" id="Displayname" placeholder="anthony@rhcp.com"
                    class="mt-1 w-full  border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
            </label>

            <label for="Bio"
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Bio </span>

                <textarea type="email" id="Location" placeholder="anthony@rhcp.com"
                    class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" ></textarea>
            </label>

            <label for="Location"
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Location </span>

                <input type="email" id="Location" placeholder="anthony@rhcp.com"
                    class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
            </label>

            <label for="Website"
                class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Website </span>

                <input type="email" id="Location" placeholder="anthony@rhcp.com"
                    class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
            </label>
            <div class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <router-link to="/identity-verification" class="flex justify-between items-center p-3 cursor-pointer select-none">
                    <span class="text-grey-darkest text-md dark:text-white">
                        Add Bank
                    </span>
                    <ArrowRightCircle   class="dark:text-white"/>

                </router-link>
            </div>

        </form>
    </div>
</template>
<style></style>
 -->

<script setup>
import HeaderNav from '../../components/HeaderNav.vue';
import Button from '../ui/button.vue';
import { Camera, ArrowRightCircle } from 'lucide-vue-next';
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <HeaderNav>
            <template v-slot:others>
                <Button class="w-24 sm:w-28" variant="outline" v-slot:child>Save</Button>
            </template>
        </HeaderNav>

        <!-- Profile Banner and Image Container -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Banner Image Section -->
            <div class="relative">

                <div class="relative rounded-lg overflow-hidden shadow-md mb-16">
                    <!-- Banner Image Overlay -->
                    <div class="absolute w-full h-full bg-black/50 flex items-center justify-center">
                        <Camera color="white" size="32" class="hover:scale-110 transition-transform cursor-pointer" />
                    </div>

                    <!-- Banner Image -->
                    <img class="w-full h-48 sm:h-64 md:h-80 object-cover"
                        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        alt="Profile Banner" />

                    <!-- Profile Image Container -->

                </div>
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div class="relative">
                        <div class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Camera color="white" size="24"
                                class="hover:scale-110 transition-transform cursor-pointer" />
                        </div>
                        <img class="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white dark:border-gray-800"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            alt="Profile Picture" />
                    </div>
                </div>
            </div>

            <!-- Profile Form -->
            <form class="max-w-xl mx-auto px-4 sm:px-0 pb-12">
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    Profile Information
                </h2>

                <div class="space-y-5">
                    <!-- Username -->
                    <label
                        class="block overflow-hidden rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Username</span>
                        <input type="text" placeholder="username"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-none text-gray-700 sm:text-sm dark:text-white" />
                    </label>

                    <!-- Display Name -->
                    <label
                        class="block overflow-hidden rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Display Name</span>
                        <input type="text" placeholder="Your display name"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-none text-gray-700 sm:text-sm dark:text-white" />
                    </label>

                    <!-- Bio -->
                    <label
                        class="block overflow-hidden rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Bio</span>
                        <textarea placeholder="Tell us about yourself"
                            class="mt-1 w-full border-none bg-transparent p-0 h-24 focus:border-transparent focus:ring-0 focus:outline-none text-gray-700 sm:text-sm dark:text-white"></textarea>
                    </label>

                    <!-- Location -->
                    <label
                        class="block overflow-hidden rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Location</span>
                        <input type="text" placeholder="City, Country"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-none text-gray-700 sm:text-sm dark:text-white" />
                    </label>

                    <!-- Website -->
                    <label
                        class="block overflow-hidden rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Website</span>
                        <input type="url" placeholder="https://yourwebsite.com"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-none text-gray-700 sm:text-sm dark:text-white" />
                    </label>

                    <!-- Bank Information -->
                    <div
                        class="block overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <router-link to="/identity-verification"
                            class="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <span class="text-gray-700 font-medium dark:text-white">
                                Add Bank Account
                            </span>
                            <ArrowRightCircle size="20" class="text-blue-600 dark:text-blue-400" />
                        </router-link>
                    </div>

                
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>