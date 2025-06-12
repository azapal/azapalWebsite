<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->


    <!-- Hero Section -->
    <section class="px-8 lg:px-16 pt-6 pb-12">
      <header class="py-4">
        <div class="text-sm text-gray-400 max-w-7xl mx-auto ">Azapal Business</div>
      </header>
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="text-sm">
          <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
          <h2 class="text-3xl font-light mb-6">{{ product.tagline }}</h2>
          <p class="text-gray-300">
            {{ product.description }}
          </p>
        </div>

        <!-- Right Column -->
        <div class="mt-6 md:mt-0">
          <div class="bg-white rounded-lg p-6 text-gray-800 text-sm">
            <h3 class="text-xl font-semibold mb-4">Get started</h3>
            <p class="mb-6">Create an {{ product.name }} account to get started.</p>
            <router-link to="/business/vendor/create"
                class="bg-[#2563EB] hover:bg-[#F97316] text-[#fff] cursor-pointer font-medium px-6 py-2 rounded-full transition-colors"
            >
              Get started
            </router-link>
          </div>

          <div class="bg-white rounded-lg p-6 text-gray-800 mt-6 text-sm">
            <h3 class="text-xl font-semibold mb-4">Pricing</h3>
            <p class="mb-3">
              {{ product.name }} is free for the first {{product.pricing.trial}} then ₦{{ product.pricing.cost }} monthly
              subscription.
            </p>
<!--            <a href="#" class="text-blue-500 hover:underline flex items-center">-->
<!--              Learn more-->
<!--              <ExternalLinkIcon class="h-4 w-4 ml-1" />-->
<!--            </a>-->
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
<!--    <section class="px-8 lg:px-16 py-12">-->
<!--      <div class="max-w-7xl mx-auto">-->
<!--        <h2 class="text-2xl font-semibold mb-8">How it works</h2>-->

<!--        <div class="bg-white bg-opacity-5 rounded-lg p-6">-->
<!--          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">-->
<!--            <div v-for="(step, index) in workflowSteps" :key="index" class="text-center p-4">-->
<!--              <div class="h-24 flex items-center justify-center mb-4">-->
<!--                <component :is="step.icon" class="h-16 w-16 text-gray-400" />-->
<!--              </div>-->
<!--              <h3 class="font-semibold">{{ step.title }}</h3>-->
<!--              <p v-if="step.subtitle" class="text-sm text-gray-400 mb-2">{{ step.subtitle }}</p>-->
<!--              <p class="text-sm text-gray-300">{{ step.description }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

    <!-- Benefits and features -->
    <section class="px-8 lg:px-16 py-12">
      <div class="max-w-7xl mx-auto text-sm">
        <h2 class="text-2xl font-semibold mb-8">Benefits and features</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(feature, index) in features" :key="index" class="bg-white  rounded-lg p-6">
            <h3 class="text-xl font-semibold mb-4 text-[#000]">{{ feature.title }}</h3>
            <p class="text-[#000]">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Getting Started and Resources -->
<!--    <section class="px-8 lg:px-16 py-12">-->
<!--      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">-->
<!--        &lt;!&ndash; Getting Started &ndash;&gt;-->
<!--        <div>-->
<!--          <div class="bg-white rounded-lg p-6 text-gray-800">-->
<!--            <h3 class="text-xl font-semibold mb-4">Getting started</h3>-->
<!--            <ul class="divide-y divide-gray-200">-->
<!--              <li v-for="(link, index) in gettingStartedLinks" :key="index" class="py-3">-->
<!--                <a href="#" class="text-blue-500 hover:underline">{{ link }}</a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; Resources &ndash;&gt;-->
<!--        <div>-->
<!--          <div class="bg-white rounded-lg p-6 text-gray-800">-->
<!--            <h3 class="text-xl font-semibold mb-4">More resources</h3>-->
<!--            <ul class="divide-y divide-gray-200">-->
<!--              <li v-for="(link, index) in resourceLinks" :key="index" class="py-3">-->
<!--                <a href="#" class="text-blue-500 hover:underline">{{ link }}</a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Settings as SettingsIcon,
  Puzzle as PuzzleIcon,
  Laptop as LaptopIcon,
  Mail as MailIcon,
  ExternalLink as ExternalLinkIcon
} from 'lucide-vue-next';

const product = ref({
  name: 'Azapal Online Vendors (AOV)',
  tagline: 'Providing reliable and trusted social place for africa social commerce',
  description: 'Azapal Online Vendors (AOV) Provides reliable and trusted social place for africa social commerce.',
  pricing: {
    cost: '500',
    storage: null,
    trial: '2 months',
  }
});

const workflowSteps = ref([
  {
    title: 'Setup',
    icon: SettingsIcon,
    description: 'Create an Amazon WorkMail organization for your domain and users'
  },
  {
    title: 'Integrate',
    subtitle: '(optional)',
    icon: PuzzleIcon,
    description: 'Integrate with AWS services or on-premises solutions'
  },
  {
    title: 'Connect',
    icon: LaptopIcon,
    description: 'Use existing email clients on your devices or the web'
  },
  {
    title: 'Communicate',
    icon: MailIcon,
    description: 'Send and receive emails, access your calendar and contacts'
  }
]);

const features = ref([
  {
    title: 'Owo Sure',
    description: 'Azapal uses a secure transaction technology designed to protect the stockholders in an online transactions. Be assured to get paid on every successful transactions'
  },
  {
    title: 'Automated Logistics Service',
    description: 'Azapal automates logistics and dispatch services for your business, by using end-to-end smart notification systems. Just plug in and lets automate logistics for your business.',
    action:'See how it works'
  }
]);

const gettingStartedLinks = ref([
  'What is Amazon WorkMail?',
  'Getting started with Amazon WorkMail',
  'Working with organizations'
]);

const resourceLinks = ref([
  'Administrator Guide',
  'User Guide'
]);

</script>