<script setup>
import { ref, onMounted } from 'vue'
import HeaderNav from './HeaderNav.vue'
import ContactEmailManagement from './ContactEmailManagement.vue'
import ApiConfiguration from './ApiConfiguration.vue'
import StoreUtils from "../utils/storeUtils.js";
import {UpdateUserRequest} from "../model/request/auth/authenticationRequest.js";
import {CheckCheck, FileCogIcon, FileX} from "lucide-vue-next"
import {notify} from "../utils/toast.js";
const store = StoreUtils
const user = store.get('auth', 'getCurrentUser')
const userBank = store.get('business', 'getUserBank')
const cacRef = ref()
const tinRef = ref()
const files = ref()
const tinFile = ref()
const isDragging = ref(false)
const isUploading = ref(false)
const loading = ref(false)
const uploadProgress = ref(0)
const uploadCacSuccess = ref(false)
const uploadTinSuccess = ref(false)
const errorCacMessage = ref('')
const errorTinMessage = ref('')
const updateUserRefModel = ref(UpdateUserRequest)
const idDocument = store.get('documents', 'getIdDocument')

// Tabs state
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profile' },
  // { id: 'contact', label: 'Contact' },
  { id: 'compliance', label: 'Compliance' },
  // { id: 'api', label: 'API Keys & Webhooks' }
]

// Switch tab function
const switchTab = (tabId) => {
  activeTab.value = tabId
}

// Personal Information
const userProfile = ref(user)


// Authentication
const twoFactorEnabled = ref(false)

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

function removeFile(index, type) {

  if(type === 'cac') {
    files.value = null;
    errorCacMessage.value = '';
    uploadTinSuccess.value = false;
  }

  if(type === 'tin') {
    tinFile.value = null;
    errorTinMessage.value = '';
    uploadTinSuccess.value = false;
  }
}

async function updateUser(){
  loading.value = true
  localStorage.removeItem('user')
  try{
    const response = await store.dispatch('auth', 'updateUser', updateUserRefModel.value)
    let responseData = await response.data;
    loading.value = false

    if(responseData.code === "00"){
      await store.dispatch('auth', 'readUser')
    }else{
      notify(responseData.message, 'error')
    }
  }catch(err){
    notify(err, 'error')
    loading.value = false

  }

}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

function uploadFiles() {
  if (!this.files.length) return;

  this.isUploading = true;
  this.uploadProgress = 0;
  this.errorMessage = '';
  this.uploadSuccess = false;

  // Simulate upload progress
  const interval = setInterval(() => {
    this.uploadProgress += 5;

    if (this.uploadProgress >= 100) {
      clearInterval(interval);
      this.handleUploadCompletion();
    }
  }, 100);

  // In a real implementation, you would use something like this:
  /*
  const formData = new FormData();
  this.files.forEach(file => {
    formData.append('files', file);
  });

  axios.post('your-cloud-upload-endpoint', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      this.uploadProgress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
    }
  })
  .then(response => {
    this.handleUploadCompletion(true);
    // Handle success response
  })
  .catch(error => {
    this.isUploading = false;
    this.errorMessage = 'Upload failed. Please try again.';
    // Handle error
  });
  */
}

function handleUploadCompletion(success = true) {
  this.isUploading = false;

  if (success) {
    this.uploadSuccess = true;
    this.files = [];
  } else {
    this.errorMessage = 'Upload failed. Please try again.';
  }
}

function triggerFileInput() {
  cacRef.value.click();
}

function triggerTinFileInput() {
  tinRef.value.click();
}

function handleCacFileSelection(event) {
  files.value =  event.target.files[0];

  // Reset the input so the same file can be selected again if removed
  event.target.value = null;
}

function handleTinFileSelection(event) {
  tinFile.value =  event.target.files[0];
  console.log(tinFile.value);
  // Reset the input so the same file can be selected again if removed
  event.target.value = null;
}

// function handleFileDrop(event) {
//   this.isDragging = false;
//   const newFiles = Array.from(event.dataTransfer.files);
//   addFiles(newFiles);
// }


