<template>
  <DashboardLayout v-slot:content>
    <div class="h-screen flex flex-col md:flex-row">
<!--      {{accountNotifications}}-->
      <!-- AccountNotifications List -->
      <div
          v-if="!showDetailOnMobile || isDesktop"
          class="w-full md:w-1/4 border-r border-gray-200 overflow-y-auto"
      >
        <div
            v-for="(notification, index) in accountNotifications"
            :key="index"
            @click="handleSelect(notification)"
            :class="[
          'p-4 cursor-pointer flex flex-col border-b border-gray-100',
          selectedNotification?.id === notification.id ? 'bg-blue-50' : '',
          !notification.read_status ? 'font-semibold bg-gray-50' : ''
        ]"
        >
          <div class="flex justify-between">
            <span>{{ notification.title }}</span>
            <span
                class="text-xs rounded-full px-2 py-0.5"
                :class="notification.read_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
            {{ notification.read_status ? 'Read' : 'Unread' }}
          </span>
          </div>
          <div class="text-sm text-gray-500 truncate">
            {{ notification.content }}
          </div>
          <div class="text-xs text-gray-400">
            {{ notification.created_at }}
          </div>
        </div>
      </div>

      <!-- Full Notification View -->
      <div
          v-if="selectedNotification"
          class="w-full md:w-2/3 p-4 overflow-y-auto"
      >
        <button
            @click="goBack"
            class="md:hidden mb-4 text-blue-600 underline"
        >
          ← Back to notifications
        </button>
        <h2 class="text-xl font-bold mb-2">{{ selectedNotification.title }}</h2>
        <div class="text-sm text-gray-400 mb-4">
          {{ selectedNotification.date }}
        </div>
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
          {{ selectedNotification.content }}
        </p>
      </div>

      <!-- Placeholder when no selection on desktop -->
      <div
          v-else-if="isDesktop"
          class="w-2/3 hidden md:flex items-center justify-center text-gray-400"
      >
        Select a notification to view its content
      </div>
    </div>
  </DashboardLayout>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from "./layout/DashboardLayout.vue";
import StoreUtils from "../../utils/storeUtils.js";
import {UpdateNotificationRequest} from "../../model/request/notifications/NotificationRequest.js";

const notifications = ref([
  {
    id: 1,
    title: 'Welcome to our service!',
    preview: 'Thank you for signing up. Here’s what you need to know...',
    content: `Thank you for signing up for our service. We’re excited to have you on board.

Here’s what you can do next:
- Explore the dashboard
- Set up your profile
- Contact support if you need help.`,
    date: '2025-06-13 09:00 AM',
    read: false
  },
  {
    id: 2,
    title: 'Your weekly summary',
    preview: 'Here’s what happened this week on your account...',
    content: `Your weekly summary:

- 5 new followers
- 3 new messages
- 2 new comments

Keep up the great work!`,
    date: '2025-06-12 06:30 PM',
    read: false
  },
  {
    id: 3,
    title: 'Update on your request',
    preview: 'We’ve processed your recent request. Please check the details...',
    content: `We have processed your recent request. Please log in to your account to review the changes.

If you have any questions, feel free to reach out to our support team.`,
    date: '2025-06-11 02:15 PM',
    read: true
  }
])
const store = StoreUtils

const accountNotifications = store.get('notifications', 'getAccountNotifications')
const selectedNotification = ref(null)
const showDetailOnMobile = ref(false)

const isDesktop = computed(() => window.innerWidth >= 768)

async function handleSelect(notification) {
  selectedNotification.value = notification
  UpdateNotificationRequest.read_status = true
  notification.read = true
  if (!isDesktop.value) {
    showDetailOnMobile.value = true
  }
  await store.dispatch('notifications', 'updateNotificationById', {id:notification.id, request:UpdateNotificationRequest})

}

function goBack() {
  selectedNotification.value = null
  showDetailOnMobile.value = false
}

function updateIsDesktop() {
  // Update on resize
  if (window.innerWidth >= 768) {
    showDetailOnMobile.value = false
  }
}
onMounted(() => {
  window.addEventListener('resize', updateIsDesktop)
  store.dispatch('notifications', 'readNotificationById')
})
</script>
