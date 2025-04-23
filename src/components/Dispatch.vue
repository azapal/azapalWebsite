<template>
  <div class="p-6 bg-white">
    <h2 class="text-2xl font-semibold mb-8 text-gray-800">Available Dispatch Services Near You</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
      <div v-for="company in dispatchCompanies" :key="company.id"
        class="company-item flex flex-col items-center cursor-pointer p-4"
        :class="{ 'opacity-75': subscribedCompanyId && subscribedCompanyId !== company.id }"
        @click="selectCompany(company)">
        <div class="relative mb-3">
          <div class="logo-container rounded-full bg-white p-2 shadow-md border-2"
            :class="{ 'border-blue-500': company.id === selectedCompany?.id, 'border-transparent': company.id !== selectedCompany?.id }">
            <img :src="company.logo" :alt="company.name + ' logo'" class="w-16 h-16 object-contain rounded-full" />
            <div v-if="company.isSubscribed"
              class="absolute -top-2 -right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
              <span class="text-white text-xs">✓</span>
            </div>
          </div>
          <!-- Near You indicator -->
          <div v-if="company.isNearby" class="absolute -bottom-2 w-full flex justify-center">
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Near You</span>
          </div>
        </div>
        <h3 class="text-center text-sm font-medium">{{ company.name }}</h3>
        <!-- Display company rating -->
        <div class="flex items-center mt-1">
          <div class="flex">
            <template v-for="i in 5" :key="i">
              <svg 
                :class="i <= Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-300'"
                class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </template>
          </div>
          <span class="ml-1 text-xs text-gray-600">{{ company.rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>
  </div> 

  <!-- Side panel for company details -->
  <div class="side-panel fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 w-full max-w-md overflow-y-auto"
    :class="{ 'translate-x-0': selectedCompany, 'translate-x-full': !selectedCompany }">
    <div v-if="selectedCompany" class="p-6">
      <button @click="closePanel" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex flex-col items-center mb-6 pt-4">
        <div class="mb-4">
          <img :src="selectedCompany.logo" :alt="selectedCompany.name + ' logo'"
            class="w-24 h-24 object-contain rounded-full bg-white p-2 shadow-sm" />
        </div>
        <h3 class="text-xl font-semibold text-center">{{ selectedCompany.name }}</h3>
        <p class="text-gray-500 italic text-center">"{{ selectedCompany.motto }}"</p>
        
        <!-- Rating system with user interaction -->
        <div class="flex flex-col items-center mt-3">
          <p class="text-sm text-gray-600 mb-1">Rate this company:</p>
          <div class="flex">
            <template v-for="i in 5" :key="i">
              <svg 
                @click="rateCompany(selectedCompany, i)"
                :class="[
                  i <= (hoveredRating || selectedCompany.userRating || Math.floor(selectedCompany.rating)) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300',
                  'cursor-pointer'
                ]"
                @mouseover="hoveredRating = i"
                @mouseleave="hoveredRating = 0"
                class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </template>
          </div>
          <div class="text-sm text-gray-600 mt-1">
            <span>Community rating: {{ selectedCompany.rating.toFixed(1) }}</span>
            <span v-if="selectedCompany.userRating"> | Your rating: {{ selectedCompany.userRating }}</span>
          </div>
        </div>
        
        <!-- Like/Dislike functionality -->
        <div class="flex items-center mt-4 space-x-4">
          <button 
            @click="likeCompany(selectedCompany)"
            class="flex items-center px-3 py-1 rounded-full transition-colors"
            :class="selectedCompany.userLiked ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" 
              :stroke="selectedCompany.userLiked ? 'currentColor' : 'currentColor'" :stroke-width="selectedCompany.userLiked ? 2 : 1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{{ selectedCompany.likes || 0 }}</span>
          </button>
          <button 
            @click="dislikeCompany(selectedCompany)"
            class="flex items-center px-3 py-1 rounded-full transition-colors"
            :class="selectedCompany.userDisliked ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" 
              :stroke="selectedCompany.userDisliked ? 'currentColor' : 'currentColor'" :stroke-width="selectedCompany.userDisliked ? 2 : 1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
            <span>{{ selectedCompany.dislikes || 0 }}</span>
          </button>
        </div>
        
        <p class="text-gray-600 text-center mt-3">{{ selectedCompany.location }}</p>
        
        <!-- Subscription buttons -->
        <div class="mt-4 flex space-x-3">
          <button 
            v-if="!isCompanySubscribed(selectedCompany.id)"
            @click="subscribe()"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Subscribe to Company
          </button>
          <button 
            v-else
            @click="unsubscribe()"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Unsubscribe
          </button>
        </div>
      </div>

      <!-- Branches Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-3 border-b pb-2">Branches</h4>
        <div v-for="branch in selectedCompany.branches" :key="branch.id" 
          class="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h5 class="font-medium">{{ branch.name }}</h5>
            <button 
              @click="toggleBranchSubscription(branch)"
              class="px-3 py-1 text-sm rounded-full font-medium transition-colors"
              :class="branch.isSubscribed ? 
                'bg-red-100 text-red-700 hover:bg-red-200' : 
                'bg-blue-600 text-white hover:bg-blue-700'">
              {{ branch.isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
            </button>
          </div>
          
          <div class="mb-2">
            <span class="text-gray-700 text-sm font-medium">Manager:</span>
            <span class="text-gray-700 text-sm ml-1">{{ branch.manager }}</span>
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span class="text-gray-700 text-sm">{{ branch.phone }}</span>
          </div>
        </div>
      </div>

      <!-- Delivery Coverage Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-3 border-b pb-2">Delivery Coverage</h4>
        <div class="flex flex-wrap gap-2 mt-2">
          <span v-for="(area, index) in selectedCompany.deliveryAreas" :key="index"
            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            {{ area }}
          </span>
        </div>
      </div>

      <!-- About Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2 border-b pb-2">About</h4>
        <p class="text-gray-700">{{ selectedCompany.description }}</p>
      </div>

      <!-- Features Section -->
      <div class="mb-6">
        <h4 class="text-lg font-medium mb-2 border-b pb-2">Features</h4>
        <ul class="list-disc pl-5 text-gray-700">
          <li v-for="(feature, index) in selectedCompany.features" :key="index" class="mb-2">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-if="selectedCompany" class="fixed inset-0 bg-black/20 bg-opacity-20 transition-opacity"
    @click="closePanel"></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StoreUtils from '../utils/storeUtils'

const store = StoreUtils

// Enhanced company data with like/dislike and nearby flags
const companies = ref([
  {
    id: 1,
    name: "SpeedyDispatch",
    motto: "Your Packages, Our Priority",
    logo: "/api/placeholder/150/150",
    location: "Headquarters: Atlanta, GA",
    rating: 4.8,
    likes: 243,
    dislikes: 18,
    userRating: null,
    userLiked: false,
    userDisliked: false,
    isNearby: true,
    description: "SpeedyDispatch is a leading logistics and dispatch service with over 15 years of experience. We specialize in fast, reliable deliveries for businesses and individuals across the Eastern United States.",
    features: [
      "Real-time tracking for all deliveries",
      "Temperature-controlled transport options",
      "Insurance coverage up to $10,000 per package",
      "Same-day delivery options in select areas",
      "Specialized handling for fragile items"
    ],
    branches: [
      {
        id: 101,
        name: "Atlanta Hub",
        manager: "Michael Johnson",
        phone: "(404) 555-7890",
        isSubscribed: false
      },
      {
        id: 102,
        name: "Charlotte Branch",
        manager: "Sarah Williams",
        phone: "(704) 555-1234",
        isSubscribed: false
      },
      {
        id: 103,
        name: "Miami Operations",
        manager: "Carlos Rodriguez",
        phone: "(305) 555-9876",
        isSubscribed: false
      }
    ],
    deliveryAreas: [
      "Atlanta Metro", "Charlotte", "Raleigh", "Miami", "Orlando",
      "Tampa", "Nashville", "Jacksonville", "Columbia"
    ]
  },
  {
    id: 2,
    name: "Premier Logistics",
    motto: "Delivering Excellence Every Mile",
    logo: "/api/placeholder/150/150",
    location: "Headquarters: Chicago, IL",
    rating: 4.6,
    likes: 187,
    dislikes: 25,
    userRating: null,
    userLiked: false,
    userDisliked: false,
    isNearby: false,
    description: "Premier Logistics offers comprehensive dispatch services with a focus on reliability and customer satisfaction. Our network spans the Midwest, providing businesses with efficient delivery solutions.",
    features: [
      "24/7 customer support team",
      "Fleet of eco-friendly vehicles",
      "Custom routing optimization",
      "Weekend and holiday deliveries",
      "Bulk shipping discounts"
    ],
    branches: [
      {
        id: 201,
        name: "Chicago Main Branch",
        manager: "David Wilson",
        phone: "(312) 555-4321",
        isSubscribed: false
      },
      {
        id: 202,
        name: "Detroit Office",
        manager: "Lisa Chen",
        phone: "(313) 555-8765",
        isSubscribed: false
      },
      {
        id: 203,
        name: "Minneapolis Center",
        manager: "James Peterson",
        phone: "(612) 555-3456",
        isSubscribed: false
      }
    ],
    deliveryAreas: [
      "Chicago", "Detroit", "Indianapolis", "Milwaukee", "Minneapolis",
      "St. Louis", "Cleveland", "Cincinnati", "Columbus", "Louisville"
    ]
  },
  {
    id: 3,
    name: "WestCoast Express",
    motto: "Fast, Reliable, On Time",
    logo: "/api/placeholder/150/150",
    location: "Headquarters: Los Angeles, CA",
    rating: 4.9,
    likes: 312,
    dislikes: 14,
    userRating: null,
    userLiked: false,
    userDisliked: false,
    isNearby: true,
    description: "WestCoast Express specializes in rapid dispatch services throughout the Western United States. With our state-of-the-art technology and experienced team, we ensure your deliveries arrive promptly and safely.",
    features: [
      "Rush delivery options available",
      "API integration for business clients",
      "Advanced package tracking system",
      "Specialized pharmaceutical transport",
      "International shipping partnerships"
    ],
    branches: [
      {
        id: 301,
        name: "Los Angeles Center",
        manager: "Emily Parker",
        phone: "(213) 555-6789",
        isSubscribed: false
      },
      {
        id: 302,
        name: "San Francisco Hub",
        manager: "Robert Lee",
        phone: "(415) 555-2345",
        isSubscribed: false
      },
      {
        id: 303,
        name: "Seattle Branch",
        manager: "Jennifer Garcia",
        phone: "(206) 555-7890",
        isSubscribed: false
      },
      {
        id: 304,
        name: "Phoenix Operation",
        manager: "Thomas Wright",
        phone: "(602) 555-1122",
        isSubscribed: false
      }
    ],
    deliveryAreas: [
      "Los Angeles", "San Francisco", "San Diego", "Seattle", "Portland",
      "Las Vegas", "Phoenix", "Sacramento", "San Jose", "Denver", "Salt Lake City"
    ]
  }
]);

// State variables
const selectedCompany = ref(null);
const subscribedCompanyId = ref(null);
const hoveredRating = ref(0);

// Use the companies from our data instead of relying on store
const dispatchCompanies = computed(() => {
  // In a real app, this would come from the store
  // But for demo purposes, we'll use our local data
  return companies.value;
});

// Utility function to check if a company is subscribed
const isCompanySubscribed = (companyId) => {
  return subscribedCompanyId.value === companyId;
};

// Company selection
function selectCompany(company) {
  selectedCompany.value = company;
}

// Company subscription functions
function subscribe() {
  if (!subscribedCompanyId.value) {
    subscribedCompanyId.value = selectedCompany.value.id;
    // In a real app, you would update the store here
  }
}

function unsubscribe() {
  if (subscribedCompanyId.value === selectedCompany.value.id) {
    subscribedCompanyId.value = null;
    // In a real app, you would update the store here
  }
}

// Rating function
function rateCompany(company, rating) {
  company.userRating = rating;
  
  // Calculate new average rating (simplified)
  // In a real app, this would be handled by the backend
  const oldTotal = company.rating * 100; // Assuming we had 100 ratings
  const newTotal = oldTotal + rating;
  company.rating = parseFloat((newTotal / 101).toFixed(1));
}

// Like/Dislike functions
function likeCompany(company) {
  if (company.userLiked) {
    // Unlike
    company.likes--;
    company.userLiked = false;
  } else {
    // Like
    if (company.userDisliked) {
      // Remove dislike first if it exists
      company.dislikes--;
      company.userDisliked = false;
    }
    company.likes++;
    company.userLiked = true;
  }
}

function dislikeCompany(company) {
  if (company.userDisliked) {
    // Undislike
    company.dislikes--;
    company.userDisliked = false;
  } else {
    // Dislike
    if (company.userLiked) {
      // Remove like first if it exists
      company.likes--;
      company.userLiked = false;
    }
    company.dislikes++;
    company.userDisliked = true;
  }
}

// Close the side panel
const closePanel = () => {
  selectedCompany.value = null;
};

// Branch subscription toggle
const toggleBranchSubscription = (branch) => {
  // Find if any branch in any company is already subscribed
  const alreadySubscribedBranch = findSubscribedBranch();
  
  // If trying to subscribe and another branch is already subscribed
  if (!branch.isSubscribed && alreadySubscribedBranch) {
    // Here you could implement a confirmation dialog or notification
    if (confirm(`You are already subscribed to ${getCompanyAndBranchName(alreadySubscribedBranch)}. Would you like to switch your subscription?`)) {
      // Unsubscribe from the current branch
      alreadySubscribedBranch.isSubscribed = false;
      // Subscribe to the new branch
      branch.isSubscribed = true;
    }
  } else {
    // Toggle subscription status
    branch.isSubscribed = !branch.isSubscribed;
  }
};

// Helper function to find any subscribed branch across all companies
const findSubscribedBranch = () => {
  for (const company of companies.value) {
    for (const branch of company.branches) {
      if (branch.isSubscribed) {
        return branch;
      }
    }
  }
  return null;
};

// Helper function to get company and branch name as a string
const getCompanyAndBranchName = (branch) => {
  for (const company of companies.value) {
    const foundBranch = company.branches.find(b => b.id === branch.id);
    if (foundBranch) {
      return `${company.name} - ${foundBranch.name}`;
    }
  }
  return "another branch";
};

// Initialize the component
onMounted(() => {
  // Simulate getting user location and determining nearby services
  // In a real app, this would use geolocation API and compare to company locations
  console.log("Component mounted, location detection would happen here");
});
</script>

<style scoped>
.company-item {
  transition: all 0.2s ease;
}

.company-item:hover .logo-container {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.logo-container {
  transition: all 0.2s ease;
}

.side-panel {
  z-index: 50;
}
</style>