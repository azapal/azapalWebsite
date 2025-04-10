<script setup>
import HeaderNav from '../../components/HeaderNav.vue';
import Button from '../../components/ui/button.vue';
import { Camera, ArrowRightCircle } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from '../../../firebase'

const auth = getAuth(app);
const selectedType = ref(null);
const verificationSent = ref(false);
const verificationCode = ref('');
const recaptchaRendered = ref(false);

const createBusinessModel = ref({
  name: "",
  phone_number: "",
  description: "",
  address: "",
  website: ""
});

const dispatchModel = ref({
  deliveryAreas: [
    {
      area: "",
      charge: "",
      deliveryOption: "interstate",
      discount: "",
      additionalInfo: ""
    }
  ]
});

const addDeliveryArea = () => {
  dispatchModel.value.deliveryAreas.push({
    area: "",
    charge: "",
    deliveryOption: "interstate",
    discount: "",
    additionalInfo: ""
  });
};

const removeDeliveryArea = (index) => {
  dispatchModel.value.deliveryAreas.splice(index, 1);
};

// Set up reCAPTCHA verifier
const setupRecaptcha = () => {
  if (!recaptchaRendered.value) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, now send verification code
        sendVerificationCode();
      }
    });
    recaptchaRendered.value = true;
  }
};

// Function to send verification code
const sendVerificationCode = () => {
  // Ensure phone number is in E.164 format (+[country code][phone number])
  let phoneNumber = createBusinessModel.value.phone_number;
  
  // Add '+' prefix if not present
  if (!phoneNumber.startsWith('+')) {
    phoneNumber = '+' + phoneNumber;
  }
  
  const appVerifier = window.recaptchaVerifier;
  
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to enter the code.
      window.confirmationResult = confirmationResult;
      verificationSent.value = true;
      console.log("Verification code sent to", phoneNumber);
    }).catch((error) => {
      // Error; SMS not sent
      console.error("Error sending verification code:", error);
      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        recaptchaRendered.value = false;
        setupRecaptcha();
      }
    });
};

// Function to verify code
const verifyCode = () => {
  if (!window.confirmationResult) {
    console.error("No confirmation result found. Please send verification code first.");
    return;
  }
  
  window.confirmationResult.confirm(verificationCode.value)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log("User verified:", user);
      // Now submit the business form
      submitBusinessForm();
    }).catch((error) => {
      // User couldn't sign in (wrong verification code?)
      console.error("Error verifying code:", error);
    });
};

// Submit business form after verification
const submitBusinessForm = () => {
  const finalModel = {
    ...createBusinessModel.value,
    businessType: selectedType.value,
    ...(selectedType.value === 'dispatch' ? { deliveryAreas: dispatchModel.value.deliveryAreas } : {})
  };

  console.log('Submitting verified business data:', finalModel);
  // Call your API to submit the business data
  // apiService.submitBusiness(finalModel).then(...)
};

// Start the verification process
const startVerification = () => {
  setupRecaptcha();
  // The actual send will happen in the reCAPTCHA callback
};

onMounted(() => {
  // Nothing needed on mount now
});
</script>

