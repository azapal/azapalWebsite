import { defineStore } from "pinia";
import {notify} from "../../utils/toast.ts";
import Notifications from "../../service/notifications.ts";
export const useNotificationsStore = defineStore("NotificationsStore", {
    state: () => ({
        notifications: [] as any,
        notificationCount:0

    }),

    getters: {
        getNotifications: state => state.notifications,
        getUnreadNotifications: state => state.notificationCount,

    },

    actions: {

        async readNotificationById() {
            try {
                const response = await Notifications.readAccountNotification();
                const responseData = response.data;

                if (responseData.code === "00") {
                    // Filter out new notifications
                    const newNotifications = responseData.data.filter(
                        (newItem:any) => !this.notifications.some((item:any) => item.id === newItem.id)
                    );

                    // Append new notifications
                    this.notifications = [...this.notifications, ...newNotifications];

                    // Update notification count (number of unread notifications in new data)
                    const newUnreadCount = newNotifications.filter((it:any) => !it.read_status).length;
                    this.notificationCount += newUnreadCount;

                } else {
                    notify(responseData.message, "error");
                }
            } catch (error:any) {
                notify(error?.message || error, "error");
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

        async readSystemNotificationById() {
            try {
                const response = await Notifications.readSystemNotification();
                const responseData = response.data;

                if (responseData.code === "00") {
                    // Filter out new notifications
                    const newNotifications = responseData.data.filter((item:any) => !item.read_status)

                    // Append new notifications
                    this.notifications = newNotifications;

                    // Update notification count (number of unread notifications in new data)
                    const newUnreadCount = newNotifications.filter((it:any) => !it.read_status).length;
                    this.notificationCount = newUnreadCount;

                } else {
                    notify(responseData.message, "error");
                }
            } catch (error:any) {
                notify(error?.message || error, "error");
            }
        },

        async updateSystemNotificationById(payload:any){
            try{
                const response = await Notifications.updateSystemNotification(payload.id,  payload.request)
                let responseData = response.data
                if(responseData.code === "00"){
                    await this.readSystemNotificationById()
                }else{
                    notify(responseData.message, "error")
                }
            }catch(error:any){
                notify(error, "error")
            }

        },


    }
});

