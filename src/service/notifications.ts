import { apiClient } from "./Base"
import type { CreateTinDocumentRequest } from "../model/request/documents/documentRequest.ts"

export default {
    readAccountNotification(payload:any){
        return apiClient.accountClient.post(`user/account/notification/${payload}`)
    },
    updateAccountNotification(payload:CreateTinDocumentRequest){
        return apiClient.accountClient.post(`user/account/notification`, payload)
    },
}