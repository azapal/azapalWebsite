import {apiClient} from "./base.ts"
import type { CreateCacDocumentRequest, CreateIdDocumentRequestType, CreateTinDocumentRequest } from "../model/request/documents/documentRequest.ts"

export default {
    postCacDocument(payload:CreateCacDocumentRequest){
        return apiClient.businessImageUploadClient.post('documents/cac/', payload)
    },
    postTinDocument(payload:CreateTinDocumentRequest){
        return apiClient.businessImageUploadClient.post(`documents/tin/`, payload)
    },
    postIdDocument(payload:CreateIdDocumentRequestType){
        return apiClient.imageAccountUploadClient.post(`user/document`, payload)
    },


    getCacDocument(payload:string){
        return apiClient.businessClient.get(`documents/cac/${payload}`)
    },
    getTinDocument(payload:string){
            return apiClient.businessClient.get(`documents/tin/${payload}`)
    },
    getIdDocument(){
            return apiClient.accountClient.get(`user/document`)
    },


    updateCacDocument(id:string, payload:any){
        return apiClient.businessImageUploadClient.put(`documents/cac/${id}`,payload)
    },
    updateTinDocument(id:string, payload:any){
        return apiClient.businessImageUploadClient.put(`documents/tin/${id}`,payload)
    },
    updateIdDocument(id:string, payload:any){
        return apiClient.imageAccountUploadClient.put(`user/document/${id}`, payload)
    },


    deleteCacDocument(payload:string){
        return apiClient.businessClient.delete(`documents/cac/${payload}`)
    },
    deleteTinDocument(payload:string){
        return apiClient.businessClient.delete(`documents/tin/${payload}`)
    },
    deleteIdDocument(payload:string){
        return apiClient.accountClient.delete(`user/documents/${payload}`)
    },

    documentsRead(){
        return apiClient.businessClient.get(`documents/read`)
    },

}