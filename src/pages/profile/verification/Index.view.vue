<!--<script setup>-->
<!--import HeaderNav from "../../../components/HeaderNav.vue"-->
<!--import Button from "../../../components/ui/button.vue";-->
<!--// import { UserBadgeCheck } from "@iconoir/vue";-->
<!--import { ref, onBeforeUnmount, onMounted } from "vue"-->
<!--import {IdDocumentRequest} from "../../../model/request/documents/documentRequest.js";-->
<!--import storeUtils from "../../../utils/storeUtils.js";-->
<!--import {notify} from "../../../utils/toast.js";-->
<!--import router from "../../../router/index.js";-->

<!--let verificationStep = ref('1')-->
<!--const video = ref(null);-->
<!--const canvas = ref(null);-->
<!--let photo = ref(null);-->
<!--let stream = null; // Track the camera stream-->
<!--const idRequestModel = ref(IdDocumentRequest)-->
<!--const loading = ref(false);-->
<!--const store = storeUtils-->

<!--// 🎧 Text-to-Speech Setup-->
<!--const speak = (text) => {-->
<!--    const utterance = new SpeechSynthesisUtterance(text);-->
<!--    utterance.lang = "en-US";-->
<!--    utterance.rate = 1;-->
<!--    speechSynthesis.speak(utterance);-->
<!--};-->

<!--const startCamera = async () => {-->
<!--    verificationStep.value = '2'-->
<!--    try {-->
<!--        stream = await navigator.mediaDevices.getUserMedia({ video: true });-->
<!--        video.value.srcObject = stream;-->
<!--        speak("Take a selfie with your Identification Document on your right hand")-->
<!--        speechSynthesis.cancle()-->
<!--    } catch (error) {-->
<!--        if (error.name === "NotAllowedError") {-->
<!--            alert("Please allow camera access.");-->
<!--        }-->
<!--    }-->
<!--};-->

<!--// Stop the camera-->
<!--const stopCamera = () => {-->
<!--  if (stream) {-->
<!--    stream.getTracks().forEach((track) => track.stop());-->
<!--  }-->
<!--};-->

<!--const capture = () => {-->
<!--    const context = canvas.value.getContext("2d");-->
<!--    canvas.value.width = video.value.videoWidth;-->
<!--    canvas.value.height = video.value.videoHeight;-->
<!--    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);-->
<!--    const documentName = idRequestModel.value.full_name+'-'+idRequestModel.value.document_type-->
<!--    // Convert canvas content to a data URL (base64)-->
<!--    photo.value = canvas.value.toDataURL("image/png");-->
<!--    canvas.value.toBlob((blob) => {-->
<!--      if(blob){-->
<!--        idRequestModel.value.file = new File([blob], `${documentName.replaceAll(' ', '_').toLowerCase()}.png`, {-->
<!--          type: blob.type,-->
<!--          lastModified: new Date().getTime()-->
<!--        });-->
<!--      }-->
<!--    }, "image/png");-->
<!--    speak("Good!")-->

<!--    // Stop the camera after capturing-->
<!--    stopCamera();-->
<!--};-->

<!--const reCapture = () => {-->
<!--    photo.value = null-->
<!--    startCamera()-->
<!--}-->

<!--const uploadPhoto = async () => {-->
<!--    console.log("upload photo", idRequestModel.value);-->
<!--    // if (!photo.value) return;-->
<!--    loading.value = true;-->
<!--    const formData = new FormData();-->
<!--    formData.append("file", idRequestModel.value.file);-->
<!--    formData.append("full_name", idRequestModel.value.full_name);-->
<!--    formData.append("document_type", idRequestModel.value.document_type);-->

<!--    await store.dispatch('documents', 'uploadId', formData)-->
<!--    loading.value = false;-->
<!--    await router.push({path:'/settings'})-->

<!--};-->

<!--onBeforeUnmount(stopCamera)-->

<!--</script>-->
<!--<template>-->
<!--    &lt;!&ndash; bg-gray-200 &ndash;&gt;-->
<!--    <HeaderNav />-->
<!--    &lt;!&ndash; <NotificationBasic variant="success" :hasCallToAction="false" :hasSubText="false"-->
<!--        msg="Verification was successfull" /> &ndash;&gt;-->