onMounted(() => {
  updateUserRefModel.value.phone_number = userProfile?.value?.phone_number || "";
  updateUserRefModel.value.first_name = userProfile?.value?.first_name || "";
  updateUserRefModel.value.last_name = userProfile?.value?.last_name || "";
  updateUserRefModel.value.email = userProfile?.value?.email || "";
  store.dispatch('business', 'readBank')
  store.dispatch('documents', 'readId')
})
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
            class="py-4 px-1 relative text-sm"
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
          <h2 class="text-sm font-medium text-gray-700 mb-6">Personal Information</h2>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div class="flex gap-4">
              <input 
                type="text" 
                v-model="updateUserRefModel.first_name"
                placeholder="First name"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md" 
              />
              <input 
                type="text" 
                v-model="updateUserRefModel.last_name"
                placeholder="Last name"
                class="w-full px-3 py-2 border border-gray-300 text-sm  rounded-md" 
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              v-model="userProfile.email"
              class="w-full px-3 py-2 border border-gray-300 text-sm  rounded-md bg-gray-200"
              disabled
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700  mb-2">Phone Number</label>
            <div class="flex gap-2">
              <div class="relative">
                <select class="appearance-none px-3 text-sm  py-2 pr-8 border border-gray-300 rounded-md bg-white">
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
                v-model="updateUserRefModel.phone_number"
                class="w-full px-3 py-2 text-sm  border border-gray-300 rounded-md" 
              />
            </div>
          </div>

          <div class="flex justify-end">
            <div v-if="loading" class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>

            <button 
              class="px-4 py-2 bg-gray-100 text-gray-600 cursor-pointer text-sm rounded-md hover:bg-gray-200"
              @click="updateUser"
              :disabled="loading"
              v-else
            >
              Save Changes
            </button>
          </div>
        </div>

        <!-- Authentication Section -->
        <div class="bg-white rounded-md shadow-sm p-6">
          <h2 class="text-sm font-medium text-gray-700 mb-6">Authentication</h2>

          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-700">Password Management</label>
              <router-link
                class="px-4 py-2 cursor-pointer text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                to="/change-password"
              >
                Change Password
              </router-link>
            </div>
          </div>

<!--          <div class="mb-4">-->
<!--            <div class="flex justify-between items-center">-->
<!--              <div class="flex items-center gap-1">-->
<!--                <label class="block text-sm font-medium text-gray-700">Two-factor Auth</label>-->
<!--                <button class="text-gray-400">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                    <path -->
<!--                      stroke-linecap="round" -->
<!--                      stroke-linejoin="round" -->
<!--                      stroke-width="2"-->
<!--                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" -->
<!--                    />-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </div>-->
<!--              <div class="flex items-center">-->
<!--&lt;!&ndash;                <span class="mr-2 text-sm">Enabled</span>&ndash;&gt;-->
<!--                <input type="checkbox" class="w-5 h-5"/>-->
<!--&lt;!&ndash;                <div class="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="w-4 h-4 bg-white rounded-full ml-auto"></div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <p class="text-sm text-gray-600 mb-4">-->
<!--            You cannot disable two-factor authentication because you belong to a business that requires it.-->
<!--          </p> -->

