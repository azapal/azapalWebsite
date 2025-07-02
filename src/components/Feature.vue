<script setup>
import { CreditCard, Shield, Truck, Users, BarChart, AlertCircle, ChevronRightCircle } from "lucide-vue-next";

const features = [
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
];

</script>
<template>
    <section id="features" class="py-20 bg-gray-50 mx-auto px-4 md:px-6">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-4"><span class="bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">Automate</span> Your Business Logistics.</h2>
        <span class="text-md text-gray-600">Making Logistics for your business easier like never before</span>
      </div>
      <div class="flex flex-col-reverse lg:flex-row-reverse justify-between mb-[24px] items-center">
        <div class="text-left max-w-3xl mx-auto mb-16 px-4 md:px-6">
          <div class="lg:px-4 md:px-6">

            <h2 class="text-3xl md:text-4xl font-bold mb-8">
              Everything your business need for a <span class=" bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">safer</span> online transactions
            </h2>

            <p class="text-md text-gray-600 mb-8">
              Azapal combines payment protection, vendor verification, logistics partnerships and tracking into one seamless platform.
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-5">

              <div
                  v-for="(feature,index) in features"
                  :key={index}
                  class="bg-white rounded-xl flex items-center border border-gray-100 hover:shadow-md transition-shadow"
              >
                <component
                    :is="feature.icon"
                    class="h-12 w-10 p-2 rounded-xl bg-[#FB923C]-100 text-[#F97316]"
                />
                <h3 class="text-sm font-semibold">{{feature.title}}</h3>
                <!--              <p class="text-gray-600 text-sm">{{feature.description}}</p>-->
              </div>
            </div>

            <p class="flex gap-3 mt-[32px] hover:text-[#F97316] cursor-pointer items-center underline"> <ChevronRightCircle /> Find out how azapal automates logistics for your business</p>

          </div>


        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-2 mb-8 lg:mt-0 place-items-center">
          <img class="rounded-[18px] w-[90%] shadow-sm" src="../../src/assets/images/Joyful_market_day.jpg" alt="ksksk" />
          <img class="hidden md:block lg:block rounded-[18px] w-[90%] shadow-sm" src="../../src/assets/images/StockCake-Barista.jpg" alt="ksksk" />
        </div>
      </div>

      <div class="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div class="text-left lg:w-[50%] max-w-3xl mx-auto mb-16 px-4 md:px-6">
          <div class="mt-12 mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-8">
              Your Security Is Our <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Priority</span>

            </h2>

            <p class="text-md text-gray-600 mb-8">
              Azapal uses industry-leading security measures to protect your data and transactions. Sell online with confidence, knowing your money and information are safe.
            </p>
          </div>

          <p class="flex gap-3 mt-[32px] mb-8 hover:text-[#F97316] cursor-pointer items-center underline"> <ChevronRightCircle /> Find out how azapal protects you as a buyer or vendor.</p>


          <div>
            <p class="font-thin">Get the app on </p>
            <div class="flex mt-8 gap-3">
              <img class="w-16 cursor-pointer hover:scale-105" src="../../src/assets/images/playstore.png" alt="play"/>
              <img class="w-16 cursor-pointer hover:scale-105" src="../../src/assets/images/applestore.png" alt="apple"/>
            </div>
          </div>

        </div>

        <div class="grid place-items-center">
          <img class="rounded-[18px] shadow-sm w-[90%] lg:w-[50%]" src="../../src/assets/images/StockCake-Barista.jpg" alt="ksksk" />
        </div>
      </div>
    </section>
</template>
<style></style>