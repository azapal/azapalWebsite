<script setup>
import CreateBusiness from "../../components/forms/CreateBusiness.form.vue"
// import BusinessDetails from "../../components/BusinessDetails.vue"
import BusinessProfile from "../../components/BusinessProfile.vue";

import StoreUtils from '../../utils/storeUtils'
import { onMounted } from "vue";

const store = StoreUtils

const userBusiness = store.get('business', 'getBusiness')

onMounted(() => {
    store.dispatch('business', 'readBusiness')
})

</script>
<template>
   

       <CreateBusiness v-if="userBusiness === 'null'" />
       <BusinessProfile v-else />


</template>
<style></style>