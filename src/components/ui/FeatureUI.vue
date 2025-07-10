<script setup>
import { CreditCard, Shield, Truck, Users, BarChart, AlertCircle, ChevronRightCircle, CheckCircle } from "lucide-vue-next";
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import StoreUtils from "../../utils/storeUtils.js";

const store = StoreUtils

const useType = store.get('global', 'getUseType')

const businessFeatures = [
  {
    title:"Selling As An Online Vendor",
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
      {
        icon: AlertCircle,
        title: "Dispute Resolution",
        description: "Fair and transparent process for handling disputes between buyers and sellers."
      }
    ]
  },

  {
    title:"Buying Or Paying Other Vendors Online",
    supports:[
      {
        icon: Shield,
        title: "Secure / Protected Payments",
        description: "Your money is held securely until you confirm receipt and satisfaction with your order."
      },
      {
        icon: Users,
        title: "Vendor Verification",
        description: "We verify all vendors on our platform to ensure legitimacy and build trust."
      },
      {
        icon: BarChart,
        title: "E-Invoice / Automated Receipts",
        description: "Vendors get powerful tools to track sales, payments, and delivery performance."
      },
      {
        icon: Truck,
        title: "Delivery Partnership / Tracking",
        description: "Seamlessly connect with dispatch riders and track your delivery in real-time."
      },
      {
        icon: AlertCircle,
        title: "Dispute Resolution",
        description: "Fair and transparent process for handling disputes between buyers and sellers."
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
    title:"Buying Or Paying Vendors Online",
    supports:[
      {
        icon: Shield,
        title: "Secure / Protected Payments",
        description: "Your money is held securely until you confirm receipt and satisfaction with your order."
      },
      {
        icon: Users,
        title: "Vendor Verification",
        description: "We verify all vendors on our platform to ensure legitimacy and build trust."
      },
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
      {
        icon: AlertCircle,
        title: "Dispute Resolution",
        description: "Fair and transparent process for handling disputes between buyers and sellers."
      }
    ]
  },

];
</script>

<template>
    <section id="features" class="relative bg-[white] mx-auto px-4 md:px-6 pt-3">

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

          <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
<!--            <img-->
<!--                class="col-span-1 rounded-[18px] shadow-sm object-cover w-full h-full aspect-[4/3]"-->
<!--                src="../../assets/images/Joyful_market_day.jpg"-->
<!--                alt="img1"-->
<!--            />-->
<!--            <img-->
<!--                class="col-span-1 rounded-[18px] shadow-sm object-cover w-full h-full aspect-[4/3]"-->
<!--                src="../../assets/images/woman_market.png"-->
<!--                alt="img2"-->
<!--            />-->
            <div class="relative overflow-hidden rounded-2xl shadow-lg group">
              <img src="../../assets/images/online-shopping-4532460_1280.jpg" alt="img2" class="w-full hidden md:block h-48 object-cover">
<!--              <div-->
<!--                  class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">-->
<!--                <div class="absolute bottom-0 left-0 right-0 p-4">-->
<!--                  <h4 class="text-xl font-bold text-white">Culinary Delights</h4>-->
<!--                </div>-->
<!--              </div>-->
            </div>
            <div class="relative overflow-hidden rounded-2xl shadow-lg group">
              <img src="../../assets/images/woman_market.png" alt="img3" class="w-full  hidden md:block h-48 object-cover">
<!--              <div-->
<!--                  class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">-->
<!--                <div class="absolute bottom-0 left-0 right-0 p-4">-->
<!--                  <h4 class="text-xl font-bold text-white">Tech Innovations</h4>-->
<!--                </div>-->
<!--              </div>-->
            </div>

            <div class="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg group">
              <img
                  class="w-full h-full object-cover"
                  src="../../assets/images/young-man-selling-clothes-accessories-online-by-smartphone-live-streaming-business-online-e-commerce-home_35076-4879.avif"
                  alt="img3"
              />
            </div>

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
            <img
                class="rounded-[18px] shadow-sm object-cover w-full h-full aspect-[3/2]"
                src="../../assets/images/social_files/uri_ifs___M_qyzdC_772yytZyVrCiwS2lHPLPRbDqhHsTM8zRV4Kxk.jpg"
                alt="img3"
            />
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