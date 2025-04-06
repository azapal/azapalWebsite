import { apiClient } from "./Base"

export default {
    tiktok(payload:any){
        return apiClient.accountClient.post('auth/tiktok/callback/', payload)
    }
}