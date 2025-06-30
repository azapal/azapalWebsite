<template>
  <div class="max-h-screen text-sm">
    <HeaderNav />
    <div :class="`lg:hidden md:hidden z-50 flex items-center justify-end p-2 ${collapsed ? 'absolute': 'static'} right-1`">
<!--      <h1 class="font-bold transition-opacity duration-200">-->
<!--        {{ route?.name }}-->
<!--      </h1>-->
      <button @click="toggleMobileSidebar" class="m-1  rounded-lg  cursor-pointer focus:outline-none">

        <MenuIcon
            class="h-6 w-6  transition-transform duration-200"
            :class="{ 'rotate-180': collapsed }"
        />
      </button>

    </div>
    <div class="flex">
    <!-- DashboardLayout -->
      <div
          class="relative flex flex-col transition-all duration-300 bg-white  lg:block md:block"
        :class="`transition-all duration-300 ${openOnMobile ? (collapsed ? 'hidden' : 'block w-full') : (collapsed ? 'hidden lg:w-16 lg:block md:w-16 md:block' : 'hidden lg:block lg:w-64 md:block md:w-64')}`">
        <!-- DashboardLayout Header -->
        <div class="items-center justify-between p-4 hidden lg:flex md:flex">
          <h1 class="font-bold transition-opacity duration-200" :class="{ 'hidden': collapsed }">
            {{ route?.name }}
          </h1>
          <button @click="toggleSidebar" class="p-1 rounded-lg hover:bg-[#2563EB] hover:text-[#fff] cursor-pointer focus:outline-none">
            <ChevronLeftIcon
                class="h-6 w-6  transition-transform duration-200"
                :class="{ 'rotate-180': collapsed }"
            />
          </button>



        </div>

        <!-- DashboardLayout Content -->
        <div class="flex-1 overflow-y-auto">
          <nav class="p-2">
            <ul class="space-y-1">
              <!-- Navigation Items -->
              <li v-for="(item, index) in navigationItems" :key="index">
                <!-- Main Link -->
                <div
                    @click="item.hasSubItems ? toggleSubMenu(index) : routeTo(item.link)"
                    :class="`flex items-center p-2 rounded-full cursor-pointer hover:bg-[#2563EB] hover:text-[#fff]
                    ${route?.fullPath?.includes(item.name.toLowerCase()) && ('bg-[#F97316]/50 text-black')} ${collapsed && !item.hasSubItems && ('justify-center items-center')}`">
                  <div class="flex items-center flex-1">
                    <div :class="[collapsed ? 'items-center flex w-full justify-center h-full' : 'mr-3']">
                      <component :is="item.icon" class="w-5 h-5" />
                    </div>
                    <span class="transition-opacity duration-200" :class="{ 'hidden': collapsed }">
                    {{ item.name }}
                  </span>
                  </div>

                  <!-- Dropdown icon if has subitems -->
                  <div v-if="item.hasSubItems" class="transition-opacity duration-200" :class="{ 'hidden': collapsed }">
                    <ChevronDownIcon
                        class="h-4 w-4 transition-transform duration-200"
                        :class="{ 'rotate-180': item.expanded }"
                    />
                  </div>
                </div>

                <!-- Subitems -->
                <ul
                    v-if="item.hasSubItems"
                    class="mt-1 ml-6 space-y-1 overflow-hidden transition-all duration-300"
                    :class="[item.expanded && !collapsed ? 'min-h-auto' : 'max-h-0']"
                >

                  <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                    <router-link
                        :to="subItem.link"
                        :class="`flex items-center p-2 text-sm rounded-full hover:text-[#F97316]
                    ${route?.name?.toLowerCase() === subItem.name.toLowerCase()  && ('text-[#F97316] ')} ${collapsed && !item.hasSubItems && ('justify-center')}`"

                    >
                      <div :class="`w-1 h-1 rounded-full  bg-gray-600 ${route?.name?.toLowerCase().includes(subItem.name.toLowerCase()) && ('bg-white')} mr-3 text-[13px]`"></div>
                      <div class="flex items-center gap-1">
                        <CheckCheckIcon class="text-green-600 w-4 h-4" v-if="route?.name?.toLowerCase().includes(subItem.name.toLowerCase())" />
                        {{ subItem.name }}
                      </div>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <!-- DashboardLayout Footer -->
<!--        <div class="p-4 border-t border-gray-700">-->
<!--          <div class="flex items-center" :class="{ 'justify-center': collapsed }">-->
<!--            <div class="flex-shrink-0">-->
<!--              <img class="h-8 w-8 rounded-full" src="" alt="User avatar" />-->
<!--            </div>-->
<!--            <div class="ml-3 transition-opacity duration-200" :class="{ 'opacity-0': collapsed }">-->
<!--              <p class="text-sm font-medium text-white">John Doe</p>-->
<!--              <p class="text-xs text-gray-300">View Profile</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <!-- Main Content -->
      <div class="flex-1 h-[100vh] overflow-auto ">

        <slot name="content" />

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {
  Home as HomeIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
  BarChart as ChartIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  ChevronDown as ChevronDownIcon,
  Building as BuildingIcon,
  Workflow as WorkflowIcon,
  CheckCheck as CheckCheckIcon,
} from 'lucide-vue-next';
import HeaderNav from "../../../components/HeaderNav.vue";
import router from "../../../router/index.js"
import Dashboard from "../Dashboard.view.vue";
import Bank from "../Bank.view.vue";

const route = ref(router?.currentRoute?._value);
const openOnMobile = ref(false);
// DashboardLayout state
const collapsed = ref(true);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const toggleMobileSidebar = () => {
  collapsed.value = !collapsed.value;
  openOnMobile.value = !openOnMobile.value;
};

// Navigation items with subitems
const navigationItems = ref([
  // {
  //   name: 'Dashboard',
  //   icon: HomeIcon,
  //   hasSubItems: false,
  //   link:'/dashboard',
  // },
  {
    name: 'Business',
    icon: BuildingIcon,
    hasSubItems: true,
    expanded: false,
    subItems: [
      { name: 'Vendor', link:'/business/vendor' },
      { name: 'Logistics', link:'/business/logistics' },
      { name: 'Cooperative', link:'/business/cooperative' },
      { name: 'Escrow', link:'/business/escrow' }
    ]
  },
  // {
  //   name: 'Services',
  //   icon: WorkflowIcon,
  //   hasSubItems: true,
  //   expanded: false,
  //   subItems: [
  //     { name: 'Escrow' },
  //   ]
  // },
  {
    name: 'Users',
    icon: UsersIcon,
    hasSubItems: true,
    expanded: false,
    subItems: [
      { name: 'User Management' },
      { name: 'Permissions' },
      { name: 'Roles' }
    ]
  },
  // {
  //   name: 'Analytics',
  //   icon: ChartIcon,
  //   hasSubItems: true,
  //   expanded: false,
  //   subItems: [
  //     { name: 'Reports' },
  //     { name: 'Statistics' },
  //     { name: 'Performance' }
  //   ]
  // },
]);

// Toggle submenu
const toggleSubMenu = (index) => {
  if (!collapsed.value) {
    navigationItems.value[index].expanded = !navigationItems.value[index].expanded;
  }
};

const routeTo = (route) => {
  router.push({path:route});

}

</script>