<template>
  <div>
    <form @submit.prevent="startVerification">
      <HeaderNav>
        <template v-slot:others>
          <Button variant="outline" class="w-[100px]" type="submit" v-if="selectedType" v-slot:child>Save</Button>
        </template>
      </HeaderNav>

      <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 mx-auto relative p-3">
        <!-- Type Selection Screen -->
        <div v-if="!selectedType" class="text-center py-12">
          <h1 class="text-2xl font-bold mb-8">What type of business are you registering?</h1>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <div @click="selectedType = 'seller'"
              class="border rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center">
              <div class="bg-blue-100 p-4 rounded-full mb-4">
                <Camera class="h-8 w-8 text-blue-600" />
              </div>
              <h2 class="text-xl font-medium">Seller</h2>
              <p class="text-gray-500 mt-2">Register as a product or service seller</p>
            </div>

            <div @click="selectedType = 'dispatch'"
              class="border rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center">
              <div class="bg-blue-100 p-4 rounded-full mb-4">
                <ArrowRightCircle class="h-8 w-8 text-blue-600" />
              </div>
              <h2 class="text-xl font-medium">Dispatch</h2>
              <p class="text-gray-500 mt-2">Register as a delivery or dispatch service</p>
            </div>
          </div>
        </div>

        <!-- Business Information Form -->
        <div v-else>
          <div class="mb-6">
            <h2 class="text-xl font-bold mb-2">{{ selectedType === 'seller' ? 'Seller' : 'Dispatch' }} Registration</h2>
            <button @click="selectedType = null" class="text-blue-600 text-sm mt-2 flex items-center">← Back to
              selection</button>
          </div>

          <!-- Common Fields -->
          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Business name</span>
            <input type="text" v-model="createBusinessModel.name" placeholder="Enter business name"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Phone number</span>
            <input type="tel" v-model="createBusinessModel.phone_number" placeholder="Enter phone number with country code (e.g. +1234567890)"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Description</span>
            <textarea v-model="createBusinessModel.description" placeholder="Describe your business"
              class="mt-1 w-full border-none bg-transparent p-0 h-[100px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Address</span>
            <input v-model="createBusinessModel.address" type="text" placeholder="Enter business address"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>

          <label
            class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
            <span class="text-xs font-medium text-gray-700">Website</span>
            <input v-model="createBusinessModel.website" type="url" placeholder="https://yourwebsite.com"
              class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
          </label>

          <!-- Dispatch-specific Fields -->
          <div v-if="selectedType === 'dispatch'" class="mt-8">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">Delivery Areas</h3>
              <Button @click="addDeliveryArea" variant="outline" type="button" class="text-sm" v-slot:child>Add
                Area</Button>
            </div>

            <div v-for="(area, index) in dispatchModel.deliveryAreas" :key="index"
              class="mb-6 p-4 border rounded-lg bg-gray-50">
              <div class="flex justify-between mb-3">
                <h4 class="font-medium">Area #{{ index + 1 }}</h4>
                <button v-if="dispatchModel.deliveryAreas.length > 1" @click="removeDeliveryArea(index)" type="button"
                  class="text-red-500 text-sm">Remove</button>
              </div>

              <label
                class="block mb-4 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Area Name</span>
                <input v-model="area.area" type="text" placeholder="e.g., New York City"
                  class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
              </label>

              <label
                class="block mb-4 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Delivery Charge</span>
                <input v-model="area.charge" type="text" placeholder="e.g., $15.00"
                  class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
              </label>

              <div
                class="block mb-4 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Delivery Option</span>
                <div class="mt-2">
                  <div class="flex items-center space-x-2 mb-2">
                    <input type="radio" :id="`interstate-${index}`" v-model="area.deliveryOption" value="interstate"
                      class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label :for="`interstate-${index}`" class="text-sm text-gray-700">Interstate</label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input type="radio" :id="`international-${index}`" v-model="area.deliveryOption"
                      value="international" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label :for="`international-${index}`" class="text-sm text-gray-700">International</label>
                  </div>
                </div>
              </div>

              <label
                class="block mb-4 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Discount (optional)</span>
                <input v-model="area.discount" type="text" placeholder="e.g., 10%"
                  class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
              </label>

              <label
                class="block mb-4 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Additional Information</span>
                <textarea v-model="area.additionalInfo" placeholder="Any additional details about delivery to this area"
                  class="mt-1 w-full border-none bg-transparent p-0 h-[60px] focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm"></textarea>
              </label>
            </div>
          </div>

          <!-- Phone verification section -->
          <div class="mt-6">
            <div id="recaptcha-container" class="mb-4"></div>
            
            <div v-if="verificationSent" class="mt-4">
              <label class="block mb-5 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <span class="text-xs font-medium text-gray-700">Enter verification code</span>
                <input type="text" v-model="verificationCode" placeholder="6-digit code" class="mt-1 w-full border-none bg-transparent p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" />
              </label>
              <Button @click.prevent="verifyCode" variant="outline" class="w-full mt-2" v-slot:child>Verify Code</Button>
            </div>
            <div v-else>
              <Button type="submit" variant="outline" class="w-full" v-slot:child>Register Business</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>