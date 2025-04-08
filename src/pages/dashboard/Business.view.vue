<script setup>
import CreateBusiness from "../../components/forms/CreateBusiness.form.vue"
// import BusinessDetails from "../../components/BusinessDetails.vue"
import BusinessProfile from "../../components/BusinessProfile.vue";

import StoreUtils from '../../utils/storeUtils'

const store = StoreUtils

const userBusiness = store.get('business', 'getBusiness')
const isBusiness = Object?.keys(userBusiness)?.length === 0 

</script>
<template>
    <BusinessProfile v-if="!isBusiness" />
    <CreateBusiness  v-else />
</template>
<style></style>