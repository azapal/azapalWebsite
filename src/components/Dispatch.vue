<template>
    <div class="p-6 bg-white">
      <h2 class="text-2xl font-semibold mb-8 text-gray-800">Available Dispatch Services</h2>
      
      <!-- List of dispatch companies with rounded logos -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
        <div 
          v-for="company in companies" 
          :key="company.id"
          class="company-item flex flex-col items-center cursor-pointer p-4"
          :class="{'opacity-75': subscribedCompanyId && subscribedCompanyId !== company.id}"
          @click="selectCompany(company)"
        >
          <!-- Rounded logo with subscription indicator -->
          <div class="relative mb-3">
            <div class="logo-container rounded-full bg-white p-2 shadow-md border-2" 
                 :class="{'border-blue-500': company.id === selectedCompany?.id, 'border-transparent': company.id !== selectedCompany?.id}">
              <img :src="company.logoUrl" :alt="company.name + ' logo'" class="w-16 h-16 object-contain rounded-full" />
              <!-- Subscription badge -->
              <div v-if="company.id === subscribedCompanyId" class="absolute -top-2 -right-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                <span class="text-white text-xs">✓</span>
              </div>
            </div>
          </div>
          <!-- Company name under logo -->
          <h3 class="text-center text-sm font-medium">{{ company.name }}</h3>
        </div>
      </div>
    </div>
  
    <!-- Side panel for company details -->
    <div class="side-panel fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 w-full max-w-md overflow-y-auto" 
         :class="{'translate-x-0': selectedCompany, 'translate-x-full': !selectedCompany}">
      
      <div v-if="selectedCompany" class="p-6">
        <!-- Close button -->
        <button @click="selectedCompany = null" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <!-- Company header with logo -->
        <div class="flex flex-col items-center mb-6 pt-4">
          <div class="mb-4">
            <img :src="selectedCompany.logoUrl" :alt="selectedCompany.name + ' logo'" class="w-24 h-24 object-contain rounded-full bg-white p-2 shadow-sm" />
          </div>
          <h3 class="text-xl font-semibold text-center">{{ selectedCompany.name }}</h3>
          <p class="text-gray-600 text-center">{{ selectedCompany.location }}</p>
        </div>
  
        <!-- Subscribe/Unsubscribe button at top -->
        <div class="mb-6 flex justify-center">
          <button 
            v-if="selectedCompany.id === subscribedCompanyId"
            @click="unsubscribe"
            class="px-6 py-2 bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200 transition-colors w-full max-w-xs"
          >
            Unsubscribe
          </button>
          <button 
            v-else
            @click="subscribe"
            class="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors w-full max-w-xs"
            :disabled="!!subscribedCompanyId && subscribedCompanyId !== selectedCompany.id"
            :class="{'opacity-50 cursor-not-allowed': !!subscribedCompanyId && subscribedCompanyId !== selectedCompany.id}"
          >
            Subscribe
          </button>
        </div>
  
        <!-- Subscription warning -->
        <div v-if="subscribedCompanyId && subscribedCompanyId !== selectedCompany.id" class="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <p class="text-amber-800 text-sm text-center">
            You are already subscribed to another dispatch service. Please unsubscribe first.
          </p>
        </div>
        
        <!-- Company details -->
        <div class="company-details-content">
          <div class="mb-6">
            <h4 class="text-lg font-medium mb-2 border-b pb-2">About</h4>
            <p class="text-gray-700">{{ selectedCompany.description }}</p>
          </div>
          
          <div class="mb-6">
            <h4 class="text-lg font-medium mb-2 border-b pb-2">Features</h4>
            <ul class="list-disc pl-5 text-gray-700">
              <li v-for="(feature, index) in selectedCompany.features" :key="index" class="mb-2">
                {{ feature }}
              </li>
            </ul>
          </div>
          
          <div class="mb-6">
            <h4 class="text-lg font-medium mb-2 border-b pb-2">Coverage Areas</h4>
            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="(area, index) in selectedCompany.coverageAreas" 
                :key="index"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {{ area }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Overlay when side panel is open -->
    <div v-if="selectedCompany" 
         class="fixed inset-0 bg-black/20 bg-opacity-20 transition-opacity" 
         @click="selectedCompany = null"></div>
  </template>
  
  <script>
  export default {
    name: 'DispatchSubscription',
    data() {
      return {
        companies: [
          {
            id: 1,
            name: 'FastTrack Logistics',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: 'Nationwide coverage with real-time tracking',
            description: 'FastTrack Logistics provides premium dispatch services with nationwide coverage. Our state-of-the-art tracking system ensures you always know where your shipments are.',
            location: 'Denver, CO',
            features: [
              'Real-time GPS tracking',
              '24/7 customer support',
              'Mobile app integration',
              'Automated dispatching',
              'Route optimization'
            ],
            coverageAreas: ['North America', 'Europe', 'Select Asian Markets']
          },
          {
            id: 2,
            name: 'Express Connect',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: 'Fast regional service with competitive rates',
            description: 'Express Connect specializes in regional dispatch services with industry-leading delivery times and competitive pricing for businesses of all sizes.',
            location: 'Chicago, IL',
            features: [
              'Same-day delivery options',
              'Dedicated account managers',
              'Custom delivery windows',
              'Weekend service available',
              'Electronic proof of delivery'
            ],
            coverageAreas: ['Midwest US', 'Northeast US', 'Southern Canada']
          },
          {
            id: 3,
            name: 'Global Dispatch Solutions',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: 'International shipping and logistics experts',
            description: 'Global Dispatch Solutions is your partner for international freight and logistics. We handle customs, regulations, and international shipping requirements.',
            location: 'Miami, FL',
            features: [
              'International shipping',
              'Customs documentation',
              'Multi-modal transport options',
              'Cargo insurance',
              'Import/export consulting'
            ],
            coverageAreas: ['North America', 'South America', 'Europe', 'Asia', 'Australia']
          },
          {
            id: 4,
            name: 'Urban Fleet',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: 'Specialized in urban and last-mile delivery',
            description: 'Urban Fleet focuses on metropolitan areas with eco-friendly vehicles and specialized solutions for urban logistics challenges.',
            location: 'Seattle, WA',
            features: [
              'Electric vehicle fleet',
              'Last-mile delivery specialists',
              'Bike courier options',
              'Smart locker integration',
              'Carbon offset program'
            ],
            coverageAreas: ['Major US Cities', 'Canadian Metropolitan Areas']
          },
          {
            id: 5,
            name: 'Rural Reach Dispatch',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: 'Specializing in rural and hard-to-reach areas',
            description: 'Rural Reach Dispatch is the expert in delivering to remote and rural locations other services cant reach.',
            location: 'Bozeman, MT',
            features: [
              'Off-road capable vehicles',
              'Rural route expertise',
              'Satellite communication',
              'Weather-adaptive routing',
              'Remote delivery specialists'
            ],
            coverageAreas: ['Rural North America', 'Mountain Regions', 'Remote Communities']
          },
          {
            id: 6,
            name: 'Overnight Express',
            logoUrl: 'https://kwik.delivery/wp-content/uploads/2023/05/kwick_secondary_logo_RGB_green_transparent_background-e1685121401616.png',
            shortDescription: '24-hour delivery guarantee',
            description: 'Overnight Express specializes in urgent shipments with guaranteed delivery times and comprehensive tracking.',
            location: 'Atlanta, GA',
            features: [
              'Guaranteed overnight delivery',
              'Priority handling',
              'Time-specific delivery options',
              'Signature confirmation',
              'Insurance included'
            ],
            coverageAreas: ['Continental US', 'Major Canadian Cities']
          }
        ],
        selectedCompany: null,
        subscribedCompanyId: null
      }
    },
    methods: {
      selectCompany(company) {
        this.selectedCompany = company;
      },
      subscribe() {
        if (!this.subscribedCompanyId) {
          this.subscribedCompanyId = this.selectedCompany.id;
          // In a real app, you would call an API here
          this.$emit('subscribe', this.selectedCompany);
        }
      },
      unsubscribe() {
        if (this.subscribedCompanyId === this.selectedCompany.id) {
          this.subscribedCompanyId = null;
          // In a real app, you would call an API here
          this.$emit('unsubscribe', this.selectedCompany);
        }
      }
    }
  }
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