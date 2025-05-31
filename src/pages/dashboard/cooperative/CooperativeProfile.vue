<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ cooperative?.cooperative_name }} Overview</h1>
        <p class="text-gray-600">Manage your cooperative's activities and member engagement.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Members -->
        <div class="rounded-lg border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Total Members</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900">{{ cooperativeMembers?.length || 0 }}</span>
            <span class="text-sm font-medium text-green-600">+0%</span>
          </div>
        </div>

        <!-- Active Projects -->
        <div class="rounded-lg border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Active Projects</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900">0</span>
            <span class="text-sm font-medium text-green-600">+0%</span>
          </div>
        </div>

        <!-- Financial Health -->
        <div class="rounded-lg border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 mb-2">Financial Health</h3>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-bold text-gray-900">₦0</span>
            <span class="text-sm font-medium text-green-600">+0%</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-3">
          <button @click="createPackage=true" class="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Create Package
          </button>
          <button @click="addInterest=true" class="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Create Member Interest
          </button>
        </div>
      </div>

      <CooperativeTable />
    </div>
  </div>

  <div v-if="createPackage" class="min-h-screen bg-black/80 top-0 left-0 right-0 bottom-0 z-50 fixed p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Create Package</h1>
      </div>

      <!-- Form -->
      <div class="">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Sub Cooperative Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Package Name
            </label>
            <input
                id="name"
                v-model="CreateCooperativePackage.package_name"
                type="text"
                placeholder="Enter package name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
                id="description"
                v-model="CreateCooperativePackage.package_description"
                rows="5"
                placeholder="Enter description"
                class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

          <label
              class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Interest</span>
            <input required v-model="CreateCooperativePackage.saving_plan_interest" type="text" placeholder="1"
                   class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>


          <div class="space-y-2">
            <label for="bank" class="block text-sm font-medium ">Select Timeline for interest</label>
            <div class="relative">
              <div
                  @click="showTimelineDropdown = !showTimelineDropdown"
                  class="flex items-center justify-between w-full p-3 border border-gray-300  rounded-lg bg-whitecursor-pointer">
                <span :class="CreateCooperativePackage.interest_timeline ? 'text-gray-900 ' : 'text-gray-500 '">
                  {{ CreateCooperativePackage.interest_timeline || 'Timeline' }}
                </span>
                <ChevronsUpDown class="w-4 h-4 text-gray-500" />
              </div>

              <!-- Dropdown -->
              <div v-if="showTimelineDropdown" class="absolute z-10 w-full mt-1 bg-white  border border-gray-200  rounded-lg shadow-lg max-h-60 overflow-y-auto">

                <div class="py-1">
                  <button
                      v-for="item in timelineOptions"
                      :key="item.value"
                      @click.prevent="selectTimeline(item.value)"
                      class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100  flex items-center justify-between"
                      :class="{'text-blue-600  font-medium': item.value === CreateCooperativePackage.interest_timeline}"
                  >
                    {{ item.key }}
                    <Check v-if="item.value === CreateCooperativePackage.interest_timeline" class="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-4">
            <button
                type="button"
                @click="handleCancel"
                class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="px-6 py-3 text-white bg-[#2563EB] rounded-lg font-medium hover:bg-blue-500 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="addInterest" class="min-h-screen bg-black/80 top-0 left-0 right-0 bottom-0 z-50 fixed p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Add Member Interest</h1>
      </div>

      <!-- Form -->
      <div class="">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Sub Cooperative Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Sub Cooperative Name
            </label>
            <input
                id="name"
                v-model="createInterestForm.name"
                type="text"
                placeholder="Enter sub cooperative name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
                id="description"
                v-model="createInterestForm.description"
                rows="5"
                placeholder="Enter description"
                class="w-full px-4 py-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>


          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-4">
            <button
                type="button"
                @click="handleCancel"
                class="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="px-6 py-3 text-white bg-[#2563EB] rounded-lg font-medium hover:bg-blue-500 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


</template>

<script setup>
import { ChevronsUpDown, Check, Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Settings  } from 'lucide-vue-next'
import {ref, computed} from "vue";
import {CreateCooperativePackage} from "../../../model/request/business/businessRequest.js";
import CooperativeTable from "./CooperativeTable.vue";

const createInterestForm = ref({
  name: '',
  description: '',
  contactPerson: '',
  email: '',
  phoneNumber: ''
})

const createPackage = ref(false)
const addInterest = ref(false)

import StoreUtils from '../../../utils/storeUtils.ts';

const store = StoreUtils;
const cooperative = ref(store.get('business', 'getUserCooperative'));
const cooperativeMembers = ref(store.get('business', 'getCooperativeMembers'));
const showTimelineDropdown = ref(false);


const timelineOptions = [
  {key:"Monthly", value: "monthly"},
  {key:"Quarterly", value: "quarterly"},
  {key:"Annual", value: "annual"},
]

const selectTimeline = (value) => {
  CreateCooperativePackage.interest_timeline = value ? value : 'annual';
  showTimelineDropdown.value = false;
  console.log(CreateCooperativePackage)
};


const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  // Handle form submission logic here
}

