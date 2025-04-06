import { apiClient } from "./Base"

export default {
  
    readBank(){
        return apiClient.walletClient.get(`bank?country=nigeria`)
 
    },
    resolve(account_number:any, bank_code:any){
        return apiClient.walletClient.get(`resolve?account_number=${account_number}&bank_code=${bank_code}`)
 
    },
}