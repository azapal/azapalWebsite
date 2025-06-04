<script setup>
import StoreUtils from '../../../utils/storeUtils.js'
import {onMounted, ref} from "vue";
import EscrowProductDescriptionPage from "../../../components/productDescription/EscrowProductDescriptionPage.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";
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
      await store.commit('business', 'cooperative', responseData.data);
      console.log(responseData);
      try{
        const response2 = await  store.dispatch('business', 'readMembersByCooperativeId', responseData?.data.id)
        let responseData2 = await response2.data;
        if(responseData2.code === "00"){
          await store.commit('business', 'cooperativeMembers', responseData2.data);
        }
      }catch(e){
        console.log(e)
      }
    }
  }catch(err){
    loading.value = false
    if(err.status !== 404){
      notify(err);
    }
    console.log(err);
  }

}

onMounted(() => {})

</script>
<template>

  <DashboardLayout v-slot:content>

    <EscrowProductDescriptionPage />

  </DashboardLayout>




</template>
<style></style>