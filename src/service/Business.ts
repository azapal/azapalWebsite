import { apiClient } from "./Base"

export default {
    

    readUserBank(payload:any){
        return apiClient.businessClient.get('bank', payload)
    },

    addUserBank(payload:any){
        return apiClient.businessClient.post('bank', payload)
    },

    updatePayment(payload:any){
        return apiClient.businessClient.get(`update_payment${payload}`)
    },

    addUserBusiness(payload:any){
        return apiClient.businessClient.post(`business`, payload)
    },

    readUserBusiness(){
        return apiClient.businessClient.get(`business`)
    },

    readUserTransactions(){
        return apiClient.businessClient.get(`transactions/?page=2&page_size=20`)
    },

    readSubscribe(){
        return apiClient.businessClient.get(`subscribe`)
    },

    subscribe(payload:any){
        return apiClient.businessClient.post(`subscribe`,payload)
    },

    createCooperative(payload:any){
        return apiClient.businessClient.post(`cooperative/`,payload)
    },

    readCooperativeByUserId(user_id:string){
        return apiClient.businessClient.get(`cooperative/${user_id}/`)
    },

    createVerification(payload:any){
        return apiClient.businessClient.post(`cooperative_verifications/`,payload)
    },

    readVerificationByCooperativeId(cooperative_id:string){
        return apiClient.businessClient.get(`cooperative_verifications/${cooperative_id}/`)
    },

    readMembersByCooperativeId(cooperative_id:string){
        return apiClient.businessClient.get(`cooperative/users/${cooperative_id}/`)
    },

    updateVerificationByCooperativeId(payload:any, cooperative_id:string){
        return apiClient.businessClient.get(`cooperative_verifications/${cooperative_id}/`,payload)
    },

    deleteVerificationByCooperativeId(cooperative_id:string){
        return apiClient.businessClient.get(`cooperative_verifications/${cooperative_id}/`)
    }
   
}