import { defineStore } from "pinia";
import {notify} from "../../utils/toast.ts";
import Notifications from "../../service/notifications.ts";
export const useNotificationsStore = defineStore("NotificationsStore", {
    state: () => ({
        account: null,
        payment: null,
        accountUnreadCount:0

    }),

    getters: {
        getAccountNotifications: state => state.account,
        getPaymentNotifications: state => state.payment,
        getUnreadNotifications: state => state.accountUnreadCount,

    },

    actions: {

        async readNotificationById(){
            try{
                const response = await Notifications.readAccountNotification()
                let responseData = response.data
                if(responseData.code === "00"){
                    this.account = responseData.data
                    this.accountUnreadCount = responseData.data?.filter((it:any) => !it.read_status)

                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },

        async updateNotificationById(payload:any){
            try{
                const response = await Notifications.updateAccountNotification(payload.id,  payload.request)
                let responseData = response.data
                if(responseData.code === "00"){
                    await this.readNotificationById()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },


    }
});

