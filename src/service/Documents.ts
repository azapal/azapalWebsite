import { apiClient } from "./Base"
import type { CreateCacDocumentRequest, CreateIdDocumentRequest, CreateTinDocumentRequest } from "../model/request/documents/documentRequest.ts"

export default {
    postCacDocument(payload:CreateCacDocumentRequest){
        return apiClient.businessClient.post('documents/cac/upload', payload)
    },
    postTinDocument(payload:CreateTinDocumentRequest){
        return apiClient.businessClient.post(`documents/tin/upload`, payload)
    },
    postIdDocument(payload:CreateIdDocumentRequest){
        return apiClient.businessClient.post(`documents/tin/upload`, payload)
    },


    getCacDocument(payload:string){
        return apiClient.businessClient.get(`documents/cac/${payload}`)
    },
    getTinDocument(payload:string){
            return apiClient.businessClient.get(`documents/tin/${payload}`)
    },
    getIdDocument(payload:string){
            return apiClient.businessClient.get(`documents/id/${payload}`)
    },


    updateCacDocument(payload:string){
        return apiClient.businessClient.put(`documents/cac/${payload}`)
    },
    updateTinDocument(payload:string){
        return apiClient.businessClient.put(`documents/tin/${payload}`)
    },
    updateIdDocument(payload:string){
        return apiClient.businessClient.put(`documents/id/${payload}`)
    },


    deleteCacDocument(payload:string){
        return apiClient.businessClient.delete(`documents/cac/${payload}`)
    },
    deleteTinDocument(payload:string){
        return apiClient.businessClient.delete(`documents/tin/${payload}`)
    },
    deleteIdDocument(payload:string){
        return apiClient.businessClient.delete(`documents/id/${payload}`)
    },

}