<!--    <div v-if="loading" class="w-full h-[100%] border fixed bg-white/70 z-40 top-0 right-0 left-0 bottom-0 flex  items-center justify-center">-->
<!--      Processing.... we would redirect you once the upload is sucessfull-->
<!--    </div>-->

<!--    <div v-if="verificationStep==='1'" class="relative flex justify-center items-center">-->
<!--        &lt;!&ndash; <div class="absolute bg-black opacity-60 inset-0 z-0"></div> &ndash;&gt;-->
<!--        <div class="sm:max-w-lg w-full p-5 bg-white rounded-xl z-10">-->
<!--            <div class="text-left">-->
<!--                <h2 class="text-xl font-bold text-gray-900">-->
<!--                    Document Verification-->
<!--                </h2>-->
<!--                <p class="mt-2 text-sm text-gray-400">Our system checks against impersonations, be sure to type in your-->
<!--                    name as it appears on your verification documents. </p>-->
<!--            </div>-->
<!--            <form @submit.prevent="startCamera" class="mt-5 space-y-3">-->
<!--                <div class="grid grid-cols-1 space-y-2">-->
<!--                    <label class="text-sm font-bold text-gray-500 tracking-wide">Select Document Type</label>-->
<!--                    <select v-model="idRequestModel.document_type" class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required>-->
<!--                        <option>National Identification Number(NIN)</option>-->
<!--                        <option>International Passport</option>-->
<!--                    </select>-->
<!--                </div>-->
<!--                <div class="grid grid-cols-1 space-y-2">-->
<!--                    <label for="id_full_name"-->
<!--                        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">-->
<!--                        <span class="text-xs font-medium text-gray-700 "> Full Name </span>-->

<!--                        <input type="text" v-model="idRequestModel.full_name" id="id_full_name" placeholder="Your Full Name"-->
<!--                            class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm " required/>-->
<!--                    </label>-->
<!--                </div>-->

<!--                <div>-->
<!--                    <button  type="submit" class="w-full bg-[#F97316] hover:bg-orange-400 rounded-[12px] p-[8px] cursor-pointer text-white">Next</button>-->

<!--                </div>-->
<!--            </form>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="w-full flex justify-center items-center"  v-if="verificationStep==='2'">-->
<!--      <div class="w-full flex flex-col items-center">-->
<!--        <div class="lg:w-[30%] mt-6 mb-3 w-[90%] flex items-start space-x-3 p-4 bg-white  rounded-xl border border-gray-200 ">-->
<!--          <div class="p-1 bg-blue-100  rounded-full">-->
<!--            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div>-->
<!--            <h3 class="text-sm font-medium text-gray-900 ">Touch the center of your screen to capture selfie</h3>-->
<!--            <p class="mt-1 text-xs text-gray-500 ">-->
<!--              Take a selfie with your identification document on your right hand.-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div v-if="!photo" class="flex lg:w-[30%] relative w-full flex-col justify-center items-center m-2">-->

<!--          <video ref="video" autoplay></video>-->
<!--          <button @click="capture" class="w-[55%] h-[55%] m-3 absolute  rounded-[12px] p-[8px] cursor-pointer text-white"> </button>-->
<!--          <canvas ref="canvas" style="display: none"></canvas>-->
<!--        </div>-->

<!--        <div v-if="photo" class="h-full flex relative flex-col  justify-center items-center">-->
<!--          <img :src="photo" alt="Captured Photo" />-->
<!--          <div class="flex gap-3 items-center mt-5 w-[95%]">-->
<!--            <button  @click="reCapture" class="mt-3 w-full bg-[#2563EB] rounded-[12px] p-[8px] cursor-pointer text-white">Retake</button>-->

<!--            <button @click="uploadPhoto" class="mt-3 w-full bg-[#F97316] hover:bg-orange-400 rounded-[12px] p-[8px] cursor-pointer text-white">Upload Photo</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--    </div>-->


<!--</template>-->
<!--<style scoped>-->
<!--.has-mask {-->
<!--    position: absolute;-->
<!--    clip: rect(10px, 150px, 130px, 10px);-->
<!--}-->

<!--</style>-->