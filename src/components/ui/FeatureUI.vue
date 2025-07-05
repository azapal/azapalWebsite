<script setup>
import { CreditCard, Shield, Truck, Users, BarChart, AlertCircle, ChevronRightCircle, CheckCircle } from "lucide-vue-next";
import {ref} from "vue";
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const useType = ref('business')

const businessFeatures = [
  {
    title:"selling as an online vendor",
    supports:[
      {
        icon: Shield,
        title: "Secure Payments",
        description: "Your money is held securely until you confirm receipt and satisfaction with your order."
      },
      // {
      //   icon: Users,
      //   title: "Vendor Verification",
      //   description: "We verify all vendors on our platform to ensure legitimacy and build trust."
      // },
      {
        icon: Truck,
        title: "Delivery Partnership / Tracking",
        description: "Seamlessly connect with dispatch riders and track your delivery in real-time."
      },
      {
        icon: CreditCard,
        title: "Flexible Payments",
        description: "Multiple payment options including credit cards, bank transfers, and mobile money."
      },
      {
        icon: BarChart,
        title: "Business Analytics",
        description: "Vendors get powerful tools to track sales, payments, and delivery performance."
      },
      {
        icon: BarChart,
        title: "E-Invoice / Automated Receipts",
        description: "Vendors get powerful tools to track sales, payments, and delivery performance."
      },

      {
        icon: BarChart,
        title: "POS",
        description: "Vendors get powerful tools to track sales, payments, and delivery performance."
      },
      // {
      //   icon: AlertCircle,
      //   title: "Dispute Resolution",
      //   description: "Fair and transparent process for handling disputes between buyers and sellers."
      // }
    ]
  },

  {
    title:"paying as an online vendor",
    supports:[
      {
        icon: Shield,
        title: "Secure / Protected Payments",
        description: "Your money is held securely until you confirm receipt and satisfaction with your order."
      },

      {
        icon: CreditCard,
        title: "Flexible Payments",
        description: "Multiple payment options including credit cards, bank transfers, and mobile money."
      },


    ]
  }

];

const personalFeatures = [
  {
    title:"buying or paying vendors online",
    supports:[
      {
        icon: Shield,
        title: "Secure / Protected Payments",
        description: "Your money is held securely until you confirm receipt and satisfaction with your order."
      },
      // {
      //   icon: Users,
      //   title: "Vendor Verification",
      //   description: "We verify all vendors on our platform to ensure legitimacy and build trust."
      // },
      {
        icon: Truck,
        title: "Delivery Integration / Tracking",
        description: "Seamlessly connect with dispatch riders and track your delivery in real-time."
      },
      {
        icon: CreditCard,
        title: "Flexible Payments",
        description: "Multiple payment options including credit cards, bank transfers, and mobile money."
      },
      {
        icon: BarChart,
        title: "Expense Tracker",
        description: "Vendors get powerful tools to track sales, payments, and delivery performance."
      },

      // {
      //   icon: AlertCircle,
      //   title: "Dispute Resolution",
      //   description: "Fair and transparent process for handling disputes between buyers and sellers."
      // }
    ]
  },

];
</script>

