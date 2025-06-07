import { defineStore } from "pinia";
import Business from "../../service/Business";
export const useBusinessStore = defineStore("businessStore", {
  state: () => ({
    loading: false,
    business: null,
    userBank: null,
    subscribe:[],
    transactions:null,
    cooperative:null,
    cooperativeMembers:null,
    isBusinessVerificationDone:false,
  }),

  getters: {
    getBusiness: state => state.business,
    getLoading: state => state.loading,
    getUserBank: state => state.userBank,
    getSubscribe: state => state.subscribe,
    getTransactions: state => state.transactions,
    getUserCooperative:state => state.cooperative,
    getCooperativeMembers:state => state.cooperativeMembers

  },

  actions: {
     createBusiness(payload: any) {
      return Business.addUserBusiness(payload)

    },

    createCooperative(payload: any) {
      return Business.createCooperative(payload)
    },

    readCooperativeByUserId(payload: any) {
      return Business.readCooperativeByUserId(payload)
    },

    readMembersByCooperativeId(payload: any) {
      return Business.readMembersByCooperativeId(payload)
    },

    async readBank(payload: any) {
      try{
        const response = await Business.readUserBank(payload)
        const responseData = response.data
        if(responseData.code === "00"){
          this.userBank = responseData.data
        }

      }catch(error){
        console.log(error)
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
        if (response.data.code === '00') {
          this.business = response.data?.data
        } 
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    async readUserTransactions() {
      this.loading = true;
      const response = await Business.readUserTransactions()
      this.loading = false
      try {
        if (response.data.response_code === '00') {
          this.transactions = response.data?.results?.data
        } 
      } catch (err) {
        this.loading = false
        console.log('error:', err)
      }
    },

    addBank(payload: any) {
      return Business.addUserBank(payload)
    }
  }
});

