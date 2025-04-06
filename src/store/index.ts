import { useAuthStore } from "./modules/auth";
import { useBusinessStore } from "./modules/business";
import { usePayStore } from "./modules/pay";

const stores = {
  // TODO: import store modules dynamically
  auth:useAuthStore,
  business:useBusinessStore,
  pay:usePayStore
};


export default stores;
