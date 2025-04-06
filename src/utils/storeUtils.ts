import stores from "../store";
import { computed } from "vue";
console.log(stores)

const storeInstance:any = stores

class StoreUtils {

  static dispatch(store:any, action:any, data:any) {
    return storeInstance[store]()[action](data);
  }

  static commit(store:any, state:any, data:any) {
    const s = storeInstance[store]();
    s[state] = data;
    return s;
  }

  
  static get(store:any, getter:any) {
    const getterInstance = storeInstance[store]();
    return computed(() => getterInstance[getter]);
}
}

export default StoreUtils;
