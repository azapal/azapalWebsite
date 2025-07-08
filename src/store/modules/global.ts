import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", {
    state: () => ({
        useType:'business'
    }),

    getters: {
        getUseType:state => state.useType
    },

    actions: {  }



});

