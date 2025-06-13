import { defineStore } from "pinia";
import Documents from "../../service/documents.ts";
import type {CreateIdDocumentRequestType, CreateTinDocumentRequest,CreateCacDocumentRequest} from "../../model/request/documents/documentRequest.ts";
import {notify} from "../../utils/toast.ts";
import router from "../../router";
export const useDocumentsStore = defineStore("documentStore", {
    state: () => ({
        idDocument: null,
        cacDocument:null,
        tinDocument: null,
        documents:null
    }),

    getters: {
        getIdDocument: state => state.idDocument,
        getCacDocument: state => state.cacDocument,
        getTinDocument: state => state.tinDocument,
        getDocuments: state => state.documents,
    },

    actions: {

        async uploadId(payload:CreateIdDocumentRequestType){
            try{
                const response = await Documents.postIdDocument(payload)
                let responseData = response.data
                console.log(response)
                if(responseData.code === "00"){
                    await router.push({path:'/settings'})
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }
        },

        async updateId(payload){
            try{
                const response = await Documents.updateIdDocument(payload.id, payload.file)
                let responseData = response.data
                if(responseData.code === "00"){
                    await router.push({path:'/settings'})
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

        },


        async uploadCac(payload:CreateCacDocumentRequest){
            try{
                const response = await Documents.postCacDocument(payload)
                let responseData = response.data
                console.log(response)
                if(responseData.code === "00"){
                    await this.readBusinessDocs()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }
        },

        async updateCac(payload){
            try{
                const response = await Documents.updateCacDocument(payload.id, payload.file)
                let responseData = response.data
                if(responseData.code === "00"){
                    await this.readBusinessDocs()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },

        async deleteCac(payload:string){
            try{
                const response = await Documents.deleteCacDocument(payload)
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

        async readCacById(id:string){
            try{
                const response = await Documents.getCacDocument()
                let responseData = response.data
                if(responseData.code === "00"){
                    this.cacDocument = responseData.data
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },


        async uploadTin(payload:CreateTinDocumentRequest){
            try{
                const response = await Documents.postTinDocument(payload)
                let responseData = response.data
                console.log(response)
                if(responseData.code === "00"){
                    await this.readBusinessDocs()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }
        },

        async updateTin(payload){
            try{
                const response = await Documents.updateTinDocument(payload.id, payload.file)
                let responseData = response.data
                if(responseData.code === "00"){
                    await this.readBusinessDocs()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },

        async deleteTin(payload:string){
            try{
                const response = await Documents.deleteTinDocument(payload)
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

        async readTinById(id:string){
            try{
                const response = await Documents.getTinDocument()
                let responseData = response.data
                if(responseData.code === "00"){
                    this.tinDocument = responseData.data
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },

        async readBusinessDocs(){
            try{
                const response = await Documents.documentsRead()
                let responseData = response.data
                if(responseData.code === "00"){
                    this.documents = responseData.data
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        }
    }
});

