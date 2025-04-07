import { defineStore } from "pinia";
import Pay from "../../service/Pay";
import PaystackPop from '@paystack/inline-js'

const popup = new PaystackPop()

export const usePayStore = defineStore("payStore", {
  state: () => ({
    loading: false,
    banks: [],
    resolvedAccount: null,
    business: null,
    lookup: null
  }),

  getters: {
    getBusiness: state => state.business,
    getLoading: state => state.loading,
    getResolvedAccount: state => state.resolvedAccount,
    getBanks: state => state.banks,
    getLookUp: state => state.lookup
  },

  actions: {
    async readbank() {
      this.loading = true;
      const response = await Pay.readBank()
      this.loading = false
      try {
        this.banks = response.data.data
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async initializePayment(payload: any) {
      this.loading = true;
      const response = await Pay.initiatePayment(payload)
      this.loading = false
      try {
        if (response.data.response_code === '00') {
            console.log('worked')
            popup.resumeTransaction(response.data.access_code)
        }
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async businessLookup(payload: any) {
      this.loading = true;
    
      try {
        const response = await Pay.lookup(payload);
        const responseData = response.data;
    
        if (responseData.response_code === "00") {
          this.lookup = responseData.data[0];
        } else {
          alert(responseData.response_message);
        }
      } catch (err) {
        console.log('error:', err);
      } finally {
        this.loading = false; // always runs
      }
    },
    

    async resolve(payload: any) {
      this.loading = true;
      const response = await Pay.resolve(payload.account_number, payload.bank_code)
      this.loading = false
      try {
        if (response.data.status)
          this.resolvedAccount = response.data.data
        else alert(response.data.message)
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    }
  }
});
