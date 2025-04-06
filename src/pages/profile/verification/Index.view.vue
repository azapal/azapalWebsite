<script setup>
import HeaderNav from "../../../components/HeaderNav.vue"
import Button from "../../../components/ui/button.vue";
// import { UserBadgeCheck } from "@iconoir/vue";
import { ref, onBeforeUnmount, onMounted } from "vue"

let verificationStep = ref('1')
const video = ref(null);
const canvas = ref(null);
let photo = ref(null);
let stream = null; // Track the camera stream

// 🎧 Text-to-Speech Setup
const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
};

const startCamera = async () => {
    verificationStep.value = '2'
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.value.srcObject = stream;
        speak("Take a selfie with your Identification Document on your right hand")
        speechSynthesis.cancle()
    } catch (error) {
        if (error.name === "NotAllowedError") {
            alert("Please allow camera access.");
        }
    }
};

// Stop the camera
const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

const capture = () => {
    const context = canvas.value.getContext("2d");
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    // Convert canvas content to a data URL (base64)
    photo.value = canvas.value.toDataURL("image/png");
    speak("Good!")

    // Stop the camera after capturing
    stopCamera();
};

const reCapture = () => {
    photo.value = null
    startCamera()
}

const uploadPhoto = async () => {
    // if (!photo.value) return;

    // const blob = await fetch(photo.value).then((res) => res.blob());
    // const formData = new FormData();
    // formData.append("file", blob, "photo.png");

    // try {
    //     const response = await fetch("/api/upload", {
    //         method: "POST",
    //         body: formData,
    //     });
    //     const result = await response.json();
    //     console.log("Uploaded:", result);
    // } catch (error) {
    //     console.error("Upload failed:", error);
    // }
};

onBeforeUnmount(stopCamera)
// onMounted(startCamera)

</script>
<template>
    <!-- bg-gray-200 -->
    <HeaderNav />
    <!-- <NotificationBasic variant="success" :hasCallToAction="false" :hasSubText="false"
        msg="Verification was successfull" /> -->

    <div v-if="verificationStep==='1'" class="relative flex items-center justify-center   relative items-center">
        <!-- <div class="absolute bg-black opacity-60 inset-0 z-0"></div> -->
        <div class="sm:max-w-lg w-full p-5 bg-white rounded-xl z-10">
            <div class="text-left">
                <h2 class="text-xl font-bold text-gray-900">
                    Document Verification
                </h2>
                <p class="mt-2 text-sm text-gray-400">Our system checks against inpersonations, be sure to type in your
                    name as it appears on your verification documents. </p>
            </div>
            <div class="mt-5 space-y-3">
                <div class="grid grid-cols-1 space-y-2">
                    <label class="text-sm font-bold text-gray-500 tracking-wide">Select Document Type</label>
                    <select class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                        <option>Select options</option>
                        <option>National Identification Number(NIN)</option>
                        <option>International Passport</option>
                    </select>
                </div>
                <div class="grid grid-cols-1 space-y-2">
                    <label for="Location"
                        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800">
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-200"> Full Name </span>

                        <input type="email" id="Location" placeholder="Your Full Name"
                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm dark:text-white" />
                    </label>
                </div>

                <div>
                    <Button  @click="startCamera()" variant="outline" v-slot:child>Next</Button>

                </div>
            </div>
        </div>
    </div>

    <div class="w-full"  v-if="verificationStep==='2'">
        <div v-if="!photo" class="flex relative flex-col justify-center items-center m-2">
            <h2 class="py-3 px-3 text-center">Capture Selfie and Identification Document</h2>
            <video ref="video" autoplay></video>
            <Button @click="capture"  variant="outline" class="mt-3" v-slot:child>Capture </Button>
            <canvas ref="canvas" style="display: none"></canvas>
        </div>

        <div v-if="photo" class="h-full flex relative flex-col  justify-center items-center m-3">
            <img :src="photo" alt="Captured Photo" />
            <div class="flex gap-3 items-center mt-5">
                <Button  @click="reCapture" variant="outline" v-slot:child>Retake</Button>

                <router-link to="/bank"><Button  variant="outline" v-slot:child>Upload Photo</Button></router-link>
            </div>
        </div>
    </div>


</template>
<style scoped>
.has-mask {
    position: absolute;
    clip: rect(10px, 150px, 130px, 10px);
}

</style>