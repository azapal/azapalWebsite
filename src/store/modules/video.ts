import { defineStore } from "pinia";
import {ref} from "vue";


export const useVideoStore = defineStore("videoStore", {

    state: () => ({
        isPaused: true,
        heroVideoRef:ref<any>(null),

    }),

    getters: {
        getIsPaused: state => state.isPaused,
        getHeroVideoRef: state => state.heroVideoRef,
    },

    actions: {

        pausePlay(){
            if (this.heroVideoRef.value) {
                if (this.heroVideoRef.value.paused) {
                    this.heroVideoRef.value.play();
                    this.isPaused = false;
                } else {
                    this.heroVideoRef.value.pause();
                    this.isPaused = true;
                }
            }
        }
    }
});

