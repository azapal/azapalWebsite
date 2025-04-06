import { apiClient } from "./Base"

export default {
    transfer(){
        return apiClient.businessClient.get('transfer')
 
    },

    bulkTransfer(){
        return apiClient.businessClient.get('bulk/transfer')
    },

    initiatePayment(payload:any){
        return apiClient.businessClient.post('initialize_payment', payload)
    },

    getInitiatedPayment(payload:any){
        return apiClient.businessClient.get('initialize_payment', payload)
    },

    verifyPayment(payload:any){
        return apiClient.businessClient.post('verify_payment', payload)
    },

    payout(payload:any){
        return apiClient.businessClient.post('payout', payload)
    },

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