const handleCancel = () => {
  // Reset form or navigate back
  Object.values(CreateCooperativePackage).forEach(key => {
    return CreateCooperativePackage[key] = ''
  })
  Object.values(CreateCooperativePackage).forEach(key => {
    return CreateCooperativePackage[key] = ''
  })

  console.log('Form cancelled')
  createPackage.value = false
  addInterest.value = false
}

const searchQuery = ref('')
const selectAll = ref(false)
const selectedBuckets = ref([])
const currentPage = ref(1)

const buckets = ref([
  {
    name: 'cf-templates--1ncj0lxn9l16-eu-north-1',
    region: 'Europe (Stockholm) eu-north-1',
    analyzerText: 'View analyzer for eu-north-1',
    analyzerUrl: '#',
    creationDate: 'March 3, 2025, 02:15:37 (UTC+01:00)',
    url: '#'
  },
  {
    name: 'ennovatingx-useraccount',
    region: 'US East (N. Virginia) us-east-1',
    analyzerText: 'View analyzer for us-east-1',
    analyzerUrl: '#',
    creationDate: 'March 10, 2025, 21:18:20 (UTC+01:00)',
    url: '#'
  },
  {
    name: 'ennovatingx.com',
    region: 'US East (N. Virginia) us-east-1',
    analyzerText: 'View analyzer for us-east-1',
    analyzerUrl: '#',
    creationDate: 'February 27, 2025, 23:53:35 (UTC+01:00)',
    url: '#'
  },
  {
    name: 'locate-me',
    region: 'Europe (Stockholm) eu-north-1',
    analyzerText: 'View analyzer for eu-north-1',
    analyzerUrl: '#',
    creationDate: 'July 24, 2024, 13:55:22 (UTC+01:00)',
    url: '#'
  },
  {
    name: 'service-azapal',
    region: 'US East (N. Virginia) us-east-1',
    analyzerText: 'View analyzer for us-east-1',
    analyzerUrl: '#',
    creationDate: 'April 2, 2025, 03:38:11 (UTC+01:00)',
    url: '#'
  },
  {
    name: 'service-payment',
    region: 'US East (N. Virginia) us-east-1',
    analyzerText: 'View analyzer for us-east-1',
    analyzerUrl: '#',
    creationDate: 'April 2, 2025, 03:36:27 (UTC+01:00)',
    url: '#'
  }
])

const tableHeaders = [
  { label: 'User', key: 'full_name' },
  { label: 'User Type', key: 'joining_as' },
  { label: 'Cooperative', key: 'cooperative_id' },
  { label: 'Interest', key: 'interest_id' }
]


const filteredBuckets = computed(() => {
  if (!searchQuery.value) return buckets.value
  return buckets.value.filter(bucket =>
      bucket.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedBuckets.value = filteredBuckets.value.map(bucket => bucket.name)
  } else {
    selectedBuckets.value = []
  }
}
</script>
