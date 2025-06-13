import { useAuthStore } from "./modules/auth";
import { useBusinessStore } from "./modules/business";
import { usePayStore } from "./modules/pay";
import {useDocumentsStore} from "./modules/documents.ts";
import {useNotificationsStore} from "./modules/notifications.ts";
const stores = {
  // TODO: import store modules dynamically
  auth:useAuthStore,
  business:useBusinessStore,
  pay:usePayStore,
  documents:useDocumentsStore,
  notifications:useNotificationsStore,
};


export default stores;