<template>
    <section id="features" class="relative bg-[white] mx-auto px-4 md:px-6">
      <!-- tab section !-->
      <div class="flex justify-center py-5">
        <nav
            class="flex overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600  bg-gradient-to-br from-[#F97316] to-[#2563EB] rounded-xl">
          <button role="tab" @click="useType = 'business'" type="button"
                  :class="`flex cursor-pointer  whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none text-white ${useType === 'business' && ('bg-[#F97316]') }`"
                  aria-selected="">
            For Business Use
          </button>

          <button @click="useType = 'personal'" role="tab" type="button"
                  :class="`flex cursor-pointer whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none text-white ${useType === 'personal' && ('bg-[#F97316]') }`">
            For Personal Use
          </button>
        </nav>
      </div>

      <div v-if="useType==='business'" class="my-[24px] flex items-center justify-center">
        <div class="flex flex-col-reverse  lg:flex-row-reverse justify-between items-center">
          <div class="text-left max-w-3xl mx-auto mb-16 px-4 md:px-6">
            <div class="lg:px-4 md:px-6">

              <h2 class="text-2xl lg:text-3xl font-bold mb-8 mt-8 lg:mt-0">
                Everything your business need for a <span class=" bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">safer</span> online transactions
              </h2>

              <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-5 mb-8">

                <div
                    v-for="(feature,index) in businessFeatures"
                    :key={index}
                    class="bg-white rounded-xl flex-col items-center"
                >
                  <p class="text-md mb-3 bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">{{feature.title}}</p>
                  <div class="flex-col mb-8">
                    <div v-for="(i, index) in feature.supports" class="flex items-center border border-gray-100 hover:shadow-md transition-shadow" :key="index">
                      <CheckCircle class="h-12 w-10 p-2 rounded-xl bg-[#FB923C]-100 text-green-500"></CheckCircle>
                      <h3 class="text-sm font-semibold">{{i.title}}</h3>
                      <!--              <p class="text-gray-600 text-sm">{{feature.description}}</p>-->
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-md text-gray-600 mb-8">
                Azapal combines payment protection, vendor verification, logistics partnerships and tracking into one seamless platform.
              </p>

              <div class="mb-8 mt-8">
                <h2 class="text-2xl lg:text-3xl font-bold mb-4"><span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">Automate</span> Your Business Logistics.</h2>
                <span class="text-md text-gray-600">Making Logistics for your business easier like never before</span>
              </div>


              <a href="/automated-logistics" class="flex gap-3 mt-[32px] hover:text-[#F97316] cursor-pointer items-center underline"> <ChevronRightCircle /> Find out how azapal automates logistics for your business</a>
            </div>
          </div>

          <div class="grid place-items-center">
            <img class="rounded-[18px] w-[90%] lg:w-[50%] shadow-sm" src="../../assets/images/Joyful_market_day.jpg" alt="ksksk" />
  <!--          <img class="hidden md:block lg:block rounded-[18px] w-[90%] shadow-sm" src="../../src/assets/images/StockCake-Barista.jpg" alt="ksksk" />-->
          </div>
        </div>
      </div>
      <div v-if="useType==='personal'" class="my-[24px] flex items-center justify-center">
        <div class="flex flex-col-reverse lg:flex-row-reverse justify-between mb-[24px] items-center">
          <div class="text-left max-w-3xl mx-auto mb-16 px-4 md:px-6">
            <div class="lg:px-4 md:px-6">

              <h2 class="text-2xl md:text-3xl font-bold mb-8 mt-8 lg:mt-0">
                Everything you need for a <span class=" bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">safer</span> online transactions
              </h2>

              <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-5 mb-8">

                <div
                    v-for="(feature,index) in personalFeatures"
                    :key={index}
                    class="bg-white rounded-xl flex-col items-center"
                >
                  <p class="text-md mb-3 bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">{{feature.title}}</p>
                  <div class="flex-col mb-8">
                    <div v-for="(i, index) in feature.supports" class="flex items-center border border-gray-100 hover:shadow-md transition-shadow" :key="index">
                      <CheckCircle class="h-12 w-10 p-2 rounded-xl bg-[#FB923C]-100 text-green-500"></CheckCircle>
                      <h3 class="text-sm font-semibold">{{i.title}}</h3>
                      <!--              <p class="text-gray-600 text-sm">{{feature.description}}</p>-->
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-md text-gray-600 mb-8">
                Azapal combines payment protection, vendor verification, logistics partnerships and tracking into one seamless platform.
              </p>

              <div class="mb-8 mt-8">
                <h2 class="text-2xl lg:text-3xl font-bold mb-4"><span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">Worry Less</span> when you <em>"pay online."</em></h2>
                <span class="text-md text-gray-600">Making money is <em>hard</em> already, so know who you send it to.</span>
              </div>
            </div>


          </div>

          <div class="grid place-items-center">
            <img class="rounded-[18px] w-[90%] lg:w-[50%] shadow-sm" src="../../assets/images/Joyful_market_day.jpg" alt="ksksk" />
          </div>
        </div>
      </div>

      <!-- security section !-->
      <div class="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div class="text-left max-w-3xl mx-auto mb-16 px-4 md:px-6">
          <div class="mt-12 mb-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-8">
              Your Security Is Our <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Priority</span>

            </h2>

            <p class="text-md text-gray-600 mb-8">
              Azapal uses industry-leading security measures to protect your data and transactions. Sell online with confidence, knowing your money and information are safe.
            </p>
          </div>

          <a href="/safety-first" class="flex gap-3 mt-[32px] mb-8 hover:text-[#F97316] cursor-pointer items-center underline"> <ChevronRightCircle /> Find out how azapal protects you as a buyer or vendor.</a>

        </div>

        <DotLottieVue
            src="https://lottie.host/1abcfb39-3519-40f1-8265-764c1ecd77d5/FSdUiLKNSK.lottie"
            loop
            autoplay
        />
      </div>

    </section>
</template>
<style></style>