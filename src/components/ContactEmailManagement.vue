<script setup>
import { ref } from 'vue'

// Email state management
const disputeEmails = ref(['emmaaustin509@gmail.com', 'ndubisjnr@gmail.com'])
const supportEmail = ref('ndubisjnr@gmail.com')
const generalEmail = ref('ndubisjnr@gmail.com')
const newDisputeEmail = ref('')

// Add a new dispute email
const addDisputeEmail = () => {
  if (newDisputeEmail.value && !disputeEmails.value.includes(newDisputeEmail.value)) {
    disputeEmails.value.push(newDisputeEmail.value)
    newDisputeEmail.value = ''
  }
}

// Handle enter key press in the input field
const handleEnterKey = (e) => {
  if (e.key === 'Enter' && newDisputeEmail.value) {
    addDisputeEmail()
  }
}

// Remove dispute email
const removeDisputeEmail = (email) => {
  disputeEmails.value = disputeEmails.value.filter(e => e !== email)
}

// Save all changes
const saveChanges = () => {
  console.log('Saving email preferences...')
  // API call would go here
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-md font-medium text-gray-700 text-center mb-6">Contact</h1>
    
    <p class="text-center text-gray-600 mb-12 text-xs max-w-md mx-auto">
      As soon as a dispute (chargeback or fraud claim) is raised for a transaction
      or more support is required from your team, Paystack will notify you via
      email in the email addresses that you specify below.
    </p>
    
    <!-- Dispute emails section -->
    <div class="mb-4">
      <label class="block text-xs font-medium text-gray-700 mb-4">Dispute emails</label>
      
      <div class="border rounded-lg p-2 flex flex-wrap items-center gap-2">
        <!-- Existing email pills -->
        <div v-for="email in disputeEmails" :key="email" 
             class="flex items-center bg-gray-100 text-gray-800 text-xs  rounded-md px-2 py-1">
          <span>{{ email }}</span>
          <button @click="removeDisputeEmail(email)" class="ml-2 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Input for new emails -->
        <input 
          type="email" 
          v-model="newDisputeEmail"
          placeholder="Add more emails"
          @keyup="handleEnterKey"
          @blur="addDisputeEmail"
          class="flex-grow min-w-[200px] p-2 text-xs focus:outline-none" 
        />
      </div>
    </div>
    
    <!-- Support email section -->
    <div class="mb-4">
      <label class="block text-xsfont-medium text-gray-700 mb-4 text-xs">Support email</label>
      <input 
        type="email" 
        v-model="supportEmail"
        class="w-full px-4 py-3 border border-gray-300 text-xs rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      />
    </div>
    
    <!-- General email section -->
    <div class="mb-12">
      <label class="block text-xsfont-medium text-gray-700 mb-4 text-xs">General email</label>
      <input 
        type="email" 
        v-model="generalEmail"
        class="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      />
    </div>
    
    <!-- Save changes button -->
    <div class="flex justify-end">
      <button 
        @click="saveChanges"
        class="px-6 py-3 bg-gray-100 text-xs text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Save changes
      </button>
    </div>
  </div>
</template>