<script setup>
import StoreUtils from '../../../utils/storeUtils.js'
import {onMounted, ref} from "vue";
import CooperativeProductDescriptionPage from "../../../components/productDescription/CooperativeProductDescriptionPage.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
import CooperativeProfile from "../../../components/CooperativeProfile.vue";
import {notify} from "../../../utils/toast.js";

const store = StoreUtils
const loading = ref(false)

const cooperative = ref(store.get('business', 'getUserCooperative'));
const user_id = store.get('auth', 'getCurrentUser');

const getCooperative = async () => {
  if(cooperative)loading.value = true;
  try{
    const response = await store.dispatch('business', 'readCooperativeByUserId', user_id?.value.id)
    let responseData = await response.data;
    loading.value = false
    if(responseData.code === "00"){
      store.commit('business', 'cooperative', responseData.data);
    }
  }catch(err){
    loading.value = false
    if(err.status !== 404){
      notify(err);
    }
    console.log(err);
  }

}

onMounted(() => {
  getCooperative()
})

</script>
<template>

  <DashboardLayout v-slot:content>
    <div class="flex-1" v-if="loading">
      <p>Loading</p>
    </div>

    <CooperativeProfile v-if="cooperative && !loading" />
    <CooperativeProductDescriptionPage v-if="!cooperative && !loading"/>

  </DashboardLayout>




</template>
<style></style>