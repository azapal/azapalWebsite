import { defineStore } from "pinia";


export const useVideoStore = defineStore("videoStore", {

    state: () => ({
        isPaused: true,
        heroVideoRef:null as any,

    }),

    getters: {
        getIsPaused: state => state.isPaused,
        getHeroVideoRef: state => state.heroVideoRef,
    },

    actions: {

        pausePlay(){
            if (this.heroVideoRef) {
                if (this.heroVideoRef.paused) {
                    this.heroVideoRef.play();
                    this.isPaused = false;
                } else {
                    this.heroVideoRef.pause();
                    this.isPaused = true;
                }
            }
        }
    }
});

