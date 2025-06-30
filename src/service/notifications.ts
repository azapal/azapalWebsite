import { apiClient } from "./base.ts"
import type {UpdateNotificationRequestType} from "../model/request/notifications/NotificationRequest.ts";
export default {
    readAccountNotification(){
        return apiClient.accountClient.get(`user/account/notification`)
    },
    updateAccountNotification(id:string, payload:UpdateNotificationRequestType){
        return apiClient.accountClient.put(`user/account/notification/${id}`, payload)
    },

    readSystemNotification(){
        return apiClient.businessClient.get(`system_notifications`)
    },

    updateSystemNotification(id:string, payload:UpdateNotificationRequestType){
        return apiClient.businessClient.put(`system_notifications/update/${id}`, payload)
    },
}