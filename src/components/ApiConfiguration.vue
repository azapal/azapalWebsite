<script setup>
import { ref } from 'vue'

// State management for API configuration
const secretKey = ref('••••••••••••••••••••••••••••••••••••••••••••••')
const showSecretKey = ref(false)
const publicKey = ref('pk_live_98b418103db5f3181a6fd9bf4f460ca2f401710b')
const callbackURL = ref('https://number1fans.vercel.app/profile')
const webhookURL = ref('https://number1fans.vercel.app/profile')
const ipAddresses = ref([])
const newIPAddress = ref('')

// Toggle secret key visibility
const toggleSecretKeyVisibility = () => {
  showSecretKey.value = !showSecretKey.value
}

// Generate new secret key
const generateNewSecretKey = () => {
  // In a real app, this would call an API
  console.log('Generating new secret key...')
  // Mock a new secret key
  secretKey.value = '••••••••••••••••••••••••••••••••••••••••••••••'
  showSecretKey.value = false
}

// Copy to clipboard functionality
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied to clipboard')
    })
    .catch(err => {
      console.error('Failed to copy: ', err)
    })
}

// Add IP address to whitelist
const addIPAddress = () => {
  if (newIPAddress.value && !ipAddresses.value.includes(newIPAddress.value)) {
    ipAddresses.value.push(newIPAddress.value)
    newIPAddress.value = ''
  }
}

// Save changes
const saveChanges = () => {
  console.log('Saving API configuration...')
  // API call would go here
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-8 px-4 shadow-md rounded mb-4">
    <h1 class="text-xs font-medium text-gray-600 text-center mb-10">API Configuration - Live Mode</h1>
    
    <!-- Live Secret Key -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Live Secret Key</label>
      <div class="w-full md:w-3/4 relative">
        <input 
          :type="showSecretKey ? 'text' : 'password'" 
          :value="secretKey"
          readonly
          class="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12" 
        />
        <button 
          @click="toggleSecretKeyVisibility"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="showSecretKey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Generate new secret key button -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <div class="w-full md:w-1/4"></div>
      <div class="w-full md:w-3/4">
        <button 
          @click="generateNewSecretKey"
          class="flex items-center text-xs text-blue-600 hover:text-blue-800"
        >
          Generate new secret key
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Live Public Key -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Live Public Key</label>
      <div class="w-full md:w-3/4 relative">
        <input 
          type="text" 
          v-model="publicKey"
          readonly
          class="w-full px-4 py-3 border border-gray-300 text-xs rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12" 
        />
        <button 
          @click="copyToClipboard(publicKey)"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Live Callback URL -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <label class="w-full text-xs md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Live Callback URL</label>
      <div class="w-full md:w-3/4">
        <input 
          type="text" 
          v-model="callbackURL"
          class="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
    </div>
    
    <!-- Live Webhook URL -->
    <div class="mb-12 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Live Webhook URL</label>
      <div class="w-full md:w-3/4">
        <input 
          type="text" 
          v-model="webhookURL"
          class="w-full text-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
    </div>
    
    <!-- Save changes button -->
    <div class="flex justify-end">
      <button 
        @click="saveChanges"
        class="px-6 py-3 text-xs bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Save changes
      </button>
    </div>
  </div>

  <div class="max-w-4xl mx-auto py-8 px-4 rounded shadow-md">
    <h1 class="text-xs font-medium text-gray-600 text-center mb-10">API Configuration - Test Mode</h1>
    
    <!-- Live Secret Key -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Test Secret Key</label>
      <div class="w-full md:w-3/4 relative">
        <input 
          :type="showSecretKey ? 'text' : 'password'" 
          :value="secretKey"
          readonly
          class="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12" 
        />
        <button 
          @click="toggleSecretKeyVisibility"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="showSecretKey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Generate new secret key button -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <div class="w-full md:w-1/4"></div>
      <div class="w-full md:w-3/4">
        <button 
          @click="generateNewSecretKey"
          class="flex items-center text-xs text-blue-600 hover:text-blue-800"
        >
          Generate new secret key
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Live Public Key -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Test Public Key</label>
      <div class="w-full md:w-3/4 relative">
        <input 
          type="text" 
          v-model="publicKey"
          readonly
          class="w-full px-4 py-3 border border-gray-300 text-xs rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12" 
        />
        <button 
          @click="copyToClipboard(publicKey)"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Live Callback URL -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center">
      <label class="w-full text-xs md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Test Callback URL</label>
      <div class="w-full md:w-3/4">
        <input 
          type="text" 
          v-model="callbackURL"
          class="w-full px-4 py-3 border text-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
    </div>
    
    <!-- Live Webhook URL -->
    <div class="mb-12 flex flex-col md:flex-row md:items-center">
      <label class="w-full md:w-1/4 text-xs text-gray-700 mb-2 md:mb-0">Test Webhook URL</label>
      <div class="w-full md:w-3/4">
        <input 
          type="text" 
          v-model="webhookURL"
          class="w-full text-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
    </div>
    
    <!-- Save changes button -->
    <div class="flex justify-end">
      <button 
        @click="saveChanges"
        class="px-6 py-3 text-xs bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
      >
        Save changes
      </button>
    </div>
  </div>
</template>