<!--          <p class="text-sm text-gray-600 mb-4">-->
<!--            this feature will soon be avaliable.-->
<!--          </p>-->

          <!-- <p class="text-sm text-gray-600">
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
      <div v-if="activeTab === 'compliance'" >
        <div class="bg-white rounded-md shadow-sm p-6 mb-5">
          <h2 class="text-sm font-medium text-gray-700 mb-6">Personal Information Verification</h2>
          <div class="flex items-center justify-between" v-if="idDocument" v-for="(i, index) in idDocument" :key="index">
            <div class="text-sm w-full">
              <p class="font-medium text-md mb-2">{{ i.document_type }}</p>
              <a class="font-medium text-md underline" :href="i.file" target="blank">{{ i.full_name }}</a>
            </div>
            <button class="text-sm p-2 flex rounded-full items-center gap-2 cursor-pointer text-green-500">Verified <CheckCheck /> </button>
            <button class="text-sm p-2 flex rounded-full items-center gap-2 cursor-pointer text-yellow-500">Pending <FileCogIcon /> </button>
            <button class="text-sm p-2 flex rounded-full items-center gap-2 cursor-pointer text-red-500">Declined <FileX /> </button>

          </div>

          <div class="flex justify-between items-center" v-else>
            <p class="text-sm text-gray-700 w-1/2">Add your ID document for verification </p>
            <router-link to="/identity-verification" class="underline text-gray-700 text-sm p-2 rounded-full cursor-pointer">Proceed</router-link>

            <div class="text-sm" v-if="idDocument">
              <p>International Passport</p>
              <p>documentname.png</p>
            </div>
            <button class="text-white text-sm p-2 rounded-full cursor-pointer bg-green-500">verified</button>

          </div>
        </div>


        <div class="bg-white rounded-md shadow-sm p-6 mb-5">
          <h2 class="text-sm font-medium text-gray-700 mb-6">Bank Information</h2>
          <div v-if="!userBank" class="flex justify-between items-center">
            <p class="text-sm text-gray-700 w-1/2">To send and receive money you have to add your commercial bank account </p>
            <router-link to="/bank" class="underline text-gray-700 text-sm p-2 rounded-full cursor-pointer">Add</router-link>

          </div>
          <div v-else class="flex justify-between items-center">
            <div class="text-sm">
              <p>{{ userBank.bank_account_name }}</p>
              <p>{{ userBank.bank_name }}</p>
            </div>
            <button class="underline text-gray-700 text-sm p-2 rounded-full cursor-pointer">update</button>

          </div>
        </div>

        <div class="bg-white rounded-md shadow-sm p-6">
          <h2 class="text-sm font-medium text-gray-700 mb-6">Business Information</h2>
          <div class="flex  justify-between items-center mb-5 border-b pb-3 border-b-gray-300">
            <div class=" w-1/2">
              <p class="text-sm font-bold mb-3 text-gray-700">CAC</p>
              <p class="text-sm text-gray-700">To send and receive money you have to add your commercial bank account </p>
              <input
                  type="file"
                  ref="cacRef"
                  @change="handleCacFileSelection"
                  class="hidden"
              />
              <div v-if="files" class="mt-6">
                <div class="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
                <ul class="space-y-2">
                  <li  class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div class="flex items-center">
                      <div class="text-gray-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-700 truncate max-w-xs">{{ files.name }}</div>
                        <div class="text-xs text-gray-500">{{ formatFileSize(files.size) }}</div>
                      </div>
                    </div>
                    <button
                        @click.prevent="removeFile(index, 'cac')"
                        class="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>

            </div>
            <button v-if="!files" @click="triggerFileInput" class="underline text-gray-700 text-sm p-2 rounded-full cursor-pointer">Add</button>
          </div>

          <div class="flex  justify-between items-center mb-5">
            <div class=" w-1/2">
              <p class="text-sm font-bold mb-3 text-gray-700">TAX IDENTIFICATION DOCUMENT</p>
              <p class="text-sm text-gray-700">To send and receive money you have to add your commercial bank account </p>
              <input
                  type="file"
                  ref="tinRef"
                  @change="handleTinFileSelection"
                  class="hidden"
              />

              <div v-if="tinFile" class="mt-6">
                <div class="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
                <ul class="space-y-2">
                  <li  class="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div class="flex items-center">
                      <div class="text-gray-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-700 truncate max-w-xs">{{ tinFile.name }}</div>
                        <div class="text-xs text-gray-500">{{ formatFileSize(tinFile.size) }}</div>
                      </div>
                    </div>
                    <button
                        @click.prevent="removeFile(index, 'tin')"
                        class="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <button v-if="!tinFile" @click="triggerTinFileInput" class="underline text-gray-700 text-sm p-2 rounded-full cursor-pointer">Add</button>
          </div>

          <div v-if="tinFile && files" class="justify-end flex w-full">
            <button class="bg-orange-500 text-white w-[100px] cursor-pointer p-1 rounded">Save</button>
          </div>
        </div>
      </div>

      <!-- Accounts Tab -->
      <div v-if="activeTab === 'accounts'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-sm font-medium text-gray-700 mb-6">Account Settings</h2>

      </div>

      <!-- Preferences Tab -->
      <div v-if="activeTab === 'preferences'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-sm font-medium text-gray-700 mb-6">User Preferences</h2>
        <p class="text-gray-600">Preferences tab content goes here.</p>
      </div>

      <!-- Team Tab -->
      <div v-if="activeTab === 'team'" class="bg-white rounded-md shadow-sm p-6">
        <h2 class="text-sm font-medium text-gray-700 mb-6">Team Management</h2>
        <p class="text-gray-600">Team tab content goes here.</p>
      </div>

      <!-- API Keys & Webhooks Tab -->
      <div v-if="activeTab === 'api'" class="bg-white rounded-md p-6">
       <ApiConfiguration />
      </div>
    </div>
  </div>
</template>