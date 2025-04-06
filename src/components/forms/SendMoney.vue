<script setup>
import Button from '../ui/button.vue';
import PaystackPop from '@paystack/inline-js'

const popup = new PaystackPop()
function resumePayment(){
    popup.resumeTransaction("access_code")

}

const initiatePaymentModel = {
    amount:0
}

</script>
<template>
    <form @submit.prevent="resumePayment" class="p-3">
        <label for="Price per month"
                class="block mb-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Business</span>

                <input type="tel" id="Username" :v-model="initiatePaymentModel.amount" placeholder="₦" required
                    class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />

                    <span class="text-xs text-gray-400">Use business username to send money</span>
            </label>


            <div class="mt-3">
                <p class="text-xs">You must <router-link to="/identity-verification" class="text-blue-500">Add a Bank Information</router-link> before you can send money</p>
                <div class="flex gap-3 mt-3 items-center justify-end w-full">

                    <Button type="submit" variant="outline" v-slot:child>Send Money</Button>
                </div>


            </div>
        </form>

</template>
<style scoped></style>