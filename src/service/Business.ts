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


   
}