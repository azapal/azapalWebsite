import { defineStore } from "pinia";
import Business from "../../service/Business";
export const useBusinessStore = defineStore("businessStore", {
  state: () => ({
    loading: false,
    business: null,
    userBank: null,
    subscribe:[]
  }),

  getters: {
    getBusiness: state => state.business,
    getLoading: state => state.loading,
    getUserBank: state => state.userBank,
    getSubscribe: state => state.subscribe

  },

  actions: {
    async createBusiness(payload: any) {
      this.loading = true;
      const response = await Business.addUserBusiness(payload)
      this.loading = false
      try {
        if (response.data.response_code === '00') {
          this.business = response.data
          alert(response.data.response_message)
          location.reload()
        }else{
          alert(response.data.response_message)
        }
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async readSubscribe() {
      this.loading = true;
      const response = await Business.readSubscribe()
      this.loading = false
      try {
        if (response.data.code === '00') {
          this.subscribe = response.data?.dispatch
        }else{
          //pass
        }
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async readBusiness() {
      this.loading = true;
      const response = await Business.readUserBusiness()
      this.loading = false
      try {
        if (response.data.response_code === '00') {
          this.business = response.data?.data
        } 
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async addBank(payload: any) {
      this.loading = true;
      const response = await Business.addUserBank(payload)
      this.loading = false
      try {
        if (response.data.response_code === '00') {
          this.userBank = response.data
          alert(response.data.response_message)
        }
        alert(response.data.response_message)
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    }
  }
});

