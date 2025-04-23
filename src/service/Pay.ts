import { apiClient } from "./Base"

export default {
  
    readBank(){
        return apiClient.walletClient.get(`bank?country=nigeria`)
 
    },
    resolve(account_number:any, bank_code:any){
        return apiClient.walletClient.get(`resolve?account_number=${account_number}&bank_code=${bank_code}`)
 
    },
    transfer(){
        return apiClient.businessClient.get('transfer')
 
    },

    bulkTransfer(){
        return apiClient.businessClient.get('bulk/transfer')
    },

    initiatePayment(payload:any){
        return apiClient.businessClient.post('initialize_payment', payload)
    },

    lookup(payload:any){
        return apiClient.businessClient.post('lookup', payload)
    },

    getInitiatedPayment(){
        return apiClient.businessClient.get('initialize_payment/?page=2&page_size=20')
    },

    verifyPayment(payload:any){
        return apiClient.businessClient.post('verify_payment', payload)
    },

    payout(payload:any){
        return apiClient.businessClient.post('payout', payload)
    },

    updatePayment(payload:string){
        return apiClient.businessClient.post(`update_payment?session_code=${payload}`)
    },
}