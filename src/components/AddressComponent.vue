<script setup>
import { ref, watch } from 'vue'
import {Search, LocateFixed, Navigation, XCircle, ChevronLeft, ScanSearch} from 'lucide-vue-next'
import InfoComponent from "./InfoComponent.vue";

import {getUserLocation} from "../utils/getUserLocation.js";
import {notify} from "../utils/toast.js";

const searchQuery = ref('')
const placePredictions = ref([])
const isLoading = ref(false)
const sessionToken = ref(generateRandomString(16))
const emit = defineEmits(['location'])


const GOOGLE_PLACES_API_KEY = 'AIzaSyCJHtS9C4SsTAIKZqeFqFg8RHSbW015jFk'

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function clearSearch() {
  searchQuery.value = ''
  placePredictions.value = []
}

async function useCurrentLocation() {
  console.log('Use current location clicked')
  try{
    const  {latitude, longitude} =  await getUserLocation({enableHighAccuracy: true, timeout: 5000})
    if(latitude && longitude) {
      emit('location', {latitude:latitude,longitude:longitude})
    }else{
      notify('cant get your location at the moment', 'error')
    }
  }catch(e){
    notify(e.message, 'error')
  }

}

let timeoutId
watch(searchQuery, (newQuery) => {
  clearTimeout(timeoutId)
  if (newQuery.length > 2) {
    timeoutId = setTimeout(fetchPlacePredictions, 300)
  } else {
    placePredictions.value = []
  }
})

async function fetchPlacePredictions() {
  isLoading.value = true
  try {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            searchQuery.value
        )}&types=address&language=en&key=${GOOGLE_PLACES_API_KEY}&sessiontoken=${sessionToken.value}`
    )
    const data = await response.json()
    console.log(data)
    placePredictions.value = data.predictions || []
  } catch (err) {
    console.error('Error fetching predictions', err)
  } finally {
    isLoading.value = false
  }
}

async function handlePlaceSelect(placeId, description) {
  isLoading.value = true
  try {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,formatted_address&key=${GOOGLE_PLACES_API_KEY}&sessiontoken=${sessionToken.value}`
    )
    const data = await response.json()

    console.log(data)

    if (data.result) {
      const newAddress = {
        id: placeId,
        name: description.split(',')[0],
        address: data.result.formatted_address,
        latitude: data.result.geometry.location.lat,
        longitude: data.result.geometry.location.lng
      }
      console.log('Selected address:', newAddress)

      searchQuery.value = ''
      placePredictions.value = []
      sessionToken.value = generateRandomString(16)


      // Trigger store fetching etc.
    }
  } catch (err) {
    console.error('Error fetching place details', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
    <div class="flex flex-col max-w-lg mx-auto p-4 sm:p-6 md:p-8">
    <!-- Back button -->
    <router-link to="/business/vendor" class="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4">
      <ChevronLeft />
      <span class="text-lg font-semibold">Back</span>
    </router-link>

    <h2 class="text-xl sm:text-2xl font-bold mb-4">Enter your physical shop address</h2>

    <InfoComponent title="Don't have a shop address?" content="If you dont have a shop address, enter your physical address. This information will be used by the dispatch/logistic company whenever required" />


      <!-- Search input -->
    <div class="flex items-center border mt-4 border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 mb-4">
      <ScanSearch />
      <input
          type="text"
          class="flex-1 bg-transparent outline-none ml-2 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
          placeholder="Enter your address"
          :value="searchQuery"
          @input="searchQuery = $event.target.value"
      />
      <button v-if="searchQuery" @click="clearSearch">
        <XCircle />
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center my-4">
      <span class="text-sm text-indigo-500">searching...</span>
    </div>

    <!-- Suggestions or current location -->
    <div class="flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
      <div v-if="placePredictions.length > 0">
        <p class="text-sm text-gray-500 mb-1">Google Suggestions</p>
        <div
            v-for="prediction in placePredictions"
            :key="prediction.place_id"
            class="flex items-start gap-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200"
            @click="handlePlaceSelect(prediction.place_id, prediction.description)"
        >
          <Navigation />
          <div>
            <p class="font-medium text-sm sm:text-base">
              {{ prediction.structured_formatting?.main_text || prediction.description.split(',')[0] }}
            </p>
            <p class="text-gray-500 text-xs sm:text-sm line-clamp-2">
              {{ prediction.structured_formatting?.secondary_text || prediction.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-else-if="!searchQuery">
        <button
            class="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 text-left w-full"
            @click="useCurrentLocation"
        >
          <LocateFixed />
          <span class="font-medium text-sm sm:text-base">Use your current location</span>
        </button>
      </div>

      <div
          v-if="searchQuery && !isLoading && placePredictions.length === 0"
          class="flex flex-col items-center justify-center text-center py-8 text-gray-400"
      >
        <div class="flex flex-col justify-center items-center">
          <img class="w-[100px]" src="../assets/images/undraw_map-dark_g9xq.svg" alt="map" />
          <p class="mt-2 text-sm">No addresses match your search</p>

        </div>
      </div>
    </div>
  </div>
</template>

