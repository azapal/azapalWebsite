import {useVideoStore} from "./modules/video.ts";
import {useGlobalStore} from "./modules/global.ts";

const stores = {
  // TODO: import store modules dynamically
    video: useVideoStore,
    global: useGlobalStore,
};


export default stores;
