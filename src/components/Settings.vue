<script setup>
import { ref } from 'vue'
import HeaderNav from './HeaderNav.vue'
import ContactEmailManagement from './ContactEmailManagement.vue'
import ApiConfiguration from './ApiConfiguration.vue'
// Tabs state
const activeTab = ref('profile')
const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'contact', label: 'Contact' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'api', label: 'API Keys & Webhooks' }
]

// Switch tab function
const switchTab = (tabId) => {
  activeTab.value = tabId
}

// Personal Information
const firstName = ref('chibuike')
const lastName = ref('ukonu')
const email = ref('ndubisjnr@gmail.com')
const phoneNumber = ref('9049929256')
const isDeveloper = ref(true)

// Authentication
const twoFactorEnabled = ref(true)

// Methods
const saveChanges = () => {
  // Logic to save changes
  console.log('Saving changes...')
}

const changePassword = () => {
  // Logic to change password
  console.log('Changing password...')
}

const addPasskey = () => {
  // Logic to add passkey
  console.log('Adding passkey...')
}

const generateBackupCodes = () => {
  // Logic to generate backup codes
  console.log('Generating backup codes...')
}
</script>

<template>
  <HeaderNav />
  <div class="bg-white min-h-screen">
    <div class="max-w-4xl mx-auto py-8 px-4">
      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex gap-8">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="switchTab(tab.id)"
            class="py-4 px-1 relative text-xs"
            :class="[
              activeTab === tab.id 
                ? 'text-orange-500 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.label }}
            <div 
              v-if="activeTab === tab.id" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
            ></div>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'">
        <!-- Personal Information Section -->
        <div class="bg-white rounded-md shadow-sm p-6 mb-6">
          <h2 class="text-xs font-medium text-gray-700 mb-6">Personal Information</h2>

          <div class="mb-4">
            <label class="block text-xs font-medium text-gray-700 mb-2">Full Name</label>
            <div class="flex gap-4">
              <input 
                type="text" 
                v-model="firstName" 
                placeholder="First name"
                class="w-full px-3 py-2 border border-gray-300 text-xs rounded-md" 
              />
              <input 
                type="text" 
                v-model="lastName" 
                placeholder="Last name"
                class="w-full px-3 py-2 border border-gray-300 text-xs  rounded-md" 
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-xs font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              v-model="email" 
              class="w-full px-3 py-2 border border-gray-300 text-xs  rounded-md" 
            />
          </div>

          <div class="mb-4">
            <label class="block text-xs font-medium text-gray-700  mb-2">Phone Number</label>
            <div class="flex gap-2">
              <div class="relative">
                <select class="appearance-none px-3 text-xs  py-2 pr-8 border border-gray-300 rounded-md bg-white">
                  <option>+234</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path 
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
              <input 
                type="tel" 
                v-model="phoneNumber"
                class="w-full px-3 py-2 text-xs  border border-gray-300 rounded-md" 
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button 
              class="px-4 py-2 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-gray-200"
              @click="saveChanges"
            >
              Save Changes
            </button>
          </div>
        </div>

        <!-- Authentication Section -->
        <div class="bg-white rounded-md shadow-sm p-6">
          <h2 class="text-xs font-medium text-gray-700 mb-6">Authentication</h2>

          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label class="block text-xs font-medium text-gray-700">Password</label>
              <button 
                class="px-4 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                @click="changePassword"
              >
                Change Password
              </button>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <label class="block text-xs font-medium text-gray-700">Two-factor Auth</label>
                <button class="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </button>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-xs">Enabled</span>
                <div class="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                  <div class="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </div>

          <p class="text-xs text-gray-600 mb-4">
            You cannot disable two-factor authentication because you belong to a business that requires it.
          </p>

          <!-- <p class="text-xs text-gray-600">
            If you lose access to your authentication device, use any of your backup codes to login to your account.
            <button class="text-blue-500 hover:underline" @click="generateBackupCodes">
              Generate new backup codes.
            </button>
          </p> -->
        </div>
      </div>

      <!-- Contact Tab -->
      <div v-if="activeTab === 'contact'" class="bg-white rounded-md shadow-sm p-6">
        
        <ContactEmailManagement />
      </div>

      <!-- Compliance Tab -->
      <div v-if="activeTab === 'compliance'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-xs font-medium text-gray-700 mb-6">Compliance Settings</h2>
        <p class="text-gray-600">Compliance tab content goes here.</p>
      </div>

      <!-- Accounts Tab -->
      <div v-if="activeTab === 'accounts'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-xs font-medium text-gray-700 mb-6">Account Settings</h2>
        <p class="text-gray-600">Accounts tab content goes here.</p>
      </div>

      <!-- Preferences Tab -->
      <div v-if="activeTab === 'preferences'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-xs font-medium text-gray-700 mb-6">User Preferences</h2>
        <p class="text-gray-600">Preferences tab content goes here.</p>
      </div>

      <!-- Team Tab -->
      <div v-if="activeTab === 'team'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-xs font-medium text-gray-700 mb-6">Team Management</h2>
        <p class="text-gray-600">Team tab content goes here.</p>
      </div>

      <!-- API Keys & Webhooks Tab -->
      <div v-if="activeTab === 'api'" class="bg-white rounded-md p-6">
       <ApiConfiguration />
      </div>
    </div>
  </div>
</template>