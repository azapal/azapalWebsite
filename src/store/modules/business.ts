import { defineStore } from "pinia";
import Business from "../../service/Business";
export const useBusinessStore = defineStore("businessStore", {
  state: () => ({
    loading: false,
    business: null,
    userBank: null
  }),

  getters: {
    getBusiness: state => state.business,
    getLoading: state => state.loading,
    getUserBank: state => state.userBank,

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
        }
        alert(response.data.response_message)
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
          this.business = response.data
        } else {
          alert(response.data.response_message)
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

