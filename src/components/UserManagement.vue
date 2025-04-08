<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderNav from './HeaderNav.vue';

// State for users and selected user
const users = ref([]);
const selectedUser = ref(null);
const isLoading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const availablePermissions = ref([
  { id: 1, name: 'View Dashboard' },
  { id: 2, name: 'Manage Users' },
  { id: 3, name: 'Edit Content' },
  { id: 4, name: 'Delete Content' },
  { id: 5, name: 'Approve Posts' },
  { id: 6, name: 'Financial Reports' },
  { id: 7, name: 'System Settings' },
]);

// Form state
const isEditing = ref(false);
const userForm = ref({
  id: null,
  name: '',
  email: '',
  role: '',
  permissions: []
});

// Fetch users from API
const fetchUsers = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Mock API call - replace with actual API endpoint
    // const response = await fetch('/api/users');
    // users.value = await response.json();
    
    // Mock data for demonstration
    setTimeout(() => {
      users.value = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Editor', permissions: [1, 3, 5] },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', permissions: [1, 2, 3, 4, 5, 6, 7] },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', permissions: [1] },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', permissions: [1, 3, 5, 6] },
      ];
      isLoading.value = false;
    }, 500);
  } catch (err) {
    error.value = 'Failed to load users. Please try again later.';
    isLoading.value = false;
    console.error('Error fetching users:', err);
  }
};

// Select a user to view/edit
const selectUser = (user) => {
  selectedUser.value = { ...user };
  isEditing.value = false;
};

// Start editing user
const editUser = () => {
  userForm.value = { ...selectedUser.value };
  isEditing.value = true;
};

// Update user info
const updateUser = async () => {
  try {
    // Mock API call - replace with actual API endpoint
    // await fetch(`/api/users/${userForm.value.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userForm.value)
    // });
    
    // Update locally for demonstration
    const index = users.value.findIndex(u => u.id === userForm.value.id);
    if (index !== -1) {
      users.value[index] = { ...userForm.value };
      selectedUser.value = { ...userForm.value };
    }
    
    isEditing.value = false;
  } catch (err) {
    error.value = 'Failed to update user. Please try again.';
    console.error('Error updating user:', err);
  }
};

// Delete user
const deleteUser = async (userId) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  
  try {
    // Mock API call - replace with actual API endpoint
    // await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    
    // Update locally for demonstration
    users.value = users.value.filter(user => user.id !== userId);
    selectedUser.value = null;
  } catch (err) {
    error.value = 'Failed to delete user. Please try again.';
    console.error('Error deleting user:', err);
  }
};

// Add or remove permission
const togglePermission = (permissionId) => {
  if (!userForm.value.permissions) {
    userForm.value.permissions = [];
  }
  
  const index = userForm.value.permissions.indexOf(permissionId);
  if (index === -1) {
    userForm.value.permissions.push(permissionId);
  } else {
    userForm.value.permissions.splice(index, 1);
  }
};

// Check if user has permission
const hasPermission = (user, permissionId) => {
  return user?.permissions?.includes(permissionId);
};

// Filter users based on search query
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  );
});

// Create a new user
const createNewUser = () => {
  userForm.value = {
    id: Date.now(), // Temporary ID
    name: '',
    email: '',
    role: 'Viewer',
    permissions: [1] // Default permission
  };
  selectedUser.value = null;
  isEditing.value = true;
};

// Save a new user
const saveNewUser = async () => {
  try {
    // Mock API call - replace with actual API endpoint
    // const response = await fetch('/api/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userForm.value)
    // });
    // const newUser = await response.json();
    
    // Update locally for demonstration
    const newUser = { ...userForm.value };
    users.value.push(newUser);
    selectedUser.value = newUser;
    isEditing.value = false;
  } catch (err) {
    error.value = 'Failed to create user. Please try again.';
    console.error('Error creating user:', err);
  }
};

// Cancel editing
const cancelEdit = () => {
  isEditing.value = false;
  if (!selectedUser.value) return;
  userForm.value = { ...selectedUser.value };
};

// Load users on component mount
onMounted(() => {
  fetchUsers();
});
</script>

