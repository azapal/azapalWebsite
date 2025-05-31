<script setup>
import CreateBusiness from "../../../components/forms/CreateBusiness.form.vue"
// import BusinessDetails from "../../components/BusinessDetails.vue"
import LogisticsDescriptionPage from "../../../components/productDescription/LogisticsDescriptionPage.vue";
import LogisticsProfile from "./LogisticsProfile.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
import StoreUtils from '../../../utils/storeUtils.js'
import { onMounted } from "vue";

const store = StoreUtils

const userBusiness = store.get('business', 'getBusiness')

onMounted(() => {
    store.dispatch('business', 'readBusiness')
})

</script>
<template>
   
       <DashboardLayout v-slot:content>
         <LogisticsDescriptionPage v-if="!userBusiness ||  userBusiness === 'null' || userBusiness?.category !== 'logistics'" />
         <LogisticsProfile v-else />
       </DashboardLayout>



</template>
<style></style>