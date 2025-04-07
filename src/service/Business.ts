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
}