<template>
    <HeaderNav />
  <div class="flex flex-col w-full max-w-6xl mx-auto p-5 gap-5">
    <!-- Header -->
    <div class="flex justify-between items-center mb-5">
      <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
      <button 
        @click="createNewUser" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        Add New User
      </button>
    </div>
    
    <!-- Search Bar -->
    <div class="mb-5">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search users..." 
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    
    <!-- Main Container -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <!-- Left Panel: Users List -->
      <div class="bg-white rounded-lg shadow-md p-5 overflow-y-auto h-[calc(100vh-200px)] md:col-span-1">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">Users</h2>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="text-gray-500 py-4">Loading users...</div>
        
        <!-- Error State -->
        <div v-else-if="error" class="bg-red-100 text-red-700 p-3 rounded-md mb-4">{{ error }}</div>
        
        <!-- Empty State -->
        <div v-else-if="users.length === 0" class="text-center py-8 text-gray-500">
          No users found. Add a new user to get started.
        </div>
        
        <!-- Users List -->
        <ul v-else class="divide-y divide-gray-200">
          <li 
            v-for="user in filteredUsers" 
            :key="user.id"
            @click="selectUser(user)"
            :class="[
              'cursor-pointer transition-colors',
              selectedUser?.id === user.id 
                ? 'bg-blue-50 border-l-4 border-blue-500' 
                : 'hover:bg-gray-50'
            ]"
          >
            <div class="p-4">
              <h3 class="font-medium text-gray-900">{{ user.name }}</h3>
              <p class="text-sm text-gray-500">{{ user.email }}</p>
              <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full" 
                :class="{
                  'bg-purple-100 text-purple-800': user.role === 'Admin',
                  'bg-blue-100 text-blue-800': user.role === 'Manager',
                  'bg-green-100 text-green-800': user.role === 'Editor',
                  'bg-gray-100 text-gray-800': user.role === 'Viewer'
                }">
                {{ user.role }}
              </span>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Right Panel: User Details -->
      <div class="bg-white rounded-lg shadow-md p-5 overflow-y-auto h-[calc(100vh-200px)] md:col-span-2">
        <!-- Empty Selection State -->
        <div v-if="!selectedUser && !isEditing" class="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
          <p>Select a user to view details or click "Add New User" to create a new user.</p>
        </div>
        
        <!-- Edit Mode -->
        <div v-else-if="isEditing" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-800">{{ userForm.id ? 'Edit User' : 'Create New User' }}</h2>
          
          <!-- User Form -->
          <div class="space-y-4">
            <!-- Name Field -->
            <div>
              <label for="userName" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                id="userName" 
                type="text" 
                v-model="userForm.name" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            
            <!-- Email Field -->
            <div>
              <label for="userEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                id="userEmail" 
                type="email" 
                v-model="userForm.email" 
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
            </div>
            
            <!-- Role Field -->
            <div>
              <label for="userRole" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select 
                id="userRole" 
                v-model="userForm.role"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            
            <!-- Permissions -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div 
                  v-for="permission in availablePermissions" 
                  :key="permission.id"
                  class="flex items-center p-2 bg-gray-50 rounded-md"
                >
                  <input 
                    type="checkbox"
                    :id="`permission-${permission.id}`"
                    :checked="hasPermission(userForm, permission.id)"
                    @change="togglePermission(permission.id)"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                  />
                  <label :for="`permission-${permission.id}`" class="ml-2 text-sm text-gray-700">{{ permission.name }}</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Form Actions -->
          <div class="flex space-x-3 mt-6">
            <button 
              @click="userForm.id ? updateUser() : saveNewUser()" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {{ userForm.id ? 'Update User' : 'Create User' }}
            </button>
            <button 
              @click="cancelEdit" 
              class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <!-- User View Mode -->
        <div v-else class="space-y-6">
          <!-- User Header -->
          <div class="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">{{ selectedUser.name }}</h2>
            <div class="flex space-x-2">
              <button 
                @click="editUser" 
                class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
              >
                Edit
              </button>
              <button 
                @click="deleteUser(selectedUser.id)" 
                class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
          
          <!-- User Info -->
          <div class="space-y-3">
            <div class="flex">
              <span class="font-medium text-gray-600 w-24">Email:</span>
              <span class="text-gray-800">{{ selectedUser.email }}</span>
            </div>
            <div class="flex">
              <span class="font-medium text-gray-600 w-24">Role:</span>
              <span class="inline-block px-2 py-1 text-xs rounded-full" 
                :class="{
                  'bg-purple-100 text-purple-800': selectedUser.role === 'Admin',
                  'bg-blue-100 text-blue-800': selectedUser.role === 'Manager',
                  'bg-green-100 text-green-800': selectedUser.role === 'Editor',
                  'bg-gray-100 text-gray-800': selectedUser.role === 'Viewer'
                }">
                {{ selectedUser.role }}
              </span>
            </div>
          </div>
          
          <!-- User Permissions -->
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-3">Permissions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div 
                v-for="permission in availablePermissions" 
                :key="permission.id"
                class="flex items-center p-3 rounded-md"
                :class="hasPermission(selectedUser, permission.id) ? 'bg-green-50' : 'bg-gray-50'"
              >
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full mr-2"
                  :class="hasPermission(selectedUser, permission.id) ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-400'">
                  {{ hasPermission(selectedUser, permission.id) ? '✓' : '✗' }}
                </span>
                <span class="text-sm" :class="hasPermission(selectedUser, permission.id) ? 'text-green-700' : 'text-gray-500'">
                  {{ permission.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>