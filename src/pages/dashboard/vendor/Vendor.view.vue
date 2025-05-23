<script setup>
import CreateBusiness from "../../../components/forms/CreateBusiness.form.vue"
// import BusinessDetails from "../../components/BusinessDetails.vue"
import VendorDescriptionPage from "../../../components/productDescription/VendorDescriptionPage.vue";
import BusinessProfile from "../../../components/BusinessProfile.vue";
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
    <VendorDescriptionPage v-if="userBusiness === 'null'" />
    <BusinessProfile v-else />
  </DashboardLayout>



</template>
<style></style>