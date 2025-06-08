import { defineStore } from "pinia";
import Documents from "../../service/Documents.ts";
import type {CreateIdDocumentRequestType} from "../../model/request/documents/documentRequest.ts";
import {notify} from "../../utils/toast.ts";
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

    actions: {

        async uploadId(payload:CreateIdDocumentRequestType){
            try{
                const response = await Documents.postIdDocument(payload)
                let responseData = response.data
                if(responseData.code === "00"){
                    //
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }
        },

        async updateId(id:string, payload:CreateIdDocumentRequestType){
            try{
                const response = await Documents.updateIdDocument(id, payload)
                let responseData = response.data
                if(responseData.code === "00"){
                    //
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },

        async deleteId(payload:string){
            try{
                const response = await Documents.deleteIdDocument(payload)
                let responseData = response.data
                if(responseData.code === "00"){
                    //
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }
        },

        async readId(){
            try{
                const response = await Documents.getIdDocument()
                let responseData = response.data
                if(responseData.code === "00"){
                    this.idDocument = responseData.data
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        }
    }
});

