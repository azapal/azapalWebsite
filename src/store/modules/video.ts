import { defineStore } from "pinia";
export const useVideoStore = defineStore("videoStore", {
    state: () => ({
        isPaused: true,
        heroVideoRef:null

    }),

    getters: {
        getIsPaused: state => state.isPaused,
        getHeroVideoRef: state => state.heroVideoRef,
    },

    actions: {
        pausePlay()  {
            console.log(this.isPaused);
            console.log(this.heroVideoRef);
            if (this.heroVideoRef) {
                console.log(this.heroVideoRef);
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

