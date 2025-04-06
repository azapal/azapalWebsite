<script setup>
import { Shield, Lock, AlertOctagon } from "lucide-vue-next";

</script>
<template>
    <section id="security" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div class="max-w-3xl mx-auto mb-16">
          <div class="flex items-center justify-center space-x-3 mb-6">
            <Shield class="h-8 w-8 text-[#F97316]" />
            <h2 class="text-3xl md:text-4xl font-bold">
              Your Security Is Our <span class="bg-gradient-to-r from-[#F97316] to-[#2563EB] text-transparent bg-clip-text">Priority</span>
            </h2>
          </div>
          <p class="text-lg text-gray-600 text-center text-sm">
            Azapal uses industry-leading security measures to protect your data and transactions. Shop with confidence, knowing your money and information are safe.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 rounded-full bg-[#F97316]-100 flex items-center justify-center mb-6">
              <Lock class="h-6 w-6 text-[#F97316]" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Secure Payment Escrow</h3>
            <p class="text-gray-600 text-sm">
              Your money is securely held in escrow until you confirm that you've received your order and are satisfied with it. If there's any issue, we'll help you resolve it.
            </p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 rounded-full bg-[#F97316]-100 flex items-center justify-center mb-6">
              <Shield class="h-6 w-6 text-[#F97316]" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Vendor Verification</h3>
            <p class="text-gray-600 text-sm">
              All vendors on our platform undergo a rigorous verification process. We verify business details, physical addresses, and operational capacity to ensure legitimacy.
            </p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div class="w-12 h-12 rounded-full bg-[#F97316]-100 flex items-center justify-center mb-6">
              <AlertOctagon class="h-6 w-6 text-[#F97316]" />
            </div>
            <h3 class="text-xl font-semibold mb-4">Fraud Detection</h3>
            <p class="text-gray-600 text-sm">
              Our advanced fraud detection system monitors all transactions for suspicious activity. We use machine learning to identify and prevent potential scams before they happen.
            </p>
          </div>
        </div>

        <div class="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 class="text-2xl font-semibold mb-6 text-center">How We Keep Your Transactions Safe</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">1</span>
              </div>
              <h4 class="font-semibold mb-2">Payment Verification</h4>
              <p class="text-gray-600 text-sm">All payment methods are verified to confirm authenticity</p>
            </div>
            
            <div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">2</span>
              </div>
              <h4 class="font-semibold mb-2">Secure Escrow</h4>
              <p class="text-gray-600 text-sm">Funds are held in escrow until order confirmation</p>
            </div>
            
            <div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">3</span>
              </div>
              <h4 class="font-semibold mb-2">Delivery Tracking</h4>
              <p class="text-gray-600 text-sm">Real-time tracking of your delivery with security checks</p>
            </div>
            
            <div>
              <div class="w-16 h-16 rounded-full bg-gradient-to-r from-[#F97316] to-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">4</span>
              </div>
              <h4 class="font-semibold mb-2">Dispute Resolution</h4>
              <p class="text-gray-600 text-sm">Fair mediation process if any issues arise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
<style></style>