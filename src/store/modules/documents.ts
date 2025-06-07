import { defineStore } from "pinia";


export const useDocumentsStore = defineStore("documentStore", {
    state: () => ({
        idDocument: null,
        cacDocument:null,
        tinDocument: null,
    }),

    getters: {
        getIdDocument: state => state.idDocument,
        getCacDocument: state => state.cacDocument,
        getTinDocument: state => state.tinDocument,
    },

    actions: {}
});

