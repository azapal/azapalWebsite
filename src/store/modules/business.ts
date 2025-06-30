import { defineStore } from "pinia";
import Business from "../../service/business.ts";
import {notify} from "../../utils/toast.ts";
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

    async readBank() {
      try{
        const response = await Business.readUserBank()
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

    async dispatchSubscribe(payload: any) {
      const response = await Business.dispatchSubscribe(payload)
      try {
        if (response.data.code === '00') {
            notify(response.data.message, 'success')
            await this.readSubscribe()
            await this.readBusiness()
        }else{
          notify(response.data.message, 'error')
        }
      } catch (err:any) {
        this.loading = false
        console.log('error:', err)
        notify(err, 'error')
      }
    },


    async dispatchUnSubscribe(payload: any) {
      const response = await Business.dispatchUnSubscribe(payload)
      try {
        if (response.data.code === '00') {
          notify(response.data.message, 'success')
          await this.readSubscribe()
          await this.readBusiness()
        }else{
          notify(response.data.message, 'error')
        }
      } catch (err:any) {
        this.loading = false
        console.log('error:', err)
        notify(err, 'error')
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
    },

    updateBank(payload: any) {
      return Business.updateUserBank(payload)
    }
  }
});

