import { defineStore } from "pinia";
import Pay from "../../service/Pay";
export const usePayStore = defineStore("payStore", {
  state: () => ({
    loading: false,
    banks:[],
    resolvedAccount:null,
    business:null
  }),

  getters: {
    getBusiness: state => state.business,
    getLoading: state => state.loading,
    getResolvedAccount: state => state.resolvedAccount,
    getBanks: state => state.banks,
  },

  actions: {
     async readbank(){
      this.loading = true;
      const response = await Pay.readBank()
      this.loading = false
      try{
        this.banks = response.data.data
      }catch(err){
        this.loading = false
        console.log('error:', err)
      }
     },

     async resolve(payload:any){
        this.loading = true;
        const response = await Pay.resolve(payload.account_number, payload.bank_code)
        this.loading = false
        try{
            if(response.data.status)
                this.resolvedAccount = response.data.data
            else alert( response.data.message)
        }catch(err){
          this.loading = false
          console.log('error:', err)
        }
       }
  }
});
