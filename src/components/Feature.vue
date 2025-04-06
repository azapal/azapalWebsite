<script setup>
import { CreditCard, Shield, Truck, Users, BarChart, AlertCircle } from "lucide-vue-next";

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your money is held securely until you confirm receipt and satisfaction with your order."
  },
  {
    icon: Users,
    title: "Vendor Verification",
    description: "We verify all vendors on our platform to ensure legitimacy and build trust."
  },
  {
    icon: Truck,
    title: "Delivery Integration",
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
    icon: AlertCircle,
    title: "Dispute Resolution",
    description: "Fair and transparent process for handling disputes between buyers and sellers."
  }
];

</script>
<template>
    <section id="features" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for <span class=" bg-gradient-to-r from-[#EA580C] to-[#2563EB] text-transparent bg-clip-text">safer</span> online transactions
          </h2>
          <p class="text-md text-gray-600">
            Azapal combines payment protection, vendor verification, and delivery tracking into one seamless platform.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(feature,index) in features"
              :key={index} 
              class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div class="mb-4">
                <component 
                    :is="feature.icon" 
                    class="h-12 w-12 p-2 rounded-xl bg-[#FB923C]-100 text-[#F97316]"
                />  
              </div>
              <h3 class="text-xl font-semibold mb-2">{{feature.title}}</h3>
              <p class="text-gray-600 text-sm">{{feature.description}}</p>
            </div>
        </div>
      </div>
    </section>
</template>
<style></style>