<script setup lang="ts">
import {ref, computed} from 'vue'


const sortField = ref('');
const sortDirection = ref('asc');
const searchTerm = ref('');
const selectedItems = ref([]);
const selectAll = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
import StoreUtils from '../../../utils/storeUtils.ts';

const store = StoreUtils;
const cooperativeMembers = ref(store.get('business', 'getCooperativeMembers'));

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

// Handle sorting
const handleSort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
};

// Filter and sort data
const filteredAndSortedData = computed(() => {
  let filtered = cooperativeMembers.value?.filter(item => {
    const searchLower = searchTerm.value.toLowerCase();
    return (
        (item.full_name || '').toLowerCase().includes(searchLower) ||
        item.cooperative_id.cooperative_name.toLowerCase().includes(searchLower) ||
        item.joining_as.toLowerCase().includes(searchLower) ||
        item.interest_id.some(interest => interest.name.toLowerCase().includes(searchLower))
    );
  });

  if (sortField.value) {
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortField.value) {
        case 'name':
          aValue = a.full_name || '';
          bValue = b.full_name || '';
          break;
        case 'cooperative':
          aValue = a.cooperative_id.cooperative_name;
          bValue = b.cooperative_id.cooperative_name;
          break;
        case 'joining_as':
          aValue = a.joining_as;
          bValue = b.joining_as;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
});

// Pagination
const totalPages = computed(() =>
    Math.ceil(filteredAndSortedData.value?.length / itemsPerPage.value)
);

const paginatedData = computed(() =>
    filteredAndSortedData.value?.slice(
        (currentPage.value - 1) * itemsPerPage.value,
        currentPage.value * itemsPerPage.value
    )
);

// Handle selection
const handleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = [];
  } else {
    selectedItems.value = paginatedData.value?.map(item => item.id);
  }
  selectAll.value = !selectAll.value;
};

const handleSelectItem = (id) => {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(item => item !== id);
  } else {
    selectedItems.value = [...selectedItems.value, id];
  }
};

// Render sort icon
const getSortIconClass = (field) => {
  if (sortField.value !== field) {
    return 'w-4 h-4 text-gray-400';
  }
  return sortDirection.value === 'asc'
      ? 'w-4 h-4 text-blue-600'
      : 'w-4 h-4 text-blue-600';
};

const getSortIcon = (field) => {
  if (sortField.value !== field) {
    return 'chevron-up';
  }
  return sortDirection.value === 'asc' ? 'chevron-up' : 'chevron-down';
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <!-- Search Bar -->
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
        <input
            type="text"
            placeholder="Search members, cooperatives, or interests..."
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="w-12 px-4 py-3">
            <input
                type="checkbox"
                v-model="selectAll"
                @change="handleSelectAll"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </th>
          <th class="text-left px-4 py-3 text-sm font-medium text-gray-900">
            <button
                @click="handleSort('name')"
                class="flex items-center gap-1 hover:text-blue-600"
            >
              Name
              <i :data-lucide="getSortIcon('name')" :class="getSortIconClass('name')"></i>
            </button>
          </th>
          <th class="text-left px-4 py-3 text-sm font-medium text-gray-900">
            <button
                @click="handleSort('cooperative')"
                class="flex items-center gap-1 hover:text-blue-600"
            >
              Cooperative
              <i :data-lucide="getSortIcon('cooperative')" :class="getSortIconClass('cooperative')"></i>
            </button>
          </th>
          <th class="text-left px-4 py-3 text-sm font-medium text-gray-900">
            <button
                @click="handleSort('joining_as')"
                class="flex items-center gap-1 hover:text-blue-600"
            >
              Type
              <i :data-lucide="getSortIcon('joining_as')" :class="getSortIconClass('joining_as')"></i>
            </button>
          </th>
          <th class="text-left px-4 py-3 text-sm font-medium text-gray-900">
            Interests
          </th>
          <th class="text-left px-4 py-3 text-sm font-medium text-gray-900">
            <button
                @click="handleSort('created_at')"
                class="flex items-center gap-1 hover:text-blue-600"
            >
              Creation Date
              <i :data-lucide="getSortIcon('created_at')" :class="getSortIconClass('created_at')"></i>
            </button>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
        <tr
            v-for="member in paginatedData"
            :key="member.id"
            class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-4 py-4">
            <input
                type="checkbox"
                :checked="selectedItems.includes(member.id)"
                @change="handleSelectItem(member.id)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </td>
          <td class="px-4 py-4">
            <div class="text-gray-900 font-medium">
              {{ member.full_name || 'N/A' }}
            </div>
            <div class="text-sm text-gray-500">
              ID: {{ member.user_id }}
            </div>
          </td>
          <td class="px-4 py-4">
            <div class="text-gray-900 font-medium">
              {{ member.cooperative_id.cooperative_name }}
            </div>
            <div class="text-sm text-gray-500">
              {{ member.cooperative_id.description }}
            </div>
            <span
                v-if="member.cooperative_id.is_verified"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1"
            >
                                            Verified
                                        </span>
          </td>
          <td class="px-4 py-4">
                                        <span
                                            :class="member.joining_as === 'individual'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-purple-100 text-purple-800'"
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        >
                                            {{ member.joining_as }}
                                        </span>
          </td>
          <td class="px-4 py-4">
            <div class="flex flex-wrap gap-1">
                                            <span
                                                v-for="interest in member.interest_id"
                                                :key="interest.id"
                                                class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                                            >
                                                {{ interest.name }}
                                            </span>
            </div>
          </td>
          <td class="px-4 py-4 text-gray-900">
            {{ formatDate(member.created_at) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination and Controls -->
    <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
          </button>
          <span class="text-sm text-gray-700">
                                    Page {{ currentPage }} of {{ totalPages }}
                                </span>
          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="text-sm text-gray-500">
          Showing {{ paginatedData?.length }} of {{ filteredAndSortedData?.length }} results
        </div>
      </div>

      <div class="flex items-center gap-2">
                            <span v-if="selectedItems.length > 0" class="text-sm text-gray-600">
                                {{ selectedItems?.length }} selected
                            </span>
        <button class="p-2 text-gray-400 hover:text-gray